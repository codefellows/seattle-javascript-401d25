import { Router } from 'express';
import HttpErrors from 'http-errors';
import logger from '../lib/logger';
import Student from '../model/student';
import classroom from '../model/classroom';

const studentRouter = new Router();

studentRouter.post('/api/students', (request, response, next) => {
  Student.init()
    .then(() => {
      logger.log(logger.INFO, `STUDENT ROUTER: POST BEFORE SAVE: ${JSON.stringify(request.body)}`);
      return new Student(request.body).save();
    })
    .then((newStudent) => {
      logger.log(logger.INFO, `STUDENT ROUTER: POST AFTER SAVE: ${JSON.stringify(newStudent)}`);
      response.json(newStudent);
    })
    .catch(next);
});

studentRouter.get('/api/students/:id?', (request, response, next) => {
  if (!request.params.id) {
    return next(new HttpErrors(400, 'Did not enter and ID'));
  }

  Student.init()
    .then(() => {
      return Student.findOne({ _id: request.params.id });
    })
    .then((foundStudent) => {
      logger.log(logger.INFO, `STUDENT ROUTER: AFTER GETTING STUDENT ${JSON.stringify(foundStudent)}`);
      return response.json(foundStudent);
    })
    .catch(next);
  return undefined;
});

export default studentRouter;
