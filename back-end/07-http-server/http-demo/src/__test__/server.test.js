'use strict';

const server = require('../lib/server');
const superagent = require('superagent');
const cowsay = require('cowsay');

const apiUrl = 'http://localhost:5000/api';

beforeAll(() => server.start(5000));
afterAll(() => server.stop());

describe('VALID request to the API', () => {
  describe('GET api/time', () => {
    it('should response with a status 200', (done) => {
      superagent.get(`${apiUrl}/time`)
        .then((res) => {
          expect(res.status).toEqual(200);
          expect(res.body).toHaveProperty('date');
          done();
        });
    });
  });

  describe('GET /cowsayPage', () => {
    const mockCow = cowsay.say({ text: 'Hello World' });
    const mockHtml = `<section><h3><a href="api/time">Click here for current time</a></h3><pre>${mockCow}</pre></section>`;
    it('should respond with status 200 and return cow HTML', () => {
      return superagent.get(`${apiUrl}/cowsayPage`)
        .query({ text: 'Hello World' })
        .then((res) => {
          expect(res.status).toEqual(200);
          expect(res.text).toEqual(mockHtml);
        });
    });
  });

  describe('POST /echo', () => {
    it('should return status 200 for successful post', () => {
      return superagent.post(`${apiUrl}/echo`)
        .send({ name: 'judy' })
        .then((res) => {
          expect(res.body.name).toEqual('judy');
          expect(res.status).toEqual(200);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  });
});

describe('INVALID request to the API', () => {
  describe('GET /cowsayPage', () => {
    it('should err out with 400 status code for not sending text in query', () => {
      return superagent.get(`${apiUrl}/cowsayPage`)
        .query({})
        .then(() => {})
        .catch((err) => {
          expect(err.status).toEqual(400);
          expect(err).toBeTruthy();
        });
    });
  });
});

