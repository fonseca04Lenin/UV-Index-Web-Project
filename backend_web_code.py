from flask import Flask, jsonify, request, redirect
import requests
from datetime import datetime
import logging
import os
from functools import lru_cache

# basic logging setup
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# create flask app
app = Flask(__name__)

# uv index levels and what they mean
UV_CLASSIFICATIONS = {
    (0, 2): {'level': 'Low', 'color': 'low', 'recommendation': 'No protection required. You can safely stay outside.'},
    (3, 5): {'level': 'Moderate', 'color': 'moderate', 'recommendation': 'Take precautions. Seek shade during midday hours, wear protective clothing.'},
    (6, 7): {'level': 'High', 'color': 'high', 'recommendation': 'Protection required. Reduce sun exposure 10am-4pm. Use sunscreen SPF 30+.'},
    (8, 10): {'level': 'Very High', 'color': 'very-high', 'recommendation': 'Extra protection required. Avoid sun exposure 10am-4pm. Use SPF 30+ sunscreen.'},
    (11, float('inf')): {'level': 'Extreme', 'color': 'extreme', 'recommendation': 'Avoid sun exposure. Stay indoors or seek shade. Use SPF 50+ sunscreen.'}
}

@lru_cache(maxsize=100)
def get_location_data():
    try:
        response = requests.get('https://ipinfo.io/json', timeout=10)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.HTTPError as e:
        if e.response.status_code == 429:
            logger.warning("ipinfo.io rate limited, using default location")
            return {
                'loc': '40.7128,-74.0060',
                'city': 'New York',
                'region': 'New York',
                'country': 'US'
            }
        else:
            logger.error(f"Location data HTTP error: {e}")
            return None
    except requests.RequestException as e:
        logger.error(f"Location data error: {e}")
        return None

def get_uv_classification(uv_index):
    for (min_val, max_val), classification in UV_CLASSIFICATIONS.items():
        if min_val <= uv_index <= max_val:
            return classification
    return UV_CLASSIFICATIONS[(0, 2)]

@lru_cache(maxsize=50)
def get_uv_data(latitude, longitude, date_str):
    try:
        url = f'https://currentuvindex.com/api/v1/uvi?latitude={latitude}&longitude={longitude}'
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        data = response.json()
        
        if data.get('ok'):
            return data
        else:
            logger.error(f"UV API error: {data.get('message', 'Unknown error')}")
            return None
    except requests.RequestException as e:
        logger.error(f"UV data error: {e}")
        return None

def process_forecast_data(forecast_data, current_date_str):
    if not forecast_data:
        return []
    
    filtered_forecast = [entry for entry in forecast_data if current_date_str not in entry['time']]
    uv_by_date = {}
    
    for entry in filtered_forecast:
        date = entry['time'][:10]
        uvi = entry['uvi']
        if date not in uv_by_date:
            uv_by_date[date] = uvi
        else:
            uv_by_date[date] = max(uv_by_date[date], uvi)
    
    formatted_forecast = []
    for date_str, uv_value in sorted(uv_by_date.items()):
        try:
            date_obj = datetime.strptime(date_str, '%Y-%m-%d')
            formatted_date = date_obj.strftime('%A, %B %d')
            classification = get_uv_classification(uv_value)
            
            formatted_forecast.append({
                'date': formatted_date,
                'uv_value': uv_value,
                'classification': classification
            })
        except ValueError as e:
            logger.error(f"Date parsing error: {e}")
            continue
    
    return formatted_forecast[:7]

FRONTEND_URL = os.getenv('FRONTEND_URL', 'http://localhost:3000')

@app.route("/")
def home():
    return redirect(FRONTEND_URL)


@app.route("/api/uv")
def api_uv():
    try:
        lat = request.args.get('lat')
        lng = request.args.get('lng')
        
        if not lat or not lng:
            location_data = get_location_data()
            if location_data and 'loc' in location_data:
                lat, lng = location_data['loc'].split(',')
            else:
                return jsonify({'error': 'Location not available'}), 400
        
        current_date_str = datetime.now().strftime('%Y-%m-%d')
        uv_data = get_uv_data(lat, lng, current_date_str)
        
        if uv_data and uv_data.get('ok'):
            current_uv = uv_data['now']['uvi']
            classification = get_uv_classification(current_uv)
            
            return jsonify({
                'current_uv': current_uv,
                'classification': classification,
                'timestamp': datetime.now().isoformat()
            })
        else:
            return jsonify({'error': 'UV data not available'}), 503
            
    except Exception as e:
        logger.error(f"API error: {e}")
        return jsonify({'error': 'Internal server error'}), 500

@app.route("/api/forecast")
def api_forecast():
    try:
        lat = request.args.get('lat')
        lng = request.args.get('lng')
        location_str = 'Unknown Location'

        if not lat or not lng:
            location_data = get_location_data()
            if location_data and 'loc' in location_data:
                lat, lng = location_data['loc'].split(',')
                city = location_data.get('city', 'Unknown')
                region = location_data.get('region', '')
                country = location_data.get('country', '')
                location_parts = [p for p in [city, region if region != city else None, country] if p]
                location_str = ', '.join(location_parts)
            else:
                return jsonify({'error': 'Location not available'}), 400

        current_date_str = datetime.now().strftime('%Y-%m-%d')
        uv_data = get_uv_data(lat, lng, current_date_str)

        if not uv_data or not uv_data.get('ok'):
            return jsonify({'error': 'UV data not available'}), 503

        current_uv = uv_data['now']['uvi']
        current_classification = get_uv_classification(current_uv)

        today = datetime.now()
        today_entry = {
            'dayName': today.strftime('%A'),
            'date': today.strftime('%B %-d'),
            'uvIndex': current_uv,
            'level': current_classification['level'],
            'advice': current_classification['recommendation'],
            'isToday': True
        }

        forecast_days = [today_entry]
        uv_by_date = {}
        for entry in uv_data.get('forecast', []):
            date = entry['time'][:10]
            if date == current_date_str:
                continue
            uvi = entry['uvi']
            if date not in uv_by_date or uvi > uv_by_date[date]:
                uv_by_date[date] = uvi

        for date_str, uv_value in sorted(uv_by_date.items()):
            try:
                date_obj = datetime.strptime(date_str, '%Y-%m-%d')
                classification = get_uv_classification(uv_value)
                forecast_days.append({
                    'dayName': date_obj.strftime('%A'),
                    'date': date_obj.strftime('%B %-d'),
                    'uvIndex': uv_value,
                    'level': classification['level'],
                    'advice': classification['recommendation'],
                    'isToday': False
                })
            except ValueError:
                continue

        return jsonify({
            'location': location_str,
            'forecast': forecast_days[:7]
        })

    except Exception as e:
        logger.error(f"Forecast API error: {e}")
        return jsonify({'error': 'Internal server error'}), 500


@app.route("/health")
def health_check():
    return jsonify({'status': 'healthy', 'timestamp': datetime.now().isoformat()})

# run locally for testing
if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5000)
