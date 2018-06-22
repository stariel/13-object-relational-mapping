import {
  Mockgoose,
} from 'mockgoose';
import mongoose from 'mongoose';

import Album from '../src/models/albums.js';

const mockgoose = new Mockgoose(mongoose);

afterEach((done) => {
  mockgoose.helper.reset().then(done);
});

it('Model should exist'), () => {
  expect(Album).toBeDefined();
};