'use strict';

/*eslint-disable*/

// "Time" complexity: How do number of operations change as my input increases? Does not actually mean real time as in "this function takes x milliseconds to complete", though time does correlate


// O(1): Constants, variable declarations, object lookups, if statements, */+-% operators
// These things don't depend on the size of an input

// Even though these five variables could be considered O(5), we simplify it down to O(1)
(function() {
  const one = 1;
  const two = 2;
  const three = 3;
  const four = 4;
  const five = 5;
})()

const dog = { 
  breed: 'collie',
}
// An object lookup is O(1);
const someBreed = 'breed-foo'
dog[someBreed];
dog.breed;

// An insertion of a new key:value pair into an object or inserting an item into an array is O(1)
dog.furColor = 'brown';
const foo = [ 'fruits'];
foo[1] = 'veggies';

// if statements are O(1);
if (true) console.log('Cookies!');

// arithmetic operations are O(1);
2*2; 100%5; 3+3;

// ==================================================================================
// O(n): for loops, while loops, iterations, traversals that depend on the size of their input


// Even though this would be O(2n) technically, we take out constants when measuring Big Oh, so this simplifies down to O(n)
(function() {
  const ints = [1, 2, 3];
  for (let i = 0; i < ints; i++) {
    console.log(ints[i]);
  }

  for (let i = 0; i < ints; i++) {
    console.log(ints[i]);
  }
})

// We consider the most significant Big Oh value, in this case, even though this is 
// O(n + n + n^2) we simplify it down to O(n^2)
(function() {
  const ints = [1, 2, 3];
  for (let i = 0; i < ints; i++) {
    console.log(ints[i]);
  }

  for (let i = 0; i < ints; i++) {
    console.log(ints[i]);
  }

  for (let i = 0; i < ints; i++) {
    console.log(ints[i]);
    for (let j = 0; j < ints; i++) {
      console.log(ints[j]);
    }
  }
})()


// SPACE COMPLEXITY: How much EXTRA space is the code using? This is NOT necessarily equal to time complexity

//map, filter add extra space because they return new arrays

// Space complexity: O(n) where n is the number of elements in the original array we are mapping
const thisTakesUpSpace = (arr) => {
  return arr.map(e => e * 2);
}

console.log(thisTakesUpSpace([1, 2, 3]));


// O(n) where n is the number of elements in the original array we are reversing
const reverseArrayThatTakesSpace = (arr) => {
  let r = [];
  for (let i = arr.length - 1; i >= 0; i--) {
    console.log(arr[i])
    r.push(arr[i]);
  }
  return r;
}

console.log(reverseArrayThatTakesSpace([1, 2, 3]))

// O(1) space complexity because we're not returning any new data structure. We also consider this an "in place" solution

const inPlaceReverse = (arr) => {
  // variables are not included in space complexity if they don't map back to the number of elements in the original data structure
  const mid = Math.floor(arr.length / 2);
  let temp;
  for (let i = 0; i < mid; i++) {
    temp = arr[i];
    arr[i] = arr[arr.length - 1 - i];
    arr[arr.length - 1 - i] = temp;
  }
  return arr;
}

console.log(inPlaceReverse([1, 2, 3]))