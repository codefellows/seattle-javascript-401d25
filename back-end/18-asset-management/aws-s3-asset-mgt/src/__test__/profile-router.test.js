import superagent from 'superagent';
import faker from 'faker';
import { startServer, stopServer } from '../lib/server';
import { createAccountMockPromise } from './lib/account-mock';
import { removeAllResources } from './lib/profile-mock';
import Profile from '../model/profile';

const apiUrl = `http://localhost:${process.env.PORT}/api`;


describe('TESTING PROFILE ROUTER', () => {
  let mockData;
  let token;
  let account;
  // let password;
  beforeAll(async () => {
    startServer();
    mockData = await createAccountMockPromise(); // this part blocks until we retrieve the resolved value. Anything in this "beforeAll" block will not run below this line until the "await" function resolves
    token = mockData.token; /*eslint-disable-line*/
    account = mockData.account; /*eslint-disable-line*/
    // password = mockData.originalRequest.password; /*eslint-disable-line*/
  });
  afterAll(stopServer);
  afterEach(removeAllResources);

  describe('POST ROUTES TESTING', () => {
    test('POST 200 to /api/profiles for successfully created profile', async () => {
      const mockProfile = {
        bio: faker.lorem.words(20),
        firstName: 'Judy',
        lastName: 'uniqueLastName',
      };
      // const mockAccountResponse = await createAccountMockPromise();
      try {
        const response = await superagent.post(`${apiUrl}/profiles`)
          .set('Authorization', `Bearer ${token}`)
          .send(mockProfile);
        expect(response.status).toEqual(200);
        expect(response.body.accountId).toEqual(account._id.toString());
        expect(response.body.firstName).toEqual(mockProfile.firstName);
        expect(response.body.lastName).toEqual(mockProfile.lastName);
        expect(response.body.bio).toEqual(mockProfile.bio);
      } catch (err) {
        expect(err.status).toEqual(200);
      }
    });

    test('POST 401 for trying to post a profile with a bad token', async () => {
      try {
        await superagent.post(`${apiUrl}/profiles`)
          .set('Authorization', 'Bearer THISISABADTOKEN');
      } catch (err) {
        expect(err.status).toEqual(400);
      }
    });
  });
});
