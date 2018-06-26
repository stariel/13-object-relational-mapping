'use strict';

import express from 'express';
import Albums from '../models/albums.js';
const router = express.Router();

const API_URL = '/api/v1/albums';

router.get(API_URL, (req,res) => {
  Albums
    .find()
    .then(albums => res.send(albums))
    .catch(err => res.sendStatus(err));
});

router.get('/api/v1/albums/:id', (req,res,next) => {
  Albums
    .findById(req.params.id)
    .then( albums => res.send(albums) )
    .catch( next );
});

router.post(API_URL, express.json(), (req, res) => {
  Albums
    .create(req.body)
    .then(album => res.send(album))
    .catch(err => res.send(err));
});

router.put(API_URL, (req, res) => {
  Albums
    .findByIdAndUpdate(req.params.id, req.body)
    .then( albums => res.send(albums) )
    .catch( next );
});

router.delete(API_URL + '/:id', (req, res) => {
  Albums
    .findByIdAndRemove(req.params.id)
    .then(result => res.send(result))
    .catch(err => res.send(err));
});

export default router;