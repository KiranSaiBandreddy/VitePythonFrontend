import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, RefreshCw, CheckCircle, AlertTriangle, Info } from "lucide-react";

interface TimestampResponse {
  timestamp: string;
}

type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export default function Home() {
  const [timestamp, setTimestamp] = useState<string>("");
  const [loadingState, setLoadingState] = useState<LoadingState>('idle');
  const [error, setError] = useState<string>("");
  const [lastUpdated, setLastUpdated] = useState<string>("");

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
      setLastUpdated("Just now");
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

  const formatLastUpdated = (lastUpdated: string) => {
    if (lastUpdated === "Just now") return lastUpdated;
    return new Date(lastUpdated).toLocaleString();
  };

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-2xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Current Timestamp App</h1>
          <p className="text-gray-600">Get the current UTC timestamp in real-time</p>
        </div>

        {/* Main Timestamp Card */}
        <Card className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-6">
          <CardContent className="text-center">
            <div className="mb-4">
              <Clock className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            </div>
            
            {/* Timestamp Display */}
            <div className="mb-8">
              {loadingState === 'loading' && (
                <div className="flex items-center justify-center">
                  <RefreshCw className="w-8 h-8 animate-spin text-blue-600 mr-3" />
                  <span className="text-xl text-gray-600">Loading timestamp...</span>
                </div>
              )}
              
              {loadingState === 'success' && (
                <div>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                    <div className="flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                      <span className="text-sm text-green-800">Timestamp updated successfully</span>
                    </div>
                  </div>
                  <div className="text-3xl font-mono font-bold text-green-600 bg-green-50 px-6 py-4 rounded-lg border border-green-200">
                    {timestamp}
                  </div>
                  <div className="text-sm text-gray-500 mt-2">
                    Last updated: {formatLastUpdated(lastUpdated)}
                  </div>
                </div>
              )}
              
              {loadingState === 'error' && (
                <div>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                    <div className="flex items-center justify-center">
                      <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
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
            <Button
              onClick={handleRefresh}
              disabled={loadingState === 'loading'}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-200 min-w-[200px]"
              size="lg"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${loadingState === 'loading' ? 'animate-spin' : ''}`} />
              Get Latest Timestamp
            </Button>
          </CardContent>
        </Card>

        {/* API Information Card */}
        <Card className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900 flex items-center">
              <Info className="w-5 h-5 text-blue-600 mr-2" />
              API Information
            </CardTitle>
          </CardHeader>
          <CardContent>
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
                <span className="font-medium text-gray-700">Server Port:</span>
                <span className="text-gray-600">5000</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
