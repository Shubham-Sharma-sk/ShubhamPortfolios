// start.js - Script to start both servers
const { spawn } = require('child_process');

// Start the Express API server on port 3000
const apiServer = spawn('node', ['server.js'], { 
  stdio: 'inherit',
  env: { ...process.env, PORT: 3000 }
});

// Start a static file server on port 8080
const staticServer = spawn('npx', ['live-server', '--port=8080', '--host=localhost', '--no-browser'], { 
  stdio: 'inherit' 
});

// Handle cleanup on exit
process.on('SIGINT', () => {
  console.log('\nShutting down servers...');
  apiServer.kill();
  staticServer.kill();
  process.exit();
});

console.log('Both servers started:');
console.log('API server running on http://localhost:3000');
console.log('Frontend server running on http://localhost:8080');
console.log('\nUse Ctrl+C to stop both servers');