import React, { useState, useEffect } from "react";

interface TimestampResponse {
  timestamp: string;
}

type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export default function App() {
  const [timestamp, setTimestamp] = useState<string>("");
  const [loadingState, setLoadingState] = useState<LoadingState>('idle');
  const [error, setError] = useState<string>("");

  const fetchTimestamp = async () => {
    setLoadingState('loading');
    setError("");
    
    try {
      const response = await fetch('/api/timestamp');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: TimestampResponse = await response.json();
      setTimestamp(data.timestamp);
      setLoadingState('success');
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch timestamp");
      setLoadingState('error');
    }
  };

  // Fetch timestamp on initial page load
  useEffect(() => {
    fetchTimestamp();
  }, []);

  const handleRefresh = () => {
    fetchTimestamp();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Current Timestamp App</h1>
          <p className="text-gray-600">Get the current UTC timestamp in real-time</p>
        </div>

        {/* Main Timestamp Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-6">
          <div className="text-center">
            <div className="mb-4">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            
            {/* Timestamp Display */}
            <div className="mb-8">
              {loadingState === 'loading' && (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mr-3"></div>
                  <span className="text-xl text-gray-600">Loading timestamp...</span>
                </div>
              )}
              
              {loadingState === 'success' && (
                <div>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                    <div className="flex items-center justify-center">
                      <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm text-green-800">Timestamp updated successfully</span>
                    </div>
                  </div>
                  <div className="text-3xl font-mono font-bold text-green-600 bg-green-50 px-6 py-4 rounded-lg border border-green-200">
                    {timestamp}
                  </div>
                </div>
              )}
              
              {loadingState === 'error' && (
                <div>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                    <div className="flex items-center justify-center">
                      <svg className="w-5 h-5 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L5.732 19c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                      <span className="text-sm text-red-800">Failed to fetch timestamp</span>
                    </div>
                  </div>
                  <div className="text-lg text-red-600 font-medium">
                    Timestamp not available
                  </div>
                  <div className="text-sm text-gray-500 mt-2">
                    Please check your connection and try again
                  </div>
                  {error && (
                    <div className="text-sm text-red-600 mt-2 font-mono bg-red-50 p-2 rounded">
                      Error: {error}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Action Button */}
            <button
              onClick={handleRefresh}
              disabled={loadingState === 'loading'}
              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-200 min-w-[200px]"
            >
              <div className="flex items-center justify-center">
                <svg className={`w-4 h-4 mr-2 ${loadingState === 'loading' ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Get Latest Timestamp
              </div>
            </button>
          </div>
        </div>

        {/* API Information Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
          <div className="mb-4">
            <h3 className="text-xl font-semibold text-gray-900 flex items-center">
              <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              API Information
            </h3>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="font-medium text-gray-700">Endpoint:</span>
              <code className="bg-gray-200 px-2 py-1 rounded font-mono text-gray-800">GET /api/timestamp</code>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="font-medium text-gray-700">Response Format:</span>
              <code className="bg-gray-200 px-2 py-1 rounded font-mono text-gray-800">{"{"}"timestamp": "YYYY-MM-DD HH:MM:SS UTC"{"}"}</code>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="font-medium text-gray-700">Server:</span>
              <span className="text-gray-600">Python Flask</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}