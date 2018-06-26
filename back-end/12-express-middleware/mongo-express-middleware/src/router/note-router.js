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

noteRouter.post('/api/notes', jsonParser, (request, response, next) => {
  logger.log(logger.INFO, 'NOTE-ROUTER POST to /api/notes - processing a request');
  if (!request.body.title) {
    logger.log(logger.INFO, 'NOTE-ROUTER POST /api/notes: Responding with 400 error for no title');
    const error = new Error('No Title given');
    error.status = 400;
    return next(error);
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
    .catch(next);
  return undefined;
});

// you need this question mark after ":id" or else Express will skip to the catch-all in lib/server.js 
noteRouter.get('/api/notes/:id?', (request, response, next) => {
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
    .catch(next);
});

noteRouter.put('/api/notes/:id?', jsonParser, (request, response, next) => {
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
    .catch(next);
  return undefined;
});

export default noteRouter;
