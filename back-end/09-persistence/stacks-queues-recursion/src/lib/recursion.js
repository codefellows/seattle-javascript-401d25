'use strict';

// this would be O(b) where b is the first integer that gets passed in as the argument to the first call
const recursiveAddition = (a, b, count = 1) => {
  console.log('THE CALL STACK SIZE IS NOW: ', count);
  if (b === 1) return a + 1; // base case: the case where we break out of recursion
  console.log('A: ', a);
  console.log('B: ', b);
  return recursiveAddition(a + 1, b - 1, count + 1);
};

recursiveAddition(1000, 5);
