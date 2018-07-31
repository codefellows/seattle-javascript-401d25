import { Router } from 'express';
import HttpErrors from 'http-errors';
import Account from '../model/account';
import basicAuthMiddleware from '../lib/middleware/basic-auth-middleware';
import logger from '../lib/logger';

const authRouter = new Router();

authRouter.post('/api/signup', (request, response, next) => {
  Account.init()
    .then(() => {
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
          // TODO: set token cookie here
          // Math is like this: days * milliseconds * minutes * seconds * hours
          // This gives us the number of milliseconds until our token cookie expires
          // setting a browser cookie this way only works on localhost, this will not work on the Heroku free tier, you will have a purchase a domain name to set a browser cookie on live deployment
          const cookieOptions = { maxAge: 7 * 1000 * 60 * 60 * 24 };
          response.cookie('X-401d25-Token', token, cookieOptions);
          return response.json({ token });
        })
        .catch(next);
    })
    .catch(next);
});

authRouter.get('/api/login', basicAuthMiddleware, (request, response, next) => {
  if (!request.account) return next(new HttpErrors(400, 'AUTH-ROUTER: invalid request'));
  Account.init()
    .then(() => {
      return request.account.createTokenPromise()
        .then((token) => {
          logger.log(logger.INFO, `AUTH-ROUTER /api/login - responding with a 200 status code and a token ${token}`);
          // TODO: add response.cookie here
          const cookieOptions = { maxAge: 7 * 1000 * 60 * 60 * 24 };
          response.cookie('X-401d25-Token', token, cookieOptions);
          return response.json({ token });
        })
        .catch(next);
    })
    .catch(next);
  return undefined;
});

export default authRouter;
