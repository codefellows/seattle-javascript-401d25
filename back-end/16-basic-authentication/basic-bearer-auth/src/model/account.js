import mongoose from 'mongoose';
// this is used to generate a random hash
import bcrypt from 'bcrypt';

// used to generate random data
import crypto from 'crypto';
import jsonWebToken from 'jsonwebtoken';
import HttpErrors from 'http-errors';

// a common styling convention is captialize constant strings and numbers
const HASH_ROUNDS = 8;
const TOKEN_SEED_LENGTH = 128;

// this schema should never be sent over the server in an API call. This data should only ever stay in the database

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
        // 401 is the error code for unauthorized access
        throw new HttpErrors(401, 'ACCOUNT MODEL: incorrect data');
      }
      return this;
    })
    .catch((err) => {
      throw new HttpErrors(500, `ERROR CREATING TOKEN: ${JSON.stringify(err)}`);
    });
};

accountSchema.methods.createTokenPromise = function createTokenPromise() {
  // anytime this method is called, we will always be resetting this account instance's tokenSeed property and resaving this instance with the newly updated seed
  this.tokenSeed = crypto.randomBytes(TOKEN_SEED_LENGTH).toString('hex');
  return this.save()
    .then((updatedAccount) => {
      // at this point, we have a token seed generated
      // "sign" means "to encrypt"
      // this jsonWebToken.sign returns a promise that resolves with a token. When it resolves, I now have a token
      return jsonWebToken.sign({ tokenSeed: updatedAccount.tokenSeed }, process.env.SALT);
    })
    .catch((err) => {
      // you have to make a design choice how explicit you want to be with your error messages when handling errors for signup/login
      throw new HttpErrors(500, `ERROR SAVING ACCOUNT or ERROR WITH JWT: ${JSON.stringify(err)}`);
    });
};

const skipInit = process.env.NODE_ENV === 'development';

const Account = mongoose.model('accounts', accountSchema, 'accounts', skipInit);

Account.create = (username, email, password) => {
  // the bcrypt.hash method will hash the plaintext password 2^HASH_ROUNDS times, in this case 2^8 since we defined HASH_ROUNDS as "8" above. It is essentially doing this under the hood  The higher the hash rounds, the slower this process will be:
  /*
    brcrypt.hash(bcrypt.hash(bcrypt.hash(bcrypt.hash(bcrypt.hash(password, HASH_ROUNDS))))).....
  */
  return bcrypt.hash(password, HASH_ROUNDS)
    .then((passwordHash) => {
      password = null; /*eslint-disable-line*/
      const tokenSeed = crypto.randomBytes(TOKEN_SEED_LENGTH).toString('hex');
      return new Account({
        username,
        email,
        passwordHash,
        tokenSeed,
      }).save();
    })
    .catch((err) => {
      throw new HttpErrors(500, `ERROR WITH HASHING or ERR WITH SAVING ACCOUNT: ${JSON.stringify(err)}`);
    });
};

export default Account;
