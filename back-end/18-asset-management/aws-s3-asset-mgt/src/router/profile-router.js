import { Router } from 'express';
import HttpErrors from 'http-errors';
import Profile from '../model/profile';
import bearerAuthMiddleware from '../lib/middleware/bearer-auth-middleware';
import logger from '../lib/logger';

const profileRouter = new Router();

// the whole point of passing in bearerAuthMiddleware is to attach a user's account to the request object. If we get that far, we know this user is authorized to do CRUD operations on a profile that maps back to their account, therefore we can attach a required accountId onto the Profile instance because the bearerAuthMiddleware process gave us an account to access 
profileRouter.post('/api/profiles', bearerAuthMiddleware, (request, response, next) => {
  if (!request.account) return next(new HttpErrors(400, 'POST PROFILE ROUTER-AUTH: invalid request'));

  Profile.init()
    .then(() => {
      return new Profile({
        ...request.body, // this is an ES6 object rest-spread operator that makes a copy of an object
        accountId: request.account._id,
      })
        .save()
        .then((profile) => {
          logger.log(logger.INFO, `POST PROFILE ROUTER: new profile created with 200 code, ${JSON.stringify(profile, null, 2)}`);
          // do some logic here to exclude the accountId if you want to do that 
          return response.json(profile);
        })
        .catch(next);
    })
    .catch(next);
  return undefined;
});

// TODO: make a "me" route
profileRouter.get('/api/profiles/me', bearerAuthMiddleware, (request, response, next) => {
  if (!request.account) return next(new HttpErrors(400, 'GET PROFILE ROUTER-AUTH: invalid request'));
  return Profile.findOne({ accountId: request.account._id })
    .then((profile) => {
      if (!profile) return next(new HttpErrors(404, 'not found'));
      return response.json(profile);
    })
    .catch(next);
});

profileRouter.get('/api/profiles/:id?', bearerAuthMiddleware, (request, response, next) => {
  if (!request.account) return next(new HttpErrors(400, 'GET PROFILE ROUTER-AUTH: invalid request'));
  if (!request.params.id) {
    Profile.find({})
      .then((profiles) => {
        return response.json(profiles);
      })
      .catch(next);
    return undefined;
  }
  Profile.findOne({ _id: request.params.id })
    .then((profile) => {
      if (!profile) return next(new HttpErrors(400, 'profile not found'));
      logger.log(logger.INFO, `PROFILE ROUTER GET: found profile: ${JSON.stringify(profile, null, 2)}`);
      return response.json(profile);
    })
    .catch(next);
  return undefined;
});

// TODO: make a new put route
profileRouter.put('/api/profiles/:id?', bearerAuthMiddleware, (request, response, next) => {
  if (!request.account) return next(new HttpErrors(400, 'GET PROFILE ROUTER-AUTH: invalid request'));
  if (!request.params.id) {
    return next(new HttpErrors(400, 'No id entered'));
  }
  const options = { new: true, runValidators: true };
  Profile.findByIdAndUpdate(request.params.id, request.body, options)
    .then((updatedProfile) => {
      if (!updatedProfile) return next(new HttpErrors(404, 'profile not found'));
      return response.json(updatedProfile);
    })
    .catch(next);
});


export default profileRouter;
