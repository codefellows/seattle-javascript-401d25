'use strict';

import express from 'express';
import mongoose from 'mongoose';
import logger from './logger';
import noteRoutes from '../router/note-router';

// middleware
import loggerMiddleware from '../lib/middleware/logger-middleware';
import errorMiddleware from '../lib/middleware/error-middleware';

const app = express();
const PORT = process.env.PORT || 3000;
let server = null;

// these routes will be read in order so it's important that our 404 catch-all is the last one. Think of it like a linked list

// 1. This goes first in our chain
app.use(loggerMiddleware);

// Remember to import in all your routes into the server module so express can register them
// 2. noteRoutes comes next
app.use(noteRoutes);

// 3. errorMiddleware is last in our chain
app.use(errorMiddleware);

// Making sure I return a 404 stauts if I don't have a matching route
app.all('*', (request, response) => {
  logger.log(logger.INFO, 'SERVER: Returning a 404 from the catch-all/default route');
  return response.status(404).send('Route Not Registered');
});

const startServer = () => {
  return mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
      // once I'm here, I know that mongoose is connected
      server = app.listen(PORT, () => {
        logger.log(logger.INFO, `Server is listening on PORT ${PORT}`);
      });
    })
    .catch((err) => {
      throw err;
    });
};

const stopServer = () => {
  return mongoose.disconnect()
    .then(() => {
      server.close(() => {
        logger.log(logger.INFO, 'Server is off');
      });
    })
    .catch((err) => {
      throw err;
    });
};

export { startServer, stopServer };

