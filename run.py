#!/usr/bin/env python3

import os
import sys
from backend_web_code import app

def run_app():
    host = os.getenv('FLASK_HOST', '127.0.0.1')
    port = int(os.getenv('FLASK_PORT', 5000))
    debug_mode = os.getenv('FLASK_ENV', 'production').lower() == 'development'
    
    print(f"UV Index Web App running on http://{host}:{port}")
    print(f"Environment: {'Development' if debug_mode else 'Production'}")
    
    try:
        app.run(host=host, port=port, debug=debug_mode, threaded=True)
    except KeyboardInterrupt:
        print("\nServer stopped")
        sys.exit(0)
    except Exception as e:
        print(f"Error starting server: {e}")
        sys.exit(1)

if __name__ == '__main__':
    run_app() 