'use strict';

// require comes from node, allows us to bring in all kinds of modules, i.e. dependencies and other files
require('dotenv').config();

if (!process.env.NODE_ENV) {
  throw new Error('Undefined NODE_ENV');
}

if (process.env.NODE_ENV !== 'production') {
  require('babel-register');
}

require('./src/main');