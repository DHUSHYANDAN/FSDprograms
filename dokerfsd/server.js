// server.js
const express = require('express');
const app = express();
const port = 4000;

app.get('/', (req, res) => {
  res.send('pong');
});

app.listen(port, () => {
  console.log(`Ping server running at http://localhost:${port}`);
});
