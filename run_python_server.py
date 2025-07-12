#!/usr/bin/env python3
"""
Simple script to run the Python Flask server
"""
import subprocess
import sys
import os

if __name__ == "__main__":
    # Change to server directory
    os.chdir("server")
    
    # Run the Flask app
    subprocess.run([sys.executable, "app.py"])