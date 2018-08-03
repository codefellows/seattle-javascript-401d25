'use strict';

/*
146496173647-8j2rbdkahbuqchhebln30kegea4emt7a.apps.googleusercontent.com
*/
const express = require('express');
require('dotenv').config();
// small change
const app = express();

const build = process.env.CDN_URL || `${__dirname}/build`;

app.use(express.static(build));

// all the routes will be handled by the frontend
app.get('*', (request, response) => {
  response.sendFile(`${build}/index.html`);
});

app.listen(process.env.PORT, () => {
  console.log('__SERVER_UP__', process.env.PORT);
});
