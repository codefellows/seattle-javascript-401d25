import { Router } from 'express';
import superagent from 'superagent';
import HttpErrors from 'http-errors';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import Account from '../model/account';
import logger from '../lib/logger';

const GOOGLE_OAUTH_URL = 'https://www.googleapis.com/oauth2/v4/token';
const OPEN_ID_URL = 'https://www.googleapis.com/plus/v1/people/me/openIdConnect';

require('dotenv').config();

const googleOAuthRouter = new Router();

googleOAuthRouter.get('/api/oauth/google', (request, response, next) => {
  return Account.init()
    .then(() => {
      if (!request.query.code) {
        logger.log(logger.ERROR, 'DID NOT GET CODE FROM GOOGLE');
        response.redirect(process.env.CLIENT_URL);
        return next(new HttpErrors(500, 'Google OAuth Error'));
      } 
      logger.log(logger.INFO, `RECEIVED A CODE FROM GOOGLE AND SENDING IT BACK TO GOOGLE: ${request.query.code}`);
  
      // Once we have a code from Google, we send it back to Google's server
  
      let accessToken;
      return superagent.post(GOOGLE_OAUTH_URL)
        .type('form')
        .send({
          code: request.query.code,
          grant_type: 'authorization_code',
          client_id: process.env.GOOGLE_OAUTH_ID,
          client_secret: process.env.GOOGLE_OAUTH_SECRET,
          redirect_uri: `${process.env.API_URL}/oauth/google`,
        })
        .then((googleTokenResponse) => {
          if (!googleTokenResponse.body.access_token) {
            logger.log(logger.ERROR, 'No Token from Google');
            return response.redirect(process.env.CLIENT_URL);
          }
          logger.log(logger.INFO, `RECEIVED GOOGLE ACCESS TOKEN: ${JSON.stringify(googleTokenResponse.body, null, 2)}`);
          accessToken = googleTokenResponse.body.access_token;
  
          logger.log(logger.INFO, `ACCESS TOKEN RECEIVED: ${JSON.stringify(accessToken)}`);
          return superagent.get(OPEN_ID_URL)
            .set('Authorization', `Bearer ${accessToken}`);
        })
        .then((openIDResponse) => {
          logger.log(logger.INFO, `OPEN ID: ${JSON.stringify(openIDResponse.body, null, 2)}`);
          const { email } = openIDResponse.body;

          // The front end now has no control over Google Oauth, this is all controlled by backend
          // making a check to see if I already have this Google account in the system
          return Account.findOne({ email })
            .then((foundAccount) => {
              // if I don't have this account, create a new on in the Mongo db
              if (!foundAccount) {
                // TODO:
                // Create our own account
                // Send TOKEN back to application
                // these properties come from Google's response
                // const username = `${openIDResponse.body.given_name}${openIDResponse.body.family_name}`;
                const username = email;
              
                const secret = `${crypto.randomBytes(30)}${process.env.SECRET_KEY}`;
            
                return Account.create(username, email, secret)
                  .then((account) => {
                    console.log(account);
                    // we assign the new Google token to the tokenseed prop of our account and resave it
                    account.tokenSeed = accessToken;
                    return account.save();
                  })
                  .then((updatedAccount) => {
                    console.log(updatedAccount, 'updatedAccount');
                    // we take the tokenseed prop from the account and encrypt it to send to the client
                    return jwt.sign({ tokenSeed: updatedAccount.tokenSeed }, process.env.SECRET_KEY);
                  })
                  .then((signedToken) => {
                    // we set the token as a cookie and redirect the clietn to go back to our main client URL
                    const cookieOptions = { maxAge: 7 * 1000 * 60 * 60 * 24 };
                    response.cookie('X-401d25-Token', signedToken, cookieOptions);
                    response.redirect(process.env.CLIENT_URL);
                  })
                  .catch(next);
              } else { // eslint-disable-line
                // if we do have an account, encrypt the tokenSeed and send it back to th client
                return jwt.sign({ tokenSeed: foundAccount.tokenSeed }, process.env.SECRET_KEY);
              }
            })
            .then((token) => {
              const cookieOptions = { maxAge: 7 * 1000 * 60 * 60 * 24 };
              // This will not work on outside of localhost
              response.cookie('X-401d25-Token', token, cookieOptions);
              response.redirect(process.env.CLIENT_URL);
              // response.json({ token });
            })
            .catch(next);
        })
        .catch(next);
    })
    .catch(next);
});

export default googleOAuthRouter;
