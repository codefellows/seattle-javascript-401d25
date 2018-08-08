'use strict';

import express from 'express';

import authnet from './authorize.net.js';

const paymentRouter = express.Router();

paymentRouter.post('/api/v1/authnet', (req, res, next) => {
  authnet.process(req.body).then((result) => res.send(result)).catch(next);
});

export default paymentRouter;
