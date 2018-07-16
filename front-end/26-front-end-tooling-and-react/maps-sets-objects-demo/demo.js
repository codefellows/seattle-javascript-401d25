'use strict';

/*
  Problem Domain. Given two arrays of integers, find the common values shared between those two arrays and return them in a new array. Duplicates in each array can be ignored.
*/

const a = [3, 5, 6, 8, 5, 2, 0];
const b = [15, 6, 7, 9, 3, 0];

// Expected output: [6, 3];

// Solution 1: Plain Object

const solutionWithObject = (arr1, arr2) => {
  const map = arr1.reduce((storage, current) => {
    if (!storage[current]) {
      storage[current] = true;
    }
    return storage;
  }, {});
  console.log(map);

  return arr2.filter(num => map[num]);
};

console.log(solutionWithObject(a, b));


// The "Set" object lets you store unique values of any type
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
const solutionWithSet = (arr1, arr2) => {
  const set = arr1.reduce((storage, current) => {
    // .add is an instance method of Set"
    storage.add(current);
    return storage;
  }, new Set());
  console.log(set);

  // .set is an instance method of "Set"
  return arr2.filter(num => set.has(num));
};

console.log(solutionWithSet(a, b));


// The Map object holds key-value pairs. Any value (both objects and primitive values) may be used as either a key or a value.
// A map is just like a JS object, except the keys don't have to be just strings
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
const solutionWithMap = (arr1, arr2) => {
  const map = arr1.reduce((newMap, current) => {
    // .set is an instance method of "Map"
    newMap.set(current, true);
    return newMap;
  }, new Map());
  console.log(map);

  // .has is an instance method of "Map"
  return arr2.filter(num => map.has(num));
};

console.log(solutionWithMap(a, b));