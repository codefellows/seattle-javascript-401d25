'use strict';

const HashMap = require('../hashmap/index');
const util = require('util');
const students = require('../__test__/students');
const LinkedList = require('../linked-list/index');

const logFullObject = (input) => {
  const options = { showHidden: true, depth: null };
  console.log(util.inspect(input, options));
};

describe('testing HASHMAPS', () => {
  const hashMap15Buckets = new HashMap(15);
  const hashMap30Buckets = new HashMap(30);

  beforeAll(() => {
    students.forEach((student) => {
      hashMap15Buckets.set(student.first, student.last);
      hashMap30Buckets.set(student.first, student.last);
    });
  });
  describe('testing hashmap with 15 slots', () => {
    test('testing that hashmap items are LinkedList instances', () => {
      // logFullObject(hashMap15Buckets, 'HASH MAP')
      const buckets = hashMap15Buckets._buckets;
      buckets.forEach((bucket) => {
        expect(bucket).toBeInstanceOf(LinkedList);
      });
    });
    test('GET method of hashmap with 15 slots', () => {
      expect(hashMap15Buckets.get('SarahB')).toEqual('Bixler');
      expect(hashMap15Buckets.get('Joshua')).toEqual('Frederickson');
      expect(hashMap15Buckets.get('Mario')).toEqual('Flores');
    });

    test('SET method of hashmap with 15 slots', () => {
      hashMap15Buckets.set('Judy', 'Vue');
      expect(hashMap15Buckets._buckets.some((element) => {
        return element.find(node => node.value.key === 'Judy');
      })).toEqual(true);
    });
  });

  describe('testing hashmap with 30 slots', () => {
    test('testing hashmap with 30 slots', () => {
      logFullObject(hashMap30Buckets, 'HASH MAP WITH 30');
      students.forEach((student) => {
        expect(hashMap30Buckets.get(student.first)).toEqual(student.last);
      });
    });
  });
});
