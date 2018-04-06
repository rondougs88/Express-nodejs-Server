var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

var getAvailTrips = require('./routes/getAvailTrips.js');
var savebooking = require('./routes/savebooking');
const bodyParser = require('body-parser');

var app = express();
mongoose.connect('mongodb://localhost:27017/test');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());

// Add headers
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

// app.use('/api/trips/:source/:destination', getAvailTrips);
// app.get('/api/trips/', getAvailTrips);

app.use('/', getAvailTrips)

// app.use('/api/trips/:source/:destination', getAvailTrips)
// .get((req, res) => {
//   const trips = [
//     {
//         'source': 1,
//         'destination': 5,
//         'from_time': '6:00:00',
//         'to_time': '7:00:00',
//         'bus_id': 'bus01',
//         'price': 5
//     },
//     {
//         'source': 1,
//         'destination': 5,
//         'from_time': '8:00:00',
//         'to_time': '9:00:00',
//         'bus_id': 'bus21',
//         'price': 5
//     }];

//   const source = parseInt(req.params['source']);
//   const destination = parseInt(req.params['destination']);

//   const trip = trips.filter(data => {
//     return (data.source === source && data.destination === destination);
//   });
//   res.status(200).json(
//     trip
//   );
// });

app.use('/api/savebooking', savebooking);

module.exports = app;
