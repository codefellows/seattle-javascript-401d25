'use strict';

const greet = module.exports = {};

greet.hi = (name) => {
  if (name === '' || typeof name !== 'string') {
    return -1;
  }
  // this code isn't being tested so we're at 90% coverage
  if (name === 'Codefellows') {
    return 'I love 401JS!';
  }
  return `Hello ${name}!`;
};

greet.bye = (name) => {
  if (name === '' || typeof name !== 'string') {
    return -1;
  }
  return `Bye ${name}!`;
};

