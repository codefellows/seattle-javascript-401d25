'use strict';

// Line 6 is equivalent to line 4
// const inpsect = require('util').inspect;
// es6 destructruring
const { inspect } = require('util');

module.exports = (input, msg) => {
  console.log(inspect(input, { showHidden: true, depth: null }), msg || '');
};

