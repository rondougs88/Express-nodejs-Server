var express = require('express');
var router = express.Router();
var availabletrips = require('../models/availabletrips');

// var mongoose = require('mongoose');

router.get('/:source/:destination', function (req, res) {
  // mongoose.connect('mongodb://localhost:27017/test');

  availabletrips.find({}, function (err, data) {
    if (err) {
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }
    const source = req.params.source.trim();
    const destination = req.params.destination.trim();
    const trips = data.filter(trip => {
      return (trip.source === source && trip.destination === destination);
    });
    res.status(200).json(
      trips
    );
  });
})

module.exports = router;