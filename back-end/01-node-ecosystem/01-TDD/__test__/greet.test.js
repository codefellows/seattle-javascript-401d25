'use strict';

const greet = require('./../src/lib/greet');

describe('testing #greet', () => {
  describe('testing #greet.hi', () => {
    test('greet.hi should return Hello Judy', () => {
      expect(greet.hi('Judy')).toEqual('Hello Judy!');
    });

    // this is an error checking test
    test('should return -1 in case of no input', () => {
      expect(greet.hi('')).toEqual(-1);
      expect(greet.hi()).toEqual(-1);
    });
  });

  describe('testing #greet.bye', () => {
    test('greet.bye should return Bye Judy', () => {
      expect(greet.bye('Judy')).toEqual('Bye Judy!');
    });

    // this is an error checking test
    test('should return -1 in case of no input', () => {
      expect(greet.bye('')).toEqual(-1);
      expect(greet.bye()).toEqual(-1);
    });
  });
});
