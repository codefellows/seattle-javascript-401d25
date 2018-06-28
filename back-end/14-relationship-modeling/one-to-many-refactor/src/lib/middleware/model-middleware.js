'use strict';

import HttpErrors from 'http-errors';
import modelMapPromise from '../../model/';
import logger from '../logger';

export default (request, response, next) => {
  logger.log(logger.INFO, 'HITTING MODEL MIDDLEWARE');
  // /api/:model
  return modelMapPromise()
    .then((modelMap) => {
      /*
        modelMap = {
            classrooms: points to the required in module that comes from ./classrooms
            students: points to the required in module that comes from ./students
            './foo.js': points to the required in module that comes './foo.js
          }
      */
      const modelParamsExists = request.params && request.params.model;
      // model will either equal classrooms, students, or whatever comes into apiUrl, or '';
      const model = modelParamsExists ? request.params.model : '';
      if (modelMap[model]) {
        request.model = modelMap[model].default;
        logger.log(logger.INFO, 'MODEL MIDDLEWARE: Succesfully attached model to request');
        return next();
      }
      logger.log(logger.ERROR, 'MODEL MIDDLEWARE: Made a bad request for a model that doesn\'t exist');
      return next(new HttpErrors(400, 'You did not enter a proper Mongoose model'));
    })
    .catch(next);
};

