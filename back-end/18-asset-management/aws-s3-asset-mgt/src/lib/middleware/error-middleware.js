'use strict';

import logger from '../logger';

// in express, error handling middleware must follow this exact signature of four args, where the first arg is considered the error, and is followed by request, response, next
export default (error, request, response, next) => { /*eslint-disable-line*/
  logger.log(logger.ERROR, `ERROR MIDDLEWARE: ${JSON.stringify(error)}`);

  // I might have a status property
  if (error.status) {
    logger.log(logger.ERROR, `Responding with a ${error.status} code and message ${error.message}`);
    return response.sendStatus(error.status);
  }

  // if we make it this far, it's another type of error potentially related to MongoDB

  const errorMessage = error.message.toLowerCase();

  if (errorMessage.includes('objectid failed')) {
    logger.log(logger.ERROR, `Responding with a 404 status code ${errorMessage}`);
    return response.sendStatus(404);
  }

  if (errorMessage.includes('validation failed')) {
    logger.log(logger.ERROR, `Responding with a 400 code ${errorMessage}`);
    return response.sendStatus(400);
  }

  if (errorMessage.includes('duplicate key')) {
    logger.log(logger.ERROR, `Responding with a 409 code ${errorMessage}`);
    return response.sendStatus(409);
  }

  if (errorMessage.includes('unauthorized')) {
    logger.log(logger.ERROR, `Responding with a 401 code ${errorMessage}`);
    return response.sendStatus(401);
  }

  logger.log(logger.ERROR, `Responding with a 500 code ${JSON.stringify(error)}`);
  console.log(`Responding with a 500 code ${error}`);
  return response.sendStatus(500);
};
