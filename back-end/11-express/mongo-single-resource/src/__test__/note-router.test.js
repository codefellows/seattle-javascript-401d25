'use strict';

import faker from 'faker';
import superagent from 'superagent';
import Note from '../model/note';
import { startServer, stopServer } from '../lib/server';

const apiUrl = `http://localhost:${process.env.PORT}/api/notes`;

// this will be a helper function mock out resources to create test items that will actually be in the Mongo database

const createNoteMockPromise = () => {
  return new Note({
    title: faker.lorem.words(3),
    content: faker.lorem.words(20),
  }).save();
  // .save is a built-in method from mongoose to save/post 
  // a new resource to our actual Mongo database and it returns a promise
};

beforeAll(startServer);
afterAll(stopServer);

// ".remove" is a built-in mongoose schema method 
// that we use to clean up our test database entirely 
// of all the mocks we created so we can start fresh with every test block
afterEach(() => Note.remove({}));

describe('POST requests to /api/notes', () => {
  test('POST 200 for successful creation of note', () => {
    const mockNoteToPost = {
      title: faker.lorem.words(3),
      content: faker.lorem.words(20),
    };
    return superagent.post(apiUrl)
      .send(mockNoteToPost)
      .then((response) => {
        expect(response.status).toEqual(200);
        expect(response.body.title).toEqual(mockNoteToPost.title);
        expect(response.body.content).toEqual(mockNoteToPost.content);
        expect(response.body._id).toBeTruthy();
        expect(response.body.createdOn).toBeTruthy();
      })
      .catch((err) => {
        throw err;
      });
  });

  test('POST 400 for not sending in a required TITLE property', () => {
    const mockNoteToPost = {
      content: faker.lorem.words(50),
    };
    return superagent.post(apiUrl)
      .send(mockNoteToPost)
      .then((response) => {
        throw response;
      })
      .catch((err) => {
        expect(err.status).toEqual(400);
      });
  });

  test('POST 409 for duplicate key', () => {
    return createNoteMockPromise()
      .then((newNote) => {
        return superagent.post(apiUrl)
          .send({ title: newNote.title })
          .then((response) => {
            throw response;
          })
          .catch((err) => {
            expect(err.status).toEqual(409);
          });
      })
      .catch((err) => {
        throw err;
      });
  });
});

describe('GET requests to /api/notes', () => {
  test('200 GET for succesful fetching of a note', () => {
    let mockNoteForGet;
    return createNoteMockPromise()
      .then((note) => {
        mockNoteForGet = note;
        // I can return this to the next then block because superagent requests are also promisfied
        return superagent.get(`${apiUrl}/${mockNoteForGet._id}`);
      })
      .then((response) => {
        expect(response.status).toEqual(200);
        expect(response.body.title).toEqual(mockNoteForGet.title);
        expect(response.body.content).toEqual(mockNoteForGet.content);
      })
      .catch((err) => {
        throw err;
      });
  });

  test('404 GET: no note with this id', () => {
    return superagent.get(`${apiUrl}/THISISABADID`)
      .then((response) => {
        throw response;
      })
      .catch((err) => {
        expect(err.status).toEqual(404);
      });
  });
});

describe('PUT request to /api/notes', () => {
  test('200 PUT for successful update of a resource', () => {
    return createNoteMockPromise()
      .then((newNote) => {
        return superagent.put(`${apiUrl}/${newNote._id}`)
          .send({ title: 'updated title', content: 'updated content' })
          .then((response) => {
            expect(response.status).toEqual(200);
            expect(response.body.title).toEqual('updated title');
            expect(response.body.content).toEqual('updated content');
            expect(response.body._id.toString()).toEqual(newNote._id.toString());
          })
          .catch((err) => {
            throw err;
          });
      })
      .catch((err) => {
        throw err;
      });
  });
});
