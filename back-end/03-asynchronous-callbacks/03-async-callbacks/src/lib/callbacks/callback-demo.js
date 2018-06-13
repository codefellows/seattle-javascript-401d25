'use strict';

// Callbacks OFFLOAD functionality.
// Think of it as though you're telling a method to go do it's work and when it's done, to handle it for you
// A good analogy would be to picture hiring a moving company to move you
//   You give them all of your stuff AND put workers in the back of the truck with instructions
//   When they get there, they read the instructions and move you in.
//   You don't have to worry about when, and you already told them how.  At some point, it'll just get done
//   according to your specifications.

const myCallback = (data) => {
  console.log('2: Received', data);
};

const useTheCallback = (callback) => {
  const text = 'some random text';
  console.log('1: Calling the callback');
  callback(text);
  console.log('3: After the callback');
};

// useTheCallback(myCallback);

// ERROR FIRST Callbacks --- always expect to be called with the first parameter being either an
// error when an error occurs, or as undefined when not.  In the "good" case, data is given as
// the second parameter.

const errorFirstCallback = (err, data) => {
  if (err) {
    return console.log('2: ERROR: ', err);
  }
  return console.log('2: SUCCESS: Received: ', data);
};

const useErrorFirstCallback = (text, callback) => {
  try {
    if (!text || typeof text !== 'string') {
      throw new TypeError(`${text} is not a string;`)
    }
    console.log('1: Calling the error first callback with successful text input');
    callback(undefined, text);
    console.log('3: SUCCESS: After the error first callback with successful text input');
  } catch (err) {
    console.log('1: Calling the error first callback with ERROR');
    callback(err, null);
    console.log('3: ERROR: after the error first callback with bad input');
  }
};


useErrorFirstCallback(7, errorFirstCallback);
