import { Router } from 'express';
import HttpErrors from 'http-errors';
import Profile from '../model/profile';
import bearerAuthMiddleware from '../lib/middleware/bearer-auth-middleware';
import logger from '../lib/logger';

const profileRouter = new Router();

// the whole point of passing in bearerAuthMiddleware is to attach a user's account to the request object. If we get that far, we know this user is authorized to do CRUD operations on a profile that maps back to their account, therefore we can attach a required accountId onto the Profile instance because the bearerAuthMiddleware process gave us an account to access 

profileRouter.post('/api/profiles', bearerAuthMiddleware, (request, response, next) => {
  if (!request.account) return next(new HttpErrors(400, 'POST PROFILE_ROUTER: invalid request'));

  Profile.init()
    .then(() => {
      return new Profile({
        ...request.body, // this is an ES6 object rest-spread operator that makes a shallow copy of an object
        accountId: request.account._id,
      }).save();
    })
    .then((profile) => {
      logger.log(logger.INFO, `POST PROFILE ROUTER: new profile created with 200 code, ${JSON.stringify(profile)}`);
      return response.json(profile);
    })
    .catch(next);
});

profileRouter.get('/api/profiles/:id?', bearerAuthMiddleware, (request, response, next) => {
  if (!request.account) return next(new HttpErrors(400, 'GET PROFILE ROUTER: invalid request'));

  if (!request.params.id) {
    return Profile.find({})
      .then((profiles) => {
        return response.json(profiles);
      })
      .catch(next);
  }

  Profile.findOne({ _id: request.params.id })
    .then((profile) => {
      if (!profile) return next(new HttpErrors(400, 'PROFILE ROUTER GET: profile not found'));
      return response.json(profile);
    })
    .catch(next);
  return undefined;
});

export default profileRouter;

