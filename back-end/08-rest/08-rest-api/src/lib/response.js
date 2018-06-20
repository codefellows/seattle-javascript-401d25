'use strict';

const response = module.exports = {};

response.sendJSON = (res, status, data) => {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.write(JSON.stringify(data));
  res.end();
  return undefined;
};

response.sendError = (res, status, msg) => {
  res.writeHead(status, { 'Content-Type': 'text/plain' });
  res.write(msg);
  res.end();
  return undefined;
};
