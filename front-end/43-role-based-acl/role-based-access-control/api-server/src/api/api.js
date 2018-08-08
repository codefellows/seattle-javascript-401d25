'use strict';

import express from 'express';
const router = express.Router();

import * as models from '../middleware/models.js';
router.param('model', models.finder);

// GLOBAL/MODEL ROUTES
router.get('/api/v1/models', (req, res) => {
  console.log('Fetching Models');
  let list = models.list();
  sendJSON(res, list);
});

router.get('/api/v1/:model/schema', (req, res) => {
  let schema =
    typeof req.model.jsonSchema === 'function' ? req.model.jsonSchema() : {};
  sendJSON(res, schema);
});

// RECORD LEVEL ROUTES

router.get('/api/v1/:model', (req, res, next) => {
  console.log('Getting all from req.model');
  req.model.find({}).then((data) => sendJSON(res, data)).catch(next);
});

router.get('/api/v1/:model/:id', (req, res, next) => {
  req.model
    .findOne({
      _id: req.params.id
    })
    .then((data) => sendJSON(res, data))
    .catch(next);
});

router.delete('/api/v1/:model/:id', (req, res, next) => {
  req.model
    .findOneByIdAndDelete(req.params.id)
    .then((data) => sendJSON(res, data))
    .catch(next);
});

router.post('/api/v1/:model', (req, res, next) => {
  let record = new req.model(req.body);
  record.save().then((data) => sendJSON(res, data)).catch(next);
});

router.put('/api/v1/:model/:id', (req, res, next) => {
  req.model
    .findByIdAndUpdate(req.params.id, req.body)
    .then((data) => sendJSON(res, data))
    .catch((err) => {
      console.log('ERR', err);
      next(err);
    });
});

let sendJSON = (res, data) => {
  res.statusCode = 200;
  res.statusMessage = 'OK';
  res.setHeader('Content-Type', 'application/json');
  res.write(JSON.stringify(data));
  res.end();
};

export default router;
