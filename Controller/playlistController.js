'use strict';
const router = require('express').Router();
const Playlist = require('../Model/playlist');

router.get('/playlist', function(req,res){
    let allMovies = new Playlist();
    let genres = null;
    let movieList = [];
    allMovies.findAllGenre(function (err, allGenres) {
      if (err) res.send('Error');
      let results = Promise.all(allGenres.map(function(eachGenre){
        let genreMovies = new Playlist({Genre: eachGenre});
        allMovies.findGenre(function (err, movies){
          if (err) reject('Error');
          return new Promise(function(resolve,reject){
            resolve(movies);
          });
        });
      })).then(data => {
        console.log(data);
      });
    });
});

router.get('/playlist/:genre', function(req,res){
  let allMovies = new Playlist({Genre: req.params.genre});
  let genres = null;
  let movieList = null;
  allMovies.findGenre(function (err, movies){
      if (err) res.send('Error');
      res.send(movies);
  });
});

router.get('/playlist/:genre/movie/:moviename', function(req,res){
  Playlist.findOne({
    Genre: req.params.genre,
    imdbID: req.params.moviename
  }).exec((err, result) => {
      if(err) res.send('No Results');
      res.send(result);
  });
});

router.post('/playlist/:genre/movie/:moviename', function(req, res) {
  let playlist = new Playlist();
  Object.keys(req.body).map(function(eachKey){
    if(eachKey == 'Actors' || 'Language' || 'Country'){
      playlist[eachKey] = req.body[eachKey].split(', ');
    }else{
      playlist[eachKey] = req.body[eachKey];
    }
  });
  playlist['Genre'] = req.params.genre;
  playlist.save((err, movie) => {
    if(err) {
      res.send('error saving movie');
    } else {
      res.send(movie);
    }
  });
});


router.patch('/playlist/:genre/movie/:moviename', function(req, res){
  Playlist.findOneAndUpdate({ imdbID: req.params.moviename },
    { $set:
       { Genre: req.body.genre }
    }, {upsert: true}, (err, movie) => {
    if(err){
      res.send('error updating ');
    }else {
      res.send(movie);
  }
  })
});

router.delete('/playlist/:genre/movie/:moviename', (req, res) =>
  Playlist.findOneAndRemove({
    imdbID: req.params.moviename
  }, (err, movie) => {
    if(err) {
      res.send('error removing')
    } else {
      res.send('Deleted');
  }
}));

module.exports = router;
