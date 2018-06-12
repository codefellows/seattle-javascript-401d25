'use strict';


const greet = module.exports = {};

// try/catch is great for your own custom errors
// best to use for code where you suspect errors are beyond your control
// SHOULD NOT USE when you know an error is going to occur or when you're using third party code that already provides an error for you, i.e. an (err, data) callback in NODE
greet.hi = (name) => {
  try {
    if (name === '' || typeof name !== 'string') {
      // with throw, a developer cannot ignore the error
      throw new Error('Name must be a string or not empty');
    }
    return `Hello ${name}`;
  } catch (err) {
    console.log(err);
    // do some other logic, make name default to 'Codefellows'
  }
  return undefined;
};

// same as a Javascript constructor
class Bug extends Error {
  // constructor initializes state of the class
  constructor(args) {
    super(args); // initializes "this" context of the class
    this.problem = args.problem;
    this.cause = args.cause;
    this.level = args.level;
    this.timeStamp = args.timeStamp;
  }
}

greet.hiWIthCustomError = (num) => {
  try {
    if (num === '' || typeof num !== 'number') {
      throw new Bug({
        problem: `${num} is not a number!`,
        cause: 'You didn\'t pass in a proper number',
        level: 0,
        timeStamp: new Date().toISOString(),
      });
    }
    return `You are person number ${num} to enter this building.`;
  } catch (err) {
    console.log(err);
    return err;
  }
};
