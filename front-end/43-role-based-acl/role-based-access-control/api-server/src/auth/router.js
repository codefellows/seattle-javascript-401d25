'use strict';

import express from 'express';

const authRouter = express.Router();

import User from './model.js';
import auth from './middleware.js';
import oauth from './lib/oauth.js';

// Generally, these will send a Token Cookie and do a redirect.
// For now, just spew out the token to prove we're ok.

authRouter.post('/signup', (req, res, next) => {
  let user = new User(req.body);
  user.save().then((user) => res.send(user.generateToken())).catch(next);
});

authRouter.post('/login', auth, (req, res, next) => {
  res.cookie('auth', req.token);
  res.send(req.token);
});

authRouter.get('/oauth', (req, res, next) => {
  let URL = process.env.CLIENT_URL;

  // Offload the oauth handshaking process to a module designed
  // to do that job. The route itself shouldn't contain any logic...
  oauth
    .authorize(req)
    .then((token) => {
      res.cookie('auth', token);
      res.redirect(`${URL}?token=${token}`);
    })
    .catch(next);
});

// A little proof of life here, to show how we can protect any
// route with our auth middleware
authRouter.get('/showMeTheMoney', auth, (req, res, next) => {
  res.send('Here is all the ca$h');
});

export default authRouter;
