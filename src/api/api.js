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

export default router;

// router.get('/api/v1/cats/:id', (req,res) => {
//   if ( req.params.id ) {
//     Cats.findOne(req.params.id)
//       .then( data => sendJSON(res,data) )
//       .catch( function err(res,err) {
//         res.status = 404;
//         res.statusMessage = 'Not Found';
//         res.setHeader('Content-Type', 'application/json');
//         res.write( JSON.stringify(err) );
//         res.end();
//       } );
//   }
// });

// router.delete('/api/v1/cats/:id', (req,res) => {
//   if ( req.params.id ) {
//     Cats.deleteOne(req.params.id)
//       .then( success => {
//         let data = {id:req.params.id,deleted:success};
//         sendJSON(res,data);
//       })
//       .catch( err => serverError(res,err) );
//   }
// });

// router.post('/api/v1/cats', (req,res) => {
//   if (req.body) {
//     let record = new Cats(req.body);
//     record.save()
//       .then(data => sendJSON(res,data))
//       .catch( err => serverError(res,err) );
//   }
//   else {
//     (res,err) => {
//       let error = { error:err };
//       res.statusCode = 400;
//       res.statusMessage = 'Bad Request';
//       res.setHeader('Content-Type', 'application/json');
//       res.write( JSON.stringify(error) );
//       res.end();
//     };
//   }
//});