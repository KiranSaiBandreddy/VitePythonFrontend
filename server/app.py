from flask import Flask, jsonify, send_from_directory, send_file
from flask_cors import CORS
from datetime import datetime
import pytz
import os

# Initialize Flask app
app = Flask(__name__)

# Enable CORS to allow requests from the React frontend
CORS(app, origins=['http://localhost:5173', 'http://127.0.0.1:5173', 'http://localhost:5000', 'http://127.0.0.1:5000'])

# Serve static files from the built frontend directory
@app.route('/')
def serve_index():
    """Serve the React app's index.html file"""
    try:
        return send_file('../dist/public/index.html')
    except FileNotFoundError:
        return jsonify({"error": "Frontend not built. Run 'npm run build' first."}), 404

@app.route('/<path:path>')
def serve_static(path):
    """Serve static assets from the built frontend directory"""
    try:
        return send_from_directory('../dist/public', path)
    except FileNotFoundError:
        # If file not found, serve index.html for client-side routing
        try:
            return send_file('../dist/public/index.html')
        except FileNotFoundError:
            return jsonify({"error": "Frontend not built. Run 'npm run build' first."}), 404

@app.route('/api/timestamp', methods=['GET'])
def get_timestamp():
    """
    Get the current UTC timestamp endpoint.
    Returns the current UTC timestamp in human-readable format.
    """
    try:
        # Get current UTC time
        utc_now = datetime.now(pytz.UTC)
        
        # Format timestamp as "YYYY-MM-DD HH:MM:SS UTC"
        formatted_timestamp = utc_now.strftime("%Y-%m-%d %H:%M:%S UTC")
        
        # Return JSON response
        return jsonify({
            "timestamp": formatted_timestamp
        }), 200
        
    except Exception as e:
        # Handle any errors that might occur
        return jsonify({
            "error": f"Failed to generate timestamp: {str(e)}"
        }), 500

@app.route('/health', methods=['GET'])
def health_check():
    """
    Simple health check endpoint to verify the server is running.
    """
    return jsonify({
        "status": "healthy",
        "message": "Timestamp server is running"
    }), 200

@app.errorhandler(404)
def not_found(error):
    """
    Handle 404 errors with a JSON response.
    """
    return jsonify({
        "error": "Endpoint not found"
    }), 404

@app.errorhandler(500)
def internal_error(error):
    """
    Handle 500 errors with a JSON response.
    """
    return jsonify({
        "error": "Internal server error"
    }), 500

if __name__ == '__main__':
    # Run the Flask app
    # Bind to 0.0.0.0 to make it accessible from outside the container
    # Use port 5000 as specified in the requirements
    app.run(host='0.0.0.0', port=5000, debug=True)
