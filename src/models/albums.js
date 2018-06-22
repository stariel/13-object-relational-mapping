import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const albumSchema = new Schema({
  title:  {type: String, required: true},
  artist: {type: String, required: true},
  releaseYear: { type: Number, max: 2018 },
});

export default mongoose.model('albums', albumSchema);