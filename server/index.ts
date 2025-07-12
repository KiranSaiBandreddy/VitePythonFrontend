import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { spawn } from 'child_process';
import path from 'path';

const app = express();
const port = 3000;

// Start Python Flask server
const pythonServer = spawn('python', ['app.py'], {
  cwd: path.join(process.cwd(), 'server'),
  stdio: 'pipe'
});

pythonServer.stdout.on('data', (data) => {
  console.log(`[python] ${data.toString().trim()}`);
});

pythonServer.stderr.on('data', (data) => {
  console.log(`[python] ${data.toString().trim()}`);
});

// Wait for Python server to start
setTimeout(() => {
  // Proxy API requests to Python Flask server
  app.use('/api', createProxyMiddleware({
    target: 'http://localhost:5001',
    changeOrigin: true,
    onError: (err, req, res) => {
      console.error('Proxy error:', err);
    }
  }));

  // Serve static files from client dist
  app.use(express.static(path.join(process.cwd(), 'client/dist')));

  // Handle all other routes by serving index.html
  app.get('*', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'client/dist/index.html'));
  });

  app.listen(port, () => {
    console.log(`[express] Server running on port ${port}`);
  });
}, 2000);

// Handle graceful shutdown
process.on('SIGTERM', () => {
  pythonServer.kill();
  process.exit(0);
});

process.on('SIGINT', () => {
  pythonServer.kill();
  process.exit(0);
});