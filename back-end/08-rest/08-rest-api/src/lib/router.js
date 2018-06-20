'use strict';

const logger = require('./logger');
const bodyParser = require('./body-parser');
const customResponse = require('./response');


module.exports = class Router {
  constructor() {
    this.routes = {
      GET: {
      // Just a hard-coded example
      // '/api/v1/note': (req, res) => {},
      // '/api/v1/note?id': (req, res) => {},
      },
      POST: {},
      PUT: {},
      DELETE: {},
    };
  }

  /*eslint-disable*/
  /*
    This next bit of code creates a set of functions that will accept route definitions.
    When this completes, you will end up with functions created like
    these (below), which you can later use to create actual routes

    router.get = (endpoint, callback) = function(endpoint,callback) { router.routes[method][endpoint] = callback; }
    router.post = (endpoint, callback) = function(endpoint,callback) { router.routes[method][endpoint] = callback; }
    ...

    So ... if you were to do this in some other module:
      router.route.get('/foo', (req,res) => console.log("Hi"));
      router.route.get('/bar', (req,res) => console.log("Bye"));

      That would result in a new router table entries like this:

      router.GET: {
        '/foo': (req,res) => console.log("Hi")),
        '/bar': (req,res) => console.log("Bye"))
      }

  */

  get(endpoint, callback) {
    this.routes.GET[endpoint] = callback;
  }

  post(endpoint, callback) {
    this.routes.POST[endpoint] = callback;
  }

  put(endpoint, callback) {
    this.routes.PUT[endpoint] = callback;
  }
  delete(endpoint, callback) {
    this.routes.DELETE[endpoint] = callback;
  }

  route() {
    return (request, response) => {
      Promise.all([bodyParser(request)]) 
      // no need for a Promise.all, but just 
      // demo'ing another Promise method we can use, 
      // where Promise.all takes an aray of promises and resolves them
      // takes an array (or any iterable) and returns a promise that resolves
      // when all of the promises in the
      // iterable argument have resolved, or rejects 
      // with the reason of the first passed promise that rejects.
        .then(() => {
          // [request.method] = 'GET' 'POST' 'PUT' 'DELETE'
          const requestResponseCallback = this.routes[request.method][request.url.pathname];
          const isFunction = typeof requestResponseCallback === 'function';
          if (isFunction) return requestResponseCallback(request, response);
          
          customResponse.sendError(response, 404, 'Route Not Registered');
          return undefined;
        })
        .catch((err) => {
          logger.log(logger.INFO, JSON.stringify(err));
          // This might be better as a 400 perhaps
          customResponse.sendError(response, 404, 'Route Not Found');
          return undefined;
        });
    };
  }
};

