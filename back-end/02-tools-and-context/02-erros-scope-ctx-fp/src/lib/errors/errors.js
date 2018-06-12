'use strict';

const greetErrors = module.exports = {};

// Reference error
greetErrors.hiReferenceError = name => `Hi there ${name} and ${otherName}`;

//Syntax error
greetErrors.hiSyntaxError = name => `Hi there ${name} and ${otherName}`;)

//Type error
greetErrors.hiTypeError = (name) => {
  try {
    if (typeof name !== 'string') {
      throw new TypeError(`${name} must be a string!`);
    }
  } catch (err) {
    console.error(err);
  }
};

