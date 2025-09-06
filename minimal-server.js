// Minimal test server to check if basic Express works
const express = require('express');
const app = express();
const PORT = 5001;

app.get('/test', (req, res) => {
  res.json({ message: 'Server is working!' });
});

console.log('Starting minimal server...');

app.listen(PORT, () => {
  console.log(`Minimal server running on port ${PORT}`);
}).on('error', (err) => {
  console.error('Server error:', err);
});

setTimeout(() => {
  console.log('Server has been running for 5 seconds');
}, 5000);
