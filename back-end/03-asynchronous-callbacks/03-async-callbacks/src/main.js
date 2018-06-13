// require('./lib/callbacks/callback-demo');
// require('./lib/fs-readfile-demo/fs-readfile-demo');


/*eslint-disable*/
const fileReader = require('./lib/file-reader/file-reader');
const logger = require('./lib/logger');

const text1 = `${__dirname}/./lib/assets/1.txt`;
const text2 = `${__dirname}/./lib/assets/2.txt`;
const text3 = `${__dirname}/./lib/assets/3.txt`;

// Does this get printed in the right order of 1, 2, 3?
// fileReader.readFile(text1);
// fileReader.readFile(text2);
// fileReader.readFile(text3);

// Problem domain: How do we get the files to print in order?
console.log(fileReader.readThreeFiles(text1, text2, text3, (err, data1, data2, data3) => {
  logger.log(logger.INFO, data1);
  logger.log(logger.INFO, data2);
  logger.log(logger.INFO, data3);
}));

console.log('hello');
