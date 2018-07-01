'use strict';

const Note = require('../model/note');
const logger = require('../lib/logger');
const customResponse = require('../lib/response');
module.exports = (router) => {
  router.post('/api/v1/note', (request, response) => {
    logger.log(logger.INFO, 'ROUTE-NOTE: POST /api/v1/note');
    const newNote = new Note(request.body);
    newNote.save()
      .then((note) => {
        customResponse.sendJSON(response, 200, note);
        return undefined;
      })
      .catch((err) => {
        logger.log(logger.INFO, `ROUTE NOTE: There was a bad request ${JSON.stringify(err.message)}`);
        customResponse.sendError(response, 400, err.message);
        return undefined;
      });
  });

  // /api/v1/note?id=12335
  router.get('/api/v1/note', (request, response) => {
    if (!request.url.query.id) {
      customResponse.sendError(response, 404, 'Your request requires an id');
      return undefined;
    }

    Note.findOne(request.url.query.id)
      .then((note) => {
        customResponse.sendJSON(response, 200, note);
      })
      .catch((err) => {
        console.log(err);
        customResponse.sendError(response, 404, err.message);
      });
    return undefined;
  });
};
