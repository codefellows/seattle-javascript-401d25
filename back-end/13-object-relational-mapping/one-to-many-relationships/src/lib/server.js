import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import logger from './logger';
import classroomRouter from '../router/classroom-router';
import studentRouter from './../router/student-router';

// middleware
import errorMiddleWare from '../lib/middleware/error-middleware';
import loggerMiddleware from '../lib/middleware/logger-middleware';

const app = express();
const PORT = process.env.PORT || 3000;
let server = null;

// third party apps
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// our own modules
app.use(loggerMiddleware);
app.use(studentRouter);
app.use(classroomRouter);

app.use(errorMiddleWare);

// catch all
app.all('*', (request, response) => {
  console.log('Returning a 404 from the catch/all route');
  return response.sendStatus(404).send('Route Not Registered');
});


const startServer = () => {
  return mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
      server = app.listen(PORT, () => {
        console.log('Server up:', PORT);
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
