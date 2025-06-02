# 🌞 UV Index Web Application

A modern, responsive web application that provides real-time UV index data and 7-day forecasts with health recommendations.

![UV Index App Demo](https://img.shields.io/badge/Status-Live-brightgreen) ![Python](https://img.shields.io/badge/Python-3.7+-blue) ![Flask](https://img.shields.io/badge/Flask-2.3+-lightgrey)

## ✨ Features

### 🎯 Core Functionality
- **Real-time UV Index**: Current UV levels based on your location
- **7-Day Forecast**: Extended UV predictions for planning outdoor activities
- **Automatic Location Detection**: Uses IP geolocation for convenience
- **Health Recommendations**: Detailed advice based on UV levels

### 🎨 Enhanced Design
- **Modern UI/UX**: Clean, responsive design with smooth animations
- **Color-coded Risk Levels**: Visual indicators for UV intensity
- **Mobile-First Design**: Optimized for all screen sizes
- **Dark/Light Gradients**: Beautiful visual appeal

### 🔧 Technical Features
- **Error Handling**: Robust error management with user-friendly messages
- **API Caching**: Improved performance with request caching
- **Auto-refresh**: Automatic data updates every 30 minutes
- **RESTful API**: JSON endpoints for external integrations

## 🚀 Quick Start

### Prerequisites
- Python 3.7 or higher
- Internet connection for API access

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd UV-Index-Web-Project
   ```

2. **Create a virtual environment** (recommended)
   ```bash
   python3 -m venv .venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the application**
   ```bash
   python run.py
   ```

5. **Open your browser**
   Navigate to `http://127.0.0.1:5000`

## 📱 Usage

### Web Interface
- **Home Page**: View current UV index and weekly forecast
- **Auto-refresh**: Click the refresh button or wait for automatic updates
- **Responsive**: Works on desktop, tablet, and mobile devices

### API Endpoints

#### Get Current UV Data
```http
GET /api/uv
```

**Response:**
```json
{
  "current_uv": 7.6,
  "classification": {
    "level": "High",
    "color": "high",
    "recommendation": "Protection required. Reduce sun exposure 10am-4pm..."
  },
  "timestamp": "2024-01-15T14:30:00.000Z"
}
```

#### Health Check
```http
GET /health
```

## 🎨 UV Index Classifications

| Level | Range | Color | Recommendation |
|-------|-------|-------|----------------|
| **Low** | 0-2 | 🟢 Green | No protection required |
| **Moderate** | 3-5 | 🟡 Yellow | Take precautions, seek shade |
| **High** | 6-7 | 🟠 Orange | Protection required, SPF 30+ |
| **Very High** | 8-10 | 🔴 Red | Extra protection, avoid 10am-4pm |
| **Extreme** | 11+ | 🟣 Purple | Stay indoors, SPF 50+ |

## ⚙️ Configuration

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `FLASK_HOST` | `127.0.0.1` | Server host address |
| `FLASK_PORT` | `5000` | Server port number |
| `FLASK_ENV` | `production` | Environment mode |

### Example Configuration
```bash
export FLASK_HOST=0.0.0.0
export FLASK_PORT=8080
export FLASK_ENV=development
python run.py
```

## 🔧 Development

### Project Structure
```
UV-Index-Web-Project/
├── backend_web_code.py      # Main Flask application
├── run.py                   # Production runner script
├── requirements.txt         # Python dependencies
├── Templates/
│   └── index_html.html     # Frontend template
├── README.md               # Documentation
└── .venv/                  # Virtual environment
```

### Adding Features
1. **Backend**: Modify `backend_web_code.py` for API changes
2. **Frontend**: Update `Templates/index_html.html` for UI changes
3. **Dependencies**: Add new packages to `requirements.txt`

### Code Quality
- Follow PEP 8 style guidelines
- Add logging for debugging
- Implement proper error handling
- Write descriptive docstrings

## 🌐 API Dependencies

This application uses the following external APIs:
- **IPInfo.io**: For geolocation services
- **CurrentUVIndex.com**: For UV index data

*Note: These are free APIs with rate limits. For production use, consider paid plans.*

## 🚀 Deployment

### Local Development
```bash
FLASK_ENV=development python run.py
```

### Production Deployment
```bash
# Using gunicorn (recommended for production)
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 backend_web_code:app

# Or using the built-in runner
FLASK_ENV=production python run.py
```

### Docker Deployment
```dockerfile
FROM python:3.9-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 5000
CMD ["python", "run.py"]
```

## 🔍 Troubleshooting

### Common Issues

1. **"Location not available"**
   - Check internet connection
   - Verify IPInfo.io API access

2. **"UV data not available"**
   - Check CurrentUVIndex.com API status
   - Verify network connectivity

3. **Port already in use**
   - Change port: `FLASK_PORT=8080 python run.py`
   - Kill existing process: `lsof -ti:5000 | xargs kill`

### Debug Mode
```bash
FLASK_ENV=development python run.py
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **CurrentUVIndex.com** for UV data API
- **IPInfo.io** for geolocation services
- **Font Awesome** for beautiful icons
- **Flask** community for the excellent framework

## 📞 Support

If you encounter any issues or have questions:
1. Check the troubleshooting section above
2. Search existing issues on GitHub
3. Create a new issue with detailed information

---

**Made with ❤️ for sun safety awareness**

*Stay protected, stay informed! 🌞🧴* 