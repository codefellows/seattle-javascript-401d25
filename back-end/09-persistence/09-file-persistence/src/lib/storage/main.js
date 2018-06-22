'use strict';

const fileSystem = require('./file-system');
const memory = require('./memory');

require('dotenv').config();

// if (process.env.STORAGE === 'filesystem') {
//   module.exports = fileSystem
// } else {
//   module.exports = memory;
// }

// this ternary operator does the same as above
module.exports = process.env.STORAGE === 'filesystem' ? fileSystem : memory;
