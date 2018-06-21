var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var albumSchema = new Schema({
  title:  [{type: String, required: true}],
  artist: [{type: String, required: true}],
  releaseYear: [{ type: Number, max: 2018 }],
});

export default albumSchema;