'use strict';

import superagent from 'superagent';
import faker from 'faker';
import { startServer, stopServer } from '../lib/server';
import Classroom from '../model/classroom';
import Student from '../model/student';
import createMockDataPromise from './lib/studentMock';

const apiUrl = `http://localhost:${process.env.PORT}/api/students`;

beforeAll(startServer);
afterAll(stopServer);
afterEach(() => {
  Promise.all([
    Classroom.remove({}),
    Student.remove({}),
  ]);
});

describe('POST /api/students', () => {
  test('200 POST for succcesful posting of a student', () => {
    return createMockDataPromise()
      .then((mockData) => {
        const mockStudent = {
          first: faker.name.firstName(),
          last: faker.name.lastName(),
          classRoomId: mockData.classRoom._id,
        };

        return superagent.post(apiUrl)
          .send(mockStudent)
          .then((response) => {
            expect(response.status).toEqual(200);
          })
          .catch((err) => {
            throw err;
          });
      });
  });
});

describe('GET /api/students', () => {
  test('200 GET for succesful fetching of a student', () => {
    return createMockDataPromise()
      .then((mockData) => {
        return superagent.get(`${apiUrl}/${mockData.student._id}`);
      })
      .then((response) => {
        expect(response.status).toEqual(200);
      })
      .catch((err) => {
        throw err;
      });
  });
});
