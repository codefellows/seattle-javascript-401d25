'use strict';

import superagent from 'superagent';
import faker from 'faker';
import { startServer, stopServer } from '../lib/server';
import Classroom from '../model/classroom';
import createMockClassRoomPromise from './lib/classRoomMock';

const apiUrl = `http://localhost:${process.env.PORT}/api/classrooms`;

beforeAll(startServer);
afterAll(stopServer);
afterEach(() => Classroom.remove({}));

describe('POST /api/classrooms', () => {
  const mockResource = {
    name: faker.name.firstName(),
    teacher: 'Vinicio',
  };

  test('200 POST for successful post of a classroom', () => {
    return superagent.post(apiUrl)
      .send(mockResource)
      .then((response) => {
        expect(response.status).toEqual(200);
        expect(response.body.name).toEqual(mockResource.name);
        expect(response.body.teacher).toEqual(mockResource.teacher);
        expect(response.body._id).toBeTruthy();
      })
      .catch((err) => {
        throw err;
      });
  });
});

describe('GET /api/classrooms', () => {
  test('200 GET for successful fetching of a classroom', () => {
    let returnedClassroom;
    return createMockClassRoomPromise()
      .then((newClassroom) => {
        returnedClassroom = newClassroom;
        return superagent.get(`${apiUrl}/${newClassroom._id}`);
      })
      .then((response) => {
        expect(response.status).toEqual(200);
        expect(response.body.name).toEqual(returnedClassroom.name);
        expect(response.body.teacher).toEqual(returnedClassroom.teacher);
      })
      .catch((err) => {
        throw err;
      });
  });
});
