const http = require('http');
const httpProxy = require('http-proxy');

const proxyApi = new httpProxy.createProxyServer({
  target: {
    host: '127.0.0.1',
    port: 3000
  }
});
proxyApi.on('error', () => {});

const proxyStencil = new httpProxy.createProxyServer({
  target: {
    host: '127.0.0.1',
    port: 3334
  }
});
proxyStencil.on('error', () => {});

const proxyServer = http.createServer((req, res) => {
  if (req.url.match(/\/api/)) {
    proxyApi.web(req, res);
  } else {
    proxyStencil.web(req, res);
  }
});
proxyServer.on('error', () => {});

proxyServer.on('upgrade', (req, socket, head) => {
  proxyStencil.ws(req, socket, head);
});

console.log('Listen: http://127.0.0.1:5000');
proxyServer.listen(5000);
