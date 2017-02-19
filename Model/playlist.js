let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
let Schema = mongoose.Schema;
let videoType = {
  type: String,
  enum: ['movie', 'series']
}

let playlistSchema = new Schema({
  Title: {
    type: String,
    required: true,
    min: 3
  },
  imdbID: {
    type: String,
    required: true,
    unique: true,
    min: 5
  },
  Year: {
    type: String,
    required: true,
    min: 3
  },
  Rated: {
    type: String,
  },
  Released: {
    type: String,
  },
  Runtime: {
    type: String,
  },
  Genre: {
    type: String,
    default: 'All'
  },
  Director: {
    type: String
  },
  Writer: {
    type: String
  },
  Actors: {
    type: [String],
    trim : true
  },
  Plot: {
    type: String
  },
  Language: {
    type: [String],
    trim : true
  },
  Country: {
    type: [String],
    trim : true
  },
  Awards: {
    type: String
  },
  Poster: {
    type: String
  },
  Metascore: {
    type: String,
    min: 0
  },
  imdbRating: {
    type: String,
    min: 0
  },
  imdbVotes: {
    type: String,
    min: 0
  },
  Type: videoType,
});

playlistSchema.methods.findGenre = function findGenre (cb) {
  return this.model('playlist').find({ Genre: this.Genre }, cb);
};

playlistSchema.methods.findAllGenre = function findAllGenre (cb) {
  return this.model('playlist').find().distinct('Genre', cb);
};

module.exports = mongoose.model('playlist', playlistSchema);
