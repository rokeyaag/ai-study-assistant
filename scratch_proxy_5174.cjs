const http = require('http');

const targetPort = 5173;
const listenPort = 5174;

const server = http.createServer((req, res) => {
  const options = {
    hostname: '127.0.0.1',
    port: targetPort,
    path: req.url,
    method: req.method,
    headers: { ...req.headers, host: `localhost:${targetPort}` }
  };

  const proxyReq = http.request(options, (proxyRes) => {
    res.writeHead(proxyRes.statusCode, proxyRes.headers);
    proxyRes.pipe(res, { end: true });
  });

  proxyReq.on('error', (err) => {
    res.writeHead(502, { 'Content-Type': 'text/plain' });
    res.end('Proxy forward error: ' + err.message);
  });

  req.pipe(proxyReq, { end: true });
});

server.on('upgrade', (req, socket, head) => {
  const proxySocket = http.request({
    hostname: '127.0.0.1',
    port: targetPort,
    path: req.url,
    headers: { ...req.headers, host: `localhost:${targetPort}` },
    method: req.method
  });

  proxySocket.on('upgrade', (proxyRes, targetSocket, proxyHead) => {
    socket.write(
      `HTTP/1.1 101 Switching Protocols\r\n` +
      Object.keys(proxyRes.headers).map(h => `${h}: ${proxyRes.headers[h]}`).join('\r\n') +
      '\r\n\r\n'
    );
    if (proxyHead && proxyHead.length) targetSocket.unshift(proxyHead);
    targetSocket.pipe(socket);
    socket.pipe(targetSocket);
  });

  proxySocket.on('error', (err) => {
    socket.destroy();
  });

  proxySocket.end();
});

server.listen(listenPort, '0.0.0.0', () => {
  console.log(`Port forwarder running on http://localhost:${listenPort} -> http://localhost:${targetPort}`);
});
