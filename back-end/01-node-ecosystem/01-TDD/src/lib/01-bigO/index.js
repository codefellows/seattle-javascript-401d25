'use strict';

// this module is just for DEMO purposes of Big Oh time complexity
const n = 10;
const input = [];
for (let i = 0; i < n; i++) {
  input.push(i);
}

// O(n) because counter1 depends on the number of elements in the "input" array declared above
let counter1 = 0;
for (let i = 0; i < input.length; i++) {
  counter1 += 1;
}

console.log(counter1, 'COUNTER 1');

// O(n^2) because counter2 depends on the number of elements in the "input" array 
// and a nested for loop iterates through full "input" array AGAIN for each element

let counter2 = 0;
for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    counter2 += 1;
  }
}

console.log(counter2, 'COUNTER 2');

// O(n^3) 
let counter3 = 0;
for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    for (let k = 0; k < n; k++) {
      counter3 += 1;
    }
  }
}
console.log(counter3, 'COUNTER 3');

// O(1) because it depends on a "constant", i.e. the number 3
let counter4 = 0;
for (let i = 0; i < 3; i++) {
  counter4 += 1;
}

console.log(counter4, 'COUNTER 4');

// O(log n) because we have halved our data set and don't need to iterate through every
// element in the "input" array
// This is called  "binary search" 
// Only works if data is already sorted 
// Problem domain: We need to find the target integer 3 in our "input" array

const target = 6;
const mid = Math.floor(input.length / 2);
let found;

if (target < mid) {
  for (let i = 0; i < mid; i++) {
    if (input[i] === target) {
      found = target;
    }
  }
} else {
  for (let i = mid; i < input.length; i++) {
    if (input[i] === target) {
      found = target;
    }
  }
}

