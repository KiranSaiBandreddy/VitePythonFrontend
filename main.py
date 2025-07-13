#!/usr/bin/env python3
"""
Main entry point for the Flask application.
This file imports the Flask app from the server directory for Gunicorn to use.
"""

import sys
import os

# Add the server directory to the Python path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'server'))

# Import the Flask app from the server directory
from app import app

if __name__ == '__main__':
    # Run the Flask app directly if this script is executed
    app.run(host='0.0.0.0', port=5000, debug=True)