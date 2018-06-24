import supertest from 'supertest';
import {Mockgoose} from 'mockgoose';
import mongoose from 'mongoose';
import {server}  from '../src/app.js';

import Album from '../src/models/albums.js';

const mockRequest = supertest(server);

const API_URL = '/api/v1/albums';

const mockgoose = new Mockgoose(mongoose);

beforeAll((done) => {
  mockgoose.prepareStorage().then(() => {
    mongoose.connect('mongodb://127.0.0.1/albums').then(() => {
      done();
    });
  });
});

afterEach((done) => {
  mockgoose.helper.reset().then(done);
});

afterAll((done) => {
  mongoose.disconnect().then(() => {
    console.log('disconnected');
    done();
  }).catch((err) => {
    console.error(err);
    done();
  });
});

describe('api module', () => {

  it('mockRequest should exist', () => {
    expect(mockRequest).toBeDefined();
  });

  it('should get [] for albums before database is filled', () => {

    return mockRequest.get(API_URL).then(results => {
      expect(JSON.parse(results.text)).toEqual([]);
    }).catch(err => {
      throw(err);
    });

  });

  it('gets a 200 response on a good model', () => {
    return mockRequest.get('http://localhost:3001/api/v1/albums')
      .then(response => {
        expect(response.statusCode).toEqual(200);
      })
      .catch(console.err);
  });

  it('gets a 500 response on an invalid model', () => {
    return mockRequest.get('http://localhost:3001/api/v1/dogs')
      .then(console.log)
      .catch(response => {
        expect(response.status).toEqual(500);
      });
  });

});

describe('album', () => {

  it('should post an album', () => {

    const albumObj = {
      title: 'Antichrist Superstar',
      artist: 'Marilyn Manson',
      releaseYear: 1996,
    };

    return mockRequest
      .post(API_URL)
      .send(albumObj)
      .then(results => {

        try {
          const album = JSON.parse(results.text);
          expect(album.title).toBe(albumObj.title);
          expect(album.artist).toBe(albumObj.artist);
          expect(album.releaseYear).toBe(albumObj.releaseYear);
          expect(album._id).toBeDefined();
        } catch (error) {
          throw(error);
        }
      }).catch(err => console.log(err));
  });

  it('should add to all albums after a post', () => {

    const albumObj = {
      title: 'Lightbulb Sun',
      artist: 'Porcupine Tree',
      releaseYear: 2000,
    };

    return mockRequest
      .post(API_URL)
      .send(albumObj)
      .then(() => {

        return mockRequest
          .get(API_URL)
          .then(results => JSON.parse(results.text))
          .then(albums => expect(albums.length).toBe(1))
          .catch(err => console.log(err));
      });

  });

  it('should find one album by id', () => {

    const albumObj = {
      title: 'Superunknown',
      artist: 'Soundgarden',
      releaseYear: 1994,
    };

    return Album.create(albumObj).then(data => {

      return Album.findById(data._id).then(album => {

        expect(album.name).toEqual(albumObj.name);

      }).catch(err => console.log(err));

    }).catch(err => console.log(err));
  });

});


//   it('should delete a singer - async/await version', async () => {

//     const newSinger = {
//       name: 'Aretha Franklin',
//       rank: 2,
//     };

//     const aretha = await Singer.create(newSinger);

//     expect(aretha.name).toBe('Aretha Franklin');

//     await Singer.findByIdAndRemove(aretha._id);

//     const singers = await Singer.find();

//     expect(singers.length).toBe(0);

//   });

//   it('should delete a singer - Promise version', () => {

//     return Singer
//       .create({
//         name: 'Aretha Franklin',
//         rank: 2,
//       })
//       .then(singer => {

//         return Singer.deleteOne({
//           _id: singer._id,
//         }).then(result => {

//           expect(result.ok).toBe(1);

//           return Singer.find().then(singers => {

//             expect(singers.length).toBe(0);
//           });

//         });
//       });
//   });

//   it('should reject on find when id not found', () => {

//     return Singer.findById('wrong').then(() => {
//       fail('should not get here');
//     }).catch(err => {
//       expect(err).toBeDefined();
//     });
//   });

//   /* NOTE: several ways to handle this
//   1. make fields required in model
//   2. Have check in api for {} body
//   3. Use pre save hook middleware
//   */
//   it('should reject on POST when no body provided', () => {
//     return Singer
//       .create({})
//       .then(singer => {
//         fail('should not get here:' + singer);
//       })
//       .catch(err => {
//         expect(err).toBeDefined();
//       });
//   });

//   it('should reject on put then id not found', () => {
//     return Singer.findByIdAndUpdate('wrong', {
//       rank: 100,
//     })
//       .then(() => fail('should not get here'))
//       .catch(err => {
//         expect(err).toBeDefined();
//       });
//   });

//   /* NOTE: several ways to handle this. Expiriment!
//   1. make fields required in model
//   2. Have check in api for {} body
//   3. Use pre save hook middleware
//   */
//   xit('should reject on PUT when no body provided', () => {
//     return Singer
//       .create({
//         name: 'Tina Turner',
//         rank: 12,
//       })
//       .then(singer => {

//         return Singer
//           .findByIdAndUpdate(singer._id, {})
//           .then(() => {
//             fail('wtf');
//           }).catch(err => {
//             expect(err).toBe({});
//           });
//       })
//       .catch(err => {
//         expect(err).toBe({});
//       });
//   });
