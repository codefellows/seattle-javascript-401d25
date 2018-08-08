'use strict';

import User from './model.js';

export default (req, res, next) => {

  let authorize = (token) => {
    // Given a token, check with the User model to see if its valid
    User.authorize(token)
      .then(user => {
        // We will always get back a "user" from mongo ... although it might be real and it might be null
        if(!user) { getAuth(); }

        // Given a real user that must mean that our token was good. Let the user through.
        // in larger systems, you might want to attach an ACL or permissions to the req.user object here.
        else { next(); }
      })
      .catch(next);
  };

  let authenticate = (auth) => {
    // Validate the user using the model's authenticate method
    User.authenticate(auth)
    // We will always get back a "user" from mongo ... although it might be real and it might be null
      .then(user => {
        // If it's null, go to getAuth() ... which should return an error or a login page
        if (!user) { getAuth(); }
        // We must have a good user.  Generate a token and jack that onto the req object and move on
        // we could alternatively put the whole user instance on req.user if there's need for it later?
        else {
          req.token = user.generateToken();
          next();
        }
      })
    // Send any errors to next() which will invoke the error handling middleware
      .catch(next);

  };

  // If we're not authenticated either show an error or pop a window
  let getAuth = () => {
    // res.set({
    //   'WWW-Authenticate': 'Basic realm="Super Secret Area"'
    // }).send(401);

    // Send back a JSON formatted error object through our middleware
    next({status:401,statusMessage:'Unauthorized',message:'Invalid User ID/Password'});
  };

  // Try to authenticate -- parse out the headers and do some work!
  try {
    let auth = {};
    let authHeader = req.headers.authorization;

    if(!authHeader) {
      return getAuth();
    }

    // BASIC Auth
    if(authHeader.match(/basic/i)) {
      // authHeader will have a base64 encoded auth string in it
      //   i.e. Basic ZnJlZDpzYW1wbGU=

      // Break that apart ...
      let base64Header = authHeader.replace(/Basic\s+/i, ''); // ZnJlZDpzYW1wbGU=
      let base64Buffer = Buffer.from(base64Header,'base64'); // <Buffer 01 02...>
      let bufferString = base64Buffer.toString(); // john:mysecret
      let [username,password] = bufferString.split(':');  // variables username="john" and password="mysecret"
      auth = {username,password};  // {username:"john", password:"mysecret"}

      // Start the authentication train
      authenticate(auth);
    }
    else if(authHeader.match(/bearer/i)) {
      // i.e. Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI
      let token = authHeader.replace(/bearer\s+/i, '');
      authorize(token);
    }

    // authorize via capability .... depends on a parameter
  } catch(e) {
    next(e);
  }

};


