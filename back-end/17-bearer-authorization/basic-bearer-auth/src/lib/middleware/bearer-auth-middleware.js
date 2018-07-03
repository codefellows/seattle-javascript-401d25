import HttpErrors from 'http-errors';
import jsonWebToken from 'jsonwebtoken';
import { promisify } from 'util';
import Account from '../../model/account';

const jwtVerify = promisify(jsonWebToken.verify);

export default (request, response, next) => {
  if (!request.headers.authorization) return next(new HttpErrors(400, 'BEARER AUTH MIDDLEWARE: no headers auth'));

  const token = request.headers.authorization.split('Bearer ')[1];
  if (!token) return next(new HttpErrors(400, 'BEARER AUTH MIDDLEWARE: no token'));

  // this will decrypt the token we got from the client side
  return jwtVerify(token, process.env.SECRET_KEY)
    .catch((error) => {
      // we can use a Promise.reject here and this error will skip down to the next catch block in the chain, if there is one
      return Promise.reject(new HttpErrors(400, `BEARER AUTH - jsonWebToken error ${JSON.stringify(error)}`));
    })
    .then((decryptedToken) => {
      /*
        decryptedToken = {
          tokenSeed: asdfast45249wa0dfasfdsadfsdf.....
          iat: some date....
        }
      */
      return Account.findOne({ tokenSeed: decryptedToken.tokenSeed })
    })
    .then((account) => {
      if (!account) return next(new HttpErrors(400, 'BEARER AUTH - no account found'));
      request.account = account;
      return next();
    })
    .catch(next);
};

