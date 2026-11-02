import { spawn } from 'node:child_process';
import path from 'node:path';

const root = process.cwd();
const viteCli = path.join(root, 'node_modules', 'vite', 'bin', 'vite.js');
const children = [];

function start(command, args) {
  const child = spawn(command, args, {
    cwd: root,
    env: process.env,
    stdio: 'inherit',
    shell: false,
  });
  children.push(child);
  child.on('exit', (code, signal) => {
    if (signal || code !== 0) {
      console.error(command + ' stopped' + (code == null ? ' with ' + signal : ' with code ' + code) + '.');
    }
  });
  return child;
}

start(process.execPath, [
  '--env-file-if-exists=.env',
  '--env-file-if-exists=server/.env',
  'server/index.mjs',
]);
start(process.execPath, [viteCli]);

function shutdown(signal) {
  for (const child of children) {
    if (!child.killed) child.kill(signal);
  }
  process.exit(0);
}

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));