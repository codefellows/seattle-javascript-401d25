'use strict';

const fs = require('fs');
const logger = require('../logger');

const fileReader = module.exports = {};

// this reads a single file path
fileReader.readFile = (filePath) => {
  return fs.readFile(filePath, (err, data) => {
    if (err) throw err;
    logger.log(logger.INFO, data.toString());
  });
};


fileReader.readThreeFiles = (filePath1, filePath2, filePath3, callback) => {
  return fs.readFile(filePath1, (err1, data1) => {
    if (err1) return callback(err1);
    return fs.readFile(filePath2, (err2, data2) => {
      if (err2) return callback(err2);
      return fs.readFile(filePath3, (err3, data3) => {
        if (err3) return callback(err3);
        return callback(null, data1.toString(), data2.toString(), data3.toString());
      });
    });
  });
};

