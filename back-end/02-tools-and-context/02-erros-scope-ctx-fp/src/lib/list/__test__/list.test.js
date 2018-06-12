'use strict';

const List = require('../lib/list');

describe('testing methods of List class', () => {
  let myList;

  // runs this code before each test block
  beforeEach(() => {
    myList = new List();
    myList.push(0, 1, 2, 3, 4, 5);
  });

  // runs this code after each test block
  afterEach(() => {
    myList = null;
  });

  test('PUSH: should show that the push method adds new items into the array', () => {
    expect(myList).toHaveLength(6);
    myList.push(6);
    expect(myList).toHaveLength(7);
    myList.push();
    expect(myList).toHaveLength(7);
    expect(myList[myList.length - 1]).toEqual(6);
    expect(myList.push(7, 8, 9)).toEqual(10);
    console.log(myList, 'in PUSH')
  });

  // error test: checking for undefined
  test('MAP: throws error if list is empty', () => {
    const emptyList = new List();
    expect(() => {
      emptyList.map(e => e);
    }).toThrow();
  });

  test('MAP: throws error if a function is not passed in', () => {
    expect(() => {
      myList.map('not a function');
    }).toThrow();
  });

  test('MAP: should return a new list', () => {
    const newList = myList.map((num) => {
      return num * 2;
    });
    expect(newList.length).toEqual(myList.length);
    for (let i = 0; i < newList.length; i++) {
      expect(newList[i] / 2).toEqual(myList[i]);
    }
  });

  // reduce
  test('REDUCE: should reduce the elements in the list to one single multiplied product with NO accumulator passed in', () => {
    const product = myList.reduce((accumulator, current) => {
      return accumulator * current;
    });
    // remember, if no accumulator argument is passed in to reduce's callback, the accumulator defaults to the first element in the list
    expect(product).toEqual(0);
  });

  test('REDUCE: should reduce the elements in the list to one single value while adding 10 accumulatively', () => {
    const sum = myList.reduce((accumulator, current) => {
      return accumulator + current;
    }, 10);
    expect(sum).toEqual(25);
  });
});
