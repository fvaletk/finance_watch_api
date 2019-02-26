/** Dependencies */
const http = require('http');
const router = require('./start/router');

/** Services */
const logger = require('./services/log.service');

/** Methods */
module.exports = http.createServer((req, res) => {
  router.handleRequest(req, (statusCode, payload) => {
    res.setHeader('Content-Type', 'application/json');
    res.writeHead(statusCode);
    
    logger(req, statusCode);
    res.end(JSON.stringify(payload));
  });
});

