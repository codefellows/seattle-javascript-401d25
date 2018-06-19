'use strict';

const http = require('http');
const cowsay = require('cowsay');
const bodyParser = require('./body-parser.js');

const server = module.exports = {};

const app = http.createServer((req, res) => {
  bodyParser(req)
    .then((parsedRequest) => {
      if (parsedRequest.method === 'GET' && parsedRequest.url.pathname === '/api/time') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify({
          date: new Date(),
        }));
        res.end();
        return undefined;
      }

       // this method demos what happens when you make a GET request such as:
      // http GET :3000/api/cowsayPage?text=hello
      // You can also do: http GET :3000/api/cowasyPage text==hello
      // OR http :3000/api/cowsayPage text==hello because the request verb defaults to "GET"
      if (parsedRequest.method === 'GET' && parsedRequest.url.pathname === '/api/cowsayPage') {
        // HINT for lab: because we need a parsedRequest.url.query.text, how should we handle if a user doesn't put in a "text" value? 
        res.writeHead(200, { 'Content-Type': 'text/html' });
        const cowsayText = cowsay.say({ 
          text: parsedRequest.url.query.text,
        });
        res.write(`<section><h3><a href="api/time">Click here for current time</a></h3><pre>${cowsayText}</pre></section>`);
        res.end();
        return undefined;
      }

      // this method demos what happens when you make a POST request with arbitrary key/value pair data, i.e.:
      // http POST :3000/api/echo name=judy hometown=seattle
      // where "name" is the key and "judy" is the value
      if (parsedRequest.method === 'POST' && parsedRequest.url.pathname === '/api/echo') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify(parsedRequest.body));
        res.end();
        return undefined;
      }

      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.write('NOT FOUND');
      res.end();
      return undefined;
    })
    .catch((err) => {
      res.writeHead(400, { 'Content-Type': 'text/plain'});
      console.log(err);
      res.write('BAD REQUEST');
      res.end();
      return undefined;
    });
});


server.start = (port, callback) => app.listen(port, callback);
server.stop = callback => app.close(callback);
