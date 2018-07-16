'use strict';

const HashMap = require('../hashmap/index');
const students = require('../__test__/students');
const LinkedList = require('../linked-list/index');

describe('testing HASHMAPS', () => {
  const hashMap15Buckets = new HashMap(15);
  const hashMap30Buckets = new HashMap(30);

  beforeAll(() => {
    students.forEach((student) => {
      hashMap15Buckets.set(student.first, student.last);
      hashMap30Buckets.set(student.first, student.last);
      console.log('HASHMAP WITH 15 SLOTS', JSON.stringify(hashMap15Buckets, null, 2));
      console.log('HASHMAP WITH 30 SLOTS', JSON.stringify(hashMap30Buckets, null, 2));
    });
  });
  describe('testing hashmap with 15 slots', () => {
    test('testing that hashmap items are LinkedList instances', () => {
      const buckets = hashMap15Buckets._buckets;
      buckets.forEach((bucket) => {
        expect(bucket).toBeInstanceOf(LinkedList);
      });
    });
    test('GET method of hashmap with 15 slots', () => {
      expect(hashMap15Buckets.get('Devin')).toEqual('Cunningham');
      expect(hashMap15Buckets.get('Ashton')).toEqual('Ellis');
      expect(hashMap15Buckets.get('Chris')).toEqual('Hemenes');
      expect(hashMap15Buckets.get('Tracy')).toEqual('Williams');
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
      students.forEach((student) => {
        expect(hashMap30Buckets.get(student.first)).toEqual(student.last);
      });
    });
  });
});
