'use strict';
/*
This is the same as this:
const express = require('express);
const Router = express.Router;
 */
import { Router } from 'express';
import bodyParser from 'body-parser';
import Note from '../model/note';
import logger from '../lib/logger';


// this is a third party module we are using to tit replace 
// the body-parser we wrote from scratch in labs 8-9
// only pass this is as middleware to POST and PUT requests
const jsonParser = bodyParser.json();
const noteRouter = new Router();

noteRouter.post('/api/notes', jsonParser, (request, response) => {
  logger.log(logger.INFO, 'NOTE-ROUTER POST to /api/notes - processing a request');
  if (!request.body.title) {
    logger.log(logger.INFO, 'NOTE-ROUTER POST /api/notes: Responding with 400 error for no title');
    return response.sendStatus(400);
  }

  // I need run the init() method (which returns a promise) on POST and PUT requests because Mongoose is still in the process of indexing fields that I flagged as "unique". If I don't run init() first, I get false positive tests that don't properly catch for 409 conflit errors when duplicate values are posted to the db. 
  Note.init()
    .then(() => {
      return new Note(request.body).save();
    })
    .then((newNote) => {
      logger.log(logger.INFO, `NOTE-ROUTER POST:  a new note was saved: ${JSON.stringify(newNote)}`);
      return response.json(newNote);
    })
    .catch((err) => {
      // we will hit here if we have some misc. mongodb error or parsing id error
      if (err.message.toLowerCase().includes('cast to objectid failed')) {
        logger.log(logger.ERROR, `NOTE-ROUTER PUT: responding with 404 status code to mongdb error, objectId ${request.params.id} failed, ${err.message}`);
        return response.sendStatus(404);
      }

      // a required property was not included, i.e. in this case, "title"
      if (err.message.toLowerCase().includes('validation failed')) {
        logger.log(logger.ERROR, `NOTE-ROUTER PUT: responding with 400 status code for bad request ${err.message}`);
        return response.sendStatus(400);
      }
      // we passed in a title that already exists on a resource in the db because in our Note model, we set title to be "unique"
      if (err.message.toLowerCase().includes('duplicate key')) {
        logger.log(logger.ERROR, `NOTE-ROUTER PUT: responding with 409 status code for dup key ${err.message}`);
        return response.sendStatus(409);
      }

      // if we hit here, something else not accounted for occurred
      logger.log(logger.ERROR, `NOTE-ROUTER GET: 500 status code for unaccounted error ${JSON.stringify(err)}`);
      return response.sendStatus(500); // Internal Server Error
    });
  return undefined;
});

// you need this question mark after ":id" or else Express will skip to the catch-all in lib/server.js 
noteRouter.get('/api/notes/:id?', (request, response) => {
  logger.log(logger.INFO, 'NOTE-ROUTER GET /api/notes/:id = processing a request');

  // TODO:
  // if (!request.params.id) do logic here to return an array of all resources, else do the logic below

  return Note.findOne({ _id: request.params.id })
    .then((note) => {
      if (!note) {
        logger.log(logger.INFO, 'NOTE-ROUTER GET /api/notes/:id: responding with 404 status code for no note found');
        return response.sendStatus(404);
      }
      logger.log(logger.INFO, 'NOTE-ROUTER GET /api/notes/:id: responding with 200 status code for successful get');
      return response.json(note);
    })
    .catch((err) => {
      // we will hit here if we have a mongodb error or parsing id error
      if (err.message.toLowerCase().includes('cast to objectid failed')) {
        logger.log(logger.ERROR, `NOTE-ROUTER PUT: responding with 404 status code to mongdb error, objectId ${request.params.id} failed`);
        return response.sendStatus(404);
      }

      // if we hit here, something else not accounted for occurred
      logger.log(logger.ERROR, `NOTE-ROUTER GET: 500 status code for unaccounted error ${JSON.stringify(err)}`);
      return response.sendStatus(500);
    });
});

noteRouter.put('/api/notes/:id?', jsonParser, (request, response) => {
  if (!request.params.id) {
    logger.log(logger.INFO, 'NOTE-ROUTER PUT /api/notes: Responding with a 400 error code for no id passed in');
    return response.sendStatus(400);
  }

  // we need to pass these options into "findByIdAndUpdate" so we can actually return the newly modified document in the promise per "new", and "runValidators" ensures that the original validators we set on the model
  const options = {
    new: true,
    runValidators: true,
  };

  Note.init()
    .then(() => {
      return Note.findByIdAndUpdate(request.params.id, request.body, options)
    })
    .then((updatedNote) => {
      logger.log(logger.INFO, `NOTE-ROUTER PUT - responding with a 200 status code for successful updated note: ${JSON.stringify(updatedNote)}`);
      return response.json(updatedNote);
    })
    .catch((err) => {
      // we will hit here if we have some misc. mongodb error or parsing id error
      if (err.message.toLowerCase().includes('cast to objectid failed')) {
        logger.log(logger.ERROR, `NOTE-ROUTER PUT: responding with 404 status code to mongdb error, objectId ${request.params.id} failed, ${err.message}`);
        return response.sendStatus(404);
      }

      // a required property was not included, i.e. in this case, "title"
      if (err.message.toLowerCase().includes('validation failed')) {
        logger.log(logger.ERROR, `NOTE-ROUTER PUT: responding with 400 status code for bad request ${err.message}`);
        return response.sendStatus(400);
      }
      // we passed in a title that already exists on a resource in the db because in our Note model, we set title to be "unique"
      if (err.message.toLowerCase().includes('duplicate key')) {
        logger.log(logger.ERROR, `NOTE-ROUTER PUT: responding with 409 status code for dup key ${err.message}`);
        return response.sendStatus(409);
      }

      // if we hit here, something else not accounted for occurred
      logger.log(logger.ERROR, `NOTE-ROUTER GET: 500 status code for unaccounted error ${JSON.stringify(err)}`);
      return response.sendStatus(500);
    });
  return undefined;
});

export default noteRouter;
