var express = require('express');
var router = express.Router();
var BookedTrip = require('../models/bookedTrip');
var User = require('../models/user');
var jwt = require('jsonwebtoken');

router.use('/', function (req, res, next) {
  jwt.verify(req.query.token, 'secret', function (err, decoded) {
      if (err) {
          return res.status(401).json({
              title: 'Not Authenticated',
              error: err
          });
      }
      next();
  })
});

router.post('/', function (req, res, next) {

  var decoded = jwt.decode(req.query.token);
  User.findById(decoded.userToken._id, function (err, user) {
    if (err) {
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }
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
      to_time: req.body.to_time,
      user: user
    });
    bookedTrip.save(function (err, result) {
      if (err) {
        return res.status(500).json({
          title: 'An error occurred',
          error: err
        });
      }
      user.bookedtrips.push(result);
      user.save();
      res.status(201).json({
        message: 'Saved message',
        obj: result
      });
    });
  });
})

module.exports = router;
