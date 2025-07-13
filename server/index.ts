// Simple wrapper to run Python Flask server
import { exec } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('[server] Starting Python Flask server...');

const pythonProcess = exec('python app.py', {
  cwd: __dirname
});

pythonProcess.stdout?.on('data', (data) => {
  console.log(`[python] ${data.toString().trim()}`);
});

pythonProcess.stderr?.on('data', (data) => {
  console.log(`[python] ${data.toString().trim()}`);
});

pythonProcess.on('exit', (code) => {
  console.log(`[python] Process exited with code ${code}`);
  process.exit(code || 0);
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
  pythonProcess.kill('SIGTERM');
});

process.on('SIGINT', () => {
  pythonProcess.kill('SIGINT');
});