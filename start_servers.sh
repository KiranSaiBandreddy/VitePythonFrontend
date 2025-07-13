#!/bin/bash

# Start Python Flask server in background
cd server
python app.py &
FLASK_PID=$!

# Wait a moment for Flask to start
sleep 2

# Start Vite frontend
cd ../client
npm run dev &
VITE_PID=$!

# Wait for both processes
wait $FLASK_PID
wait $VITE_PID