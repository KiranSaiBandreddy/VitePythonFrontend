// Direct Python server execution
import { spawn } from 'child_process';

const pythonProcess = spawn('python', ['app.py'], {
  cwd: import.meta.dirname,
  stdio: 'inherit'
});

pythonProcess.on('close', (code) => {
  process.exit(code || 0);
});

process.on('SIGTERM', () => pythonProcess.kill('SIGTERM'));
process.on('SIGINT', () => pythonProcess.kill('SIGINT'));