'use strict';

import { Router } from 'express';
import logger from '../lib/logger';
import Classroom from '../model/classroom';

const classRoomRouter = new Router();

classRoomRouter.post('/api/classrooms', (request, response, next) => {
  Classroom.init()
    .then(() => {
      logger.log(logger.INFO, `CLASSROOM ROUTER BEFORE SAVE: Saved a new classroom ${JSON.stringify(request.body)}`);
      return new Classroom(request.body).save();
    })
    .then((newClassroom) => {
      logger.log(logger.INFO, `CLASSROOM ROUTER AFTER SAVE: Saved a new classroom ${JSON.stringify(newClassroom)}`);
      return response.json(newClassroom);
    })
    .catch(next);
});

classRoomRouter.get('/api/classrooms/:id?', (request, response, next) => {
  Classroom.init()
    .then(() => {
      return Classroom.findOne({ _id: request.params.id });
    })
    .then((foundClassroom) => {
      logger.log(logger.INFO, `CLASSROOM ROUTER: FOUND THE MODEL, ${JSON.stringify(foundClassroom)}`);
      response.json(foundClassroom);
    })
    .catch(next);
});


export default classRoomRouter;
