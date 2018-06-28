'use strict';

import util from 'util';
import fs from 'fs';

const readDirectoryPromise = util.promisify(fs.readdir);
const modelPath = `${__dirname}`;

console.log(modelPath);

export default () => {
  return readDirectoryPromise(modelPath)
    .then((files) => {
      // [ './classroom.js', './foo.js', ./students.js'];
      console.log(files);
      const newFiles = files.filter(file => file !== 'index.js').map(file => `./${file}`);
      console.log(newFiles);
      const modelMap = newFiles.reduce((storage, currentFile) => {
        const file = require(currentFile) /*eslint-disable-line*/
        // file.default.modelName will equal either "classrooms" or "students" if it is a mongoose model
        const isMongooseModel = file.default && file.default.modelName;
        const modelName = isMongooseModel ? file.default.modelName : currentFile;
        // at this point, modelName = classrooms or students or ./foo.js
        storage[modelName] = file;
        return storage;
      }, {});
      /*
        modelMap = {
            classrooms: points to the required in module that comes from ./classrooms
            students: points to the required in module that comes from ./students
            './foo.js': points to the required in module that comes './foo.js
          }
      */
      return modelMap;
    })
    .catch((err) => {
      throw err;
    });
};

