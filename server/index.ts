// Simple proxy to start Python Flask server
import { spawn } from 'child_process';
import path from 'path';

console.log('[server] Starting Python Flask server...');

// Start Python Flask server
const pythonServer = spawn('python', ['app.py'], {
  cwd: path.join(process.cwd(), 'server'),
  stdio: 'inherit'
});

pythonServer.on('error', (err) => {
  console.error('[server] Failed to start Python server:', err);
  process.exit(1);
});

pythonServer.on('exit', (code) => {
  console.log(`[server] Python server exited with code ${code}`);
  process.exit(code || 0);
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
  pythonServer.kill('SIGTERM');
});

process.on('SIGINT', () => {
  pythonServer.kill('SIGINT');
});