#!/bin/bash
gunicorn --bind 0.0.0.0:$PORT backend_web_code:app 