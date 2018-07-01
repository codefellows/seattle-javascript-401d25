'use strict';

const fs = require('fs');
const fileReader = require('../lib/file-reader/file-reader');

const mockText1 = `${__dirname}/./mock-assets/1.txt`;
const mockText2 = `${__dirname}/./mock-assets/2.txt`;
const mockText3 = `${__dirname}/./mock-assets/3.txt`;

// this array will be filled with data of each mock file above after it is read.  
// This is used for comparison to the data we return from our tests
let mockData = [];

describe('testing fileReader module that reads there files', () => {
  beforeAll(() => {
    // please don't use "sync" version of node modules in real code except for testing purposes
    mockData = [
      fs.readFileSync(mockText1, { encoding: 'utf-8' }),
      fs.readFileSync(mockText2, { encoding: 'utf-8' }),
      fs.readFileSync(mockText3, { encoding: 'utf-8' }),
    ];
  });

  test('should show that the data we read from readThreeFiles equals the data in our mockData array', (done) => {
    fileReader.readThreeFiles(mockText1, mockText2, mockText3, (err, data1, data2, data3) => {
      expect(data1).toEqual(mockData[0]);
      expect(err).toBeNull();
      done();
      // put more expect statements
    });
  });

  test('should return an error for a bad file path on the first item', (done) => {
    fileReader.readThreeFiles('bad path', mockText2, mockText3, (err) => {
      expect(err).toHaveProperty('errno');
      expect(err.code).toEqual('ENOENT');
      done();
    });
  });
});
