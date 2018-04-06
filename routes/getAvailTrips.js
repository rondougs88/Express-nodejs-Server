var express = require('express');
var router = express.Router();
const fs = require('fs');
var mongoose = require('mongoose');


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// mongoose.model('question', new Schema({ url: String, text: String, id: Number }));

// var questions = mongoose.model('question');

router.get('/api/trips/:source/:destination', function (req, res) {
  mongoose.connect('mongodb://localhost:27017/test');
  var availabletrips = require('../models/availabletrips');
  availabletrips.find({}, function (err, data) {
    // console.log(err, data, data.length); 
    if (err) {
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }
    // const source = parseInt(req.params['source']);
    // const destination = parseInt(req.params['destination']);
    console.log(req.params);
    const source = req.params.source.trim();
    const destination = req.params.destination.trim();
    const trips = data.filter(trip => {
      return (trip.source === source && trip.destination === destination);
    });
    res.status(200).json(
      trips
      //   {
      //   message: 'Success',
      //   obj: data
      // }
    );
  });
})

module.exports = router;