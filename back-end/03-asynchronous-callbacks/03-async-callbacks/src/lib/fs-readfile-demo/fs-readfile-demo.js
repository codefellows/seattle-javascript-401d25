'use strict';

const fs = require('fs');

const file = `${__dirname}/../assets/1.txt`;
const logger = require('./../logger');


// Reading file contents synchronously.
// this is a BLOCKING operation (it lives in the call stack until it finishes), therefore not recommended for use.
// It will read a file's contents and return a buffer
const data = fs.readFileSync(file);
// data comes back as a hexadecimal buffer by default
// console.log(data, 'DATA after readFileSync');

// if we want to read the text, we "toString" it
// console.log(data.toString(), 'DATA after being coverted from hex to string');

fs.readFile(file, (err, incomingData) => {
  if (err) {
    throw err;
  }
  logger.log(logger.INFO, `Using Winston to log incoming data ${incomingData.toString()}`);
  console.log('Where will I show up? Before or after fs.readFile?');
});

