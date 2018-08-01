import mongoose from 'mongoose';
import bcrypt from 'bcrypt'; // this is used to generate a random hash
import crypto from 'crypto'; // used to generate random data
import jsonWebToken from 'jsonwebtoken';
import HttpErrors from 'http-errors';

require('dotenv').config();


// a common styling convention is to capitalize constant strings and numbers
const HASH_ROUNDS = 1;
const TOKEN_SEED_LENGTH = 128;

// this schema should never be send over the server in an API call. This data should only ever stay in the database

const accountSchema = mongoose.Schema({
  passwordHash: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  tokenSeed: {
    type: String,
    required: true,
    unique: true,
  },
}, { timestamps: true });

// this is how we need to create instance methods according to Mongoose, using ".methods"
// this method is used during login to compare the plain text password entered by the user to the account's password hash
accountSchema.methods.verifyPasswordPromise = function verifyPasswordPromise(password) {
  return bcrypt.compare(password, this.passwordHash)
    .then((result) => {
      // result is just a boolean letting us know if the plain text password recvd equals the hashed password
      if (!result) {
        throw new HttpErrors(401, 'AUTH - incorrect data'); // 401 is the error code for unauthorized access
      }
      return this;
    });
};

accountSchema.methods.createTokenPromise = function createTokenPromise() {
  // "this" is equal to the current instance of the Account
  // anytime this method is called, we will always be resetting this account instance's tokenSeed property and resaving this instance with the newly updated seeed
  this.tokenSeed = crypto.randomBytes(TOKEN_SEED_LENGTH).toString('hex');
  return this.save()
    .then((updatedAccount) => {
      // at this point, we have a token seed generated
      // "sign" means "to encrypt"
      // this jsonWebToken.sign returns a promise that resolves with a token. When it resolves, I now have a token
      return jsonWebToken.sign({ tokenSeed: updatedAccount.tokenSeed }, process.env.SECRET_KEY);
    })
    .catch((err) => {
      // you have to make a design choice how explicit you want to be with your error messages when handling errors for signup/login
      throw new HttpErrors(500, `ERROR CREATING TOKEN: ${JSON.stringify(err)}`);
    });
};


const skipInit = process.env.NODE_ENV === 'development';
console.log(skipInit, 'skipInit');
const Account = mongoose.model('accounts', accountSchema, 'accounts', skipInit);
// const Account = mongoose.model('accounts', accountSchema);
// this is static method on the schema constructor itself
// this method is used during signup to create a new account in our database
Account.create = (username, email, password) => {
  // the bcrypt.hash method will hash the plaintext password 2^HASH_ROUNDS times, in this case 2^8 since we defined HASH_ROUNDS as "8" above. It is essentially doing this under the hood (imagine if HASH_ROUNDS = 5 in the below example). The higher the hash rounds, the slower this process will be:
  /*
    brcrypt.hash(bcrypt.hash(bcrypt.hash(bcrypt.hash(bcrypt.hash(password, HASH_ROUNDS)))))
  */
  return bcrypt.hash(password, HASH_ROUNDS)
    .then((passwordHash) => {
      // if we make it this far, we have the password hash, so we need ot get rid of plain text password right away
      password = null; /*eslint-disable-line*/
      // we convert this to hex because it is one of the forms HTTP is capable of reading
      const tokenSeed = crypto.randomBytes(TOKEN_SEED_LENGTH).toString('hex');
      return new Account({
        username,
        email,
        passwordHash,
        tokenSeed,
      }).save();
    });
};

export default Account;

