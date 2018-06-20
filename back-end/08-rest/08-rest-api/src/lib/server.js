'use strict';

const http = require('http');

const server = module.exports = {};
const Router = require('./router');

const router = new Router();
require('../route/note-router')(router);

const app = http.createServer(router.route());

server.start = (port, callback) => app.listen(port, callback);
server.stop = callback => app.close(callback);
