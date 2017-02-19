const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Controller = require('./Controller');
const db = 'mongodb://localhost/movie';

mongoose.Promise = global.Promise;
mongoose.connect(db);
mongoose.connection.on('connected', function() {
    console.log('Mongoose is now connected to',db);
  });
app.use(bodyParser.urlencoded(
  { extended: false }
));
app.use(bodyParser.json());
app.use('/', Controller);
app.listen(3000, () =>
  console.log('App running on localhost:3000')
);
