'use strict';

require('babel-register');
require('dotenv').config({ path: `${__dirname}/../../../.env` });
const mongoose = require('mongoose');
const supertest = require('supertest');
const { app } = require('../../../src/app.js');

const request = supertest(app);

describe('API', () => {
  beforeAll(() => {
    // mongoose.connect(process.env.MONGODB_URI);
  });
  afterAll(() => {
    // mongoose.connection.close();
  });

  it('gets a 200 response on a good model', () => {
    return request
      .get('/api/v1/bar')
      .then((response) => {
        expect(response.statusCode).toEqual(200);
      })
      .catch(console.err);
  });

  it('gets a 500 response on an invalid model', () => {
    return request.get('/api/v1/foobar').then(() => {}).catch((response) => {
      expect(response.status).toEqual(500);
    });
  });
});
