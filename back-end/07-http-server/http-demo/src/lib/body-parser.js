'use strict';

const url = require('url');
const queryString = require('querystring');

module.exports = function bodyParser(req) {
  return new Promise((resolve, reject) => {
    req.url = url.parse(req.url);
    req.url.query = queryString.parse(req.url.query);

    if (req.method !== 'POST' && req.method !== 'PUT') {
      return resolve(req);
    }

    let message = '';
    req.on('data', (data) => {
      message += data.toString();
    });

    req.on('end', () => {
      try {
        // this takes the JSON message and turns it into a JS object, and attaches it as the "body" propery on the bigger request object
        // possible errors: passing in ' ', usually resuls in a SyntaxError
        req.body = JSON.parse(message);
        return resolve(req);
      } catch (err) {
        return reject(err);
      }
    });

    req.on('error', err => reject(err));
    return undefined;
  });
};
