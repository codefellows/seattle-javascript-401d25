'use strict';

// Read in our environment variables
require('dotenv').config();

// Setup Transpilation
require('babel-register');

// Start up DB Server
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

// Require our main app file and start the web server up
require('./src/app.js').start(process.env.PORT);
