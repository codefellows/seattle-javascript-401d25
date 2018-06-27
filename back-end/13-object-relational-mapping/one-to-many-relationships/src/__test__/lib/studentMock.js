import faker from 'faker';
import Student from '../../model/student';
import classRoomMockPromise from './classRoomMock';

export default () => {
  const mockData = {};
  return classRoomMockPromise()
    .then((newClassRoom) => {
      mockData.classRoom = newClassRoom;
      /*
      mockData = {
        classRoom: {
          _id: 1342342354235235,
          name: some random words
        }
      }

      */
    })
    .then(() => {
      const mockStudent = {
        first: faker.name.firstName(),
        last: faker.name.lastName(),
        classRoomId: mockData.classRoom._id,
      };
      return new Student(mockStudent).save();
    })
    .then((newStudent) => {
      mockData.student = newStudent;
      return mockData;
      /*
      mockData = {
        classRoom: {
          _id: 1342342354235235,
          name: some random words
          students: [235245425245245. some other student Id, ]
        },
        student: {
          first: something,
          last: something,
          _id: 235245425245245
          classRoomId: 1342342354235235,
        }
      }

      */
    })
    .catch((err) => {
      throw err;
    });
};
