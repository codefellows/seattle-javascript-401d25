'use strict';

const List = require('./lib/list');

const myList = new List();
for (let i = 0; i < 10; i++) {
  myList.push(i);
}
console.log(myList);
let sum = myList.reduce((a, b) => a + b);
console.log(sum);
