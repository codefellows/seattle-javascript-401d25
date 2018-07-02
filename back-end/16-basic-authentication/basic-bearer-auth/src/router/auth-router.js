import { Router } from 'express';
import HttpErrors from 'http-errors';
import Account from '../model/account';
import basicAuthMiddleware from '../lib/middleware/basic-auth-middleware';
import logger from '../lib/logger';

const authRouter = new Router();

authRouter.post('/api/signup', (request, response, next) => {
  return Account.create(request.body.username, request.body.email, request.body.password)
    .then((account) => {
      // we want to get rid of the password as early as possible
      delete request.body.password;
      logger.log(logger.INFO, 'AUTH-ROUTER /api/signup: creating token');
      return account.createTokenPromise();
    })
    .then((token) => {
      logger.log(logger.INFO, `AUTH-ROUTER /api/signup: returning a 200 code and a token ${token}`);
      // what comes back from the above "token" in the then callback is actually an object with a "token" property, i.e. {token: token}, so we use shorthand ES6 object destructuring to grab just the token value itself and send that as JSON to the user
      return response.json({ token });
    })
    .catch(next);
});

authRouter.get('/api/login', basicAuthMiddleware, (request, response, next) => {
  if (!request.account) return next(new HttpErrors(400, 'AUTH-ROUTER: invalid request'));
  return request.account.createTokenPromise()
    .then((token) => {
      logger.log(logger.INFO, `AUTH-ROUTER /api/login - responding with a 200 status code and a token ${token}`);
      return response.json({ token });
    })
    .catch(next);
});

export default authRouter;
