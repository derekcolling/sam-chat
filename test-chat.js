const http = require('http');

const req = http.request('http://localhost:3000/api/chat', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  }
}, (res) => {
  res.on('data', d => process.stdout.write(d));
});

req.on('error', error => {
  console.error(error);
});

req.write(JSON.stringify({
  messages: [{ role: 'user', content: "Hi Sam, I'm visiting Santa Monica!" }],
  modelId: 'gpt-4o-mini'
}));
req.end();
