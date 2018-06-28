import { Router } from 'express';
import HttpErrors from 'http-errors';
import modelFinder from '../lib/middleware/model-middleware';
import logger from '../lib/logger';

const modelRouter = new Router();

modelRouter.param('model', modelFinder);

modelRouter.post('/api/:model', (request, response, next) => {
  const Model = request.model;
  Model.init()
    .then(() => {
      logger.log(logger.INFO, `MODEL-ROUTER, BEFORE SAVING A NEW ${request.params.model}: ${JSON.stringify(request.body)}`);
      return new Model(request.body).save();
    })
    .then((newResource) => {
      logger.log(logger.INFO, `MODEL-ROUTER AFTER SAVING A NEW ${request.params.model}: ${JSON.stringify(newResource)}`);
      return response.json(newResource);
    })
    .catch(next);
});

modelRouter.get('/api/:model/:id?', (request, response, next) => {
  if (!request.params.id) {
    return next(new HttpErrors(400, `No ${request.model} id entered`));
  }
  const Model = request.model;
  Model.init()
    .then(() => {
      return Model.findOne({ _id: request.params.id });
    })
    .then((foundModel) => {
      logger.log(logger.INFO, `MODEL-ROUTER: FOUND THE MODEL ${JSON.stringify(foundModel)}`);
      return response.json(foundModel);
    })
    .catch(next);
  return undefined;
});

export default modelRouter;
