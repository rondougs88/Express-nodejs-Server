var express = require('express');
var router = express.Router();
var BookedTrip = require('../models/bookedTrip');

router.post('/', function (req, res, next) {

  var bookedTrip = new BookedTrip({
    bookingId: req.body.bookingId,
    bookingDate: req.body.bookingDate,
    name: req.body.name,
    email: req.body.email,
    mobileNumber: req.body.mobileNumber,
    bus_id: req.body.bus_id,
    destination: req.body.destination,
    from_time: req.body.from_time,
    price: req.body.price,
    source: req.body.source,
    to_time: req.body.to_time
  });

  bookedTrip.save(function (err, result) {
    if (err) {
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }
    res.status(201).json({
      message: 'Saved message',
      obj: result
    });
  });
});

module.exports = router;
