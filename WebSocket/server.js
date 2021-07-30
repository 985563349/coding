const express = require('express');
const app = express();
const expressWs = require('express-ws')(app);

const PORT = 8080;

app.use((req, res, next) => {
  req.testing = 'testing';
  return next();
});

app.get('/', (req, res, next) => {
  res.send('hello WebSocket');
});

app.ws('/', (ws, req) => {
  ws.on('message', (msg) => {
    // 检测心跳
    if (msg === 'ping') {
      ws.send('pong');
    }
  });
});

app.listen(PORT, () =>
  console.log(`server running at: http://localhost:${PORT}`)
);
