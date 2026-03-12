# UV Index Web App

A pixel-art styled weather app that shows you the current UV index and a 7-day forecast for your location. It detects where you are automatically, tells you how strong the sun is each day, and gives simple advice on how to protect yourself. At night the app switches to a dark theme with a night sky.

The frontend is built with Next.js and the backend is a Flask API that pulls real UV data based on your IP location.

---

## Setup

You need Python 3.7+ and Node.js installed.

**Backend**

```bash
pip install -r requirements.txt
python run.py
```

Runs on `http://localhost:5000`

**Frontend**

```bash
cd frontend
pnpm install
pnpm dev
```

Runs on `http://localhost:3000` — open this in your browser.

Both need to be running at the same time.
