'use strict';

const url = require('url');
const queryString = require('querystring');
const testUrl = 'https://www.google.com/search?q=cute+cats&oq=cute+cats&aqs=chrome..69i57j0l5.2578j1j7&sourceid=chrome&ie=UTF-8'

console.log('THIS IS THE PARSED URL OBJECT: ', url.parse(testUrl));

console.log('THIS IS THE QUERY STRING OBJECT: ', queryString.parse(testUrl));
