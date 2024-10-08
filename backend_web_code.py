from flask import Flask, render_template
import requests
from datetime import datetime

# Initialize the Flask application
app = Flask(__name__)

# Define the home route
@app.route("/")
def home():
    # Use requests to get the user's latitude and longitude
    response = requests.get('https://ipinfo.io/json')
    if response.status_code == 200:
        data = response.json()
        lat, lng = data['loc'].split(',')
        latitude = lat
        longitude = lng
    else:
        print(f"Failed to retrieve data: {response.status_code}")
        latitude = None
        longitude = None

    # Get the current date and format it
    current_date = datetime.now()
    formatted_date = current_date.strftime('%Y-%m-%d')

    # Retrieve the city from geolocation data
    city = f'You are in {data.get("city", "Unknown")}' if latitude and longitude else 'Location unavailable'
    
    title = f'UV RAYS TODAY'

    # Function to get UV index and forecast data
    def get_uv_index(latitude, longitude):
        if not latitude or not longitude:
            return None, None
        url = f'https://currentuvindex.com/api/v1/uvi?latitude={latitude}&longitude={longitude}'
        response = requests.get(url)
        data = response.json()
        if data['ok']:
            # Retrieve current UV index and forecast
            current_uv = data['now']['uvi']
            forecast_uv = data['forecast']
            uv_by_date = print_forecast(forecast_uv)
            formatted_dates = formated_dates(uv_by_date)
            return current_uv, formatted_dates
        else:
            raise Exception(data['message'])

    # Function to process forecast data
    def print_forecast(forecast_uv):
        filtered_forecast = [i for i in forecast_uv if formatted_date not in i['time']]
        uv_by_date = {}
        for entry in filtered_forecast:
            date = entry['time'][:10]
            uvi = entry['uvi']
            if date not in uv_by_date:
                uv_by_date[date] = uvi
            else:
                uv_by_date[date] = max(uv_by_date[date], uvi)
        return uv_by_date

    # Function to format dates and classify UV index
    def formated_dates(uv_by_date):
        formatted = []
        for key, value in uv_by_date.items():
            # Convert date string to a formatted string
            date_obj = datetime.strptime(key, '%Y-%m-%d')
            day_of_week = date_obj.strftime('%A')
            day_of_week_number = date_obj.strftime('%d')
            month_name = date_obj.strftime('%B')
            formatted_date_str = f"{day_of_week}, {month_name} {day_of_week_number}"
            # Determine the UV class for styling
            uv_class = determine_uv_class(value)
            formatted.append((formatted_date_str, value, uv_class))
        
        return formatted

    # Function to determine UV index class
    def determine_uv_class(uv_index):
        if uv_index <= 2:
            return 'low'
        elif 3 <= uv_index <= 5:
            return 'moderate'
        else:
            return 'high'

    # Get current UV index and forecast
    if latitude and longitude:
        current_uv, formatted_dates = get_uv_index(latitude, longitude)
        uv_class = determine_uv_class(current_uv) if current_uv else 'low'
    else:
        current_uv = None
        formatted_dates = []
        uv_class = 'low'

    # Render the HTML template with data
    return render_template('index_html.html', city=city, title=title, current_uv=f'Current UV: {current_uv}' if current_uv else 'Unable to fetch UV data', uv_class=uv_class, forecast=formatted_dates)

# Run the Flask app
if __name__ == "__main__":
    app.run()
