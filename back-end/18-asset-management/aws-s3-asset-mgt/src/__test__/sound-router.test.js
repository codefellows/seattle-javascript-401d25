'use strict';

import superagent from 'superagent';
import { startServer, stopServer } from '../lib/server';
import { createSoundMockPromise, removeSoundsAndAccounts } from './lib/sound-mock';

const dogMp3 = `${__dirname}/asset/dog.mp3`;
const apiUrl = `http://localhost:${process.env.PORT}/api/sounds`;

describe('TESTING ROUTES AT /api/sounds', () => {
  let token;
  let account;
  let sound;
  beforeAll(startServer);
  afterAll(stopServer);
  beforeEach(async () => {
    try {
      const mockData = await createSoundMockPromise();
      token = mockData.token; /*eslint-disable-line*/
      account = mockData.account; /*eslint-disable-line*/
      sound = mockData.sound; /*eslint-disable-line*/
    } catch (err) {
      return console.log(err);
    }
    return undefined;
  });
  afterEach(async () => {
    await removeSoundsAndAccounts();
  });

  describe('POST ROUTES TO /api/sounds', () => {
    test('POST 200', async () => {
      try {
        const response = await superagent.post(apiUrl)
          .set('Authorization', `Bearer ${token}`)
          .field('title', 'dog barks')
          .attach('sound', dogMp3);
        expect(response.status).toEqual(200);
        expect(response.body.title).toEqual('dog barks');
        expect(response.body._id).toBeTruthy();
        expect(response.body.url).toBeTruthy();
        expect(response.body.url).toBeTruthy();
      } catch (err) {
        console.log(err);
        expect(err).toEqual('foo');
      }
      return undefined;
    });
  });

  describe('GET ROUTES to /api/sounds', () => {
    test('200 GET /api/sounds for succesful fetching of a sound', async () => {
      try {
        const response = await superagent.get(`${apiUrl}/${sound._id}`)
          .set('Authorization', `Bearer ${token}`);
        expect(response.status).toEqual(200);
        expect(response.body.title).toEqual(sound.title);
        expect(response.body.accountId).toEqual(sound.accountId.toString());
        expect(response.body.url).toEqual(sound.url);
        expect(response.body.fileName).toEqual(sound.fileName);
      } catch (err) {
        console.log(err);
        expect(err).toEqual('FAILING IN GET 200 POST');
      }
    });
  });
});
