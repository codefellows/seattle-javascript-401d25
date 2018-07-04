import superagent from 'superagent';
import faker from 'faker';

import { startServer, stopServer } from '../lib/server';
import { createAccountMockPromise, removeAccountMockPromise } from './lib/account-mock';


const apiUrl = `http://localhost:${process.env.PORT}/api`;

describe('AUTH router', () => {
  beforeAll(startServer);
  afterAll(stopServer);
  afterEach(removeAccountMockPromise);

  test('POST 200 to /api/signup for successful account creation and receipot of a TOKEN', () => {
    const mockAccount = {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: 'thisIsATerriblePassword1234',
    };
    return superagent.post(`${apiUrl}/signup`)
      .send(mockAccount)
      .then((response) => {
        expect(response.status).toEqual(200);
        expect(response.body.token).toBeTruthy();
      })
      .catch((err) => {
        throw err;
      });
  });

  test('POST 409 to api/signup for duplicate username', () => {
    return createAccountMockPromise()
      .then((mockData) => {
        return superagent.post(`${apiUrl}/signup`)
          .send({ username: mockData.account.username, email: mockData.account.email, password: '134566'})
      })
      .then((response) => {
        throw response;
      })
      .catch((err) => {
        expect(err.status).toEqual(409);
      });
  });


  test('GET 200 to api/login for successful login and receipt of a TOKEN', () => {
    // in order to login, we need to create a mock account first
    return createAccountMockPromise()
      .then((mockData) => {
        return superagent.get(`${apiUrl}/login`)
          .auth(mockData.account.username, mockData.originalRequest.password); // this is how we send authorization headers via REST/HTTP
      })
      .then((response) => {
        // When I login, I get a 200 status code and a TOKEN
        expect(response.status).toEqual(200);
        expect(response.body.token).toBeTruthy();
      })
      .catch((err) => {
        throw err;
      });
  });

  test('GET 400 to /api/login for unsuccesful login with bad username and password', () => {
    return superagent.get(`${apiUrl}/login`)
      .auth('bad username', 'bad password')
      .then((response) => {
        throw response;
      })
      .catch((err) => {
        expect(err.status).toEqual(400);
      });
  });
});
