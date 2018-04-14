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

router.patch('/:id', function (req, res, next) {
  var decoded = jwt.decode(req.query.token);
  BookedTrip.findById(req.params.id, function (err, booking) {
    if (err) {
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }
    if (!booking) {
      return res.status(500).json({
        title: 'No Booking Found!',
        error: { message: 'Booking not found' }
      });
    }
    if (booking.user != decoded.userToken._id) {
      return res.status(401).json({
        title: 'Not Authenticated',
        error: { message: 'Users do not match' }
      });
    }
    // Start of parts to be updated --->>>
    booking.name = req.body.name;
    booking.email = req.body.email;
    booking.mobileNumber = req.body.mobileNumber;
    // <<<--- End of parts to be updated
    booking.save(function (err, result) {
      if (err) {
        return res.status(500).json({
          title: 'An error occurred',
          error: err
        });
      }
      res.status(200).json({
        message: 'Updated booking',
        obj: result
      });
    });
  });
});

router.delete('/:id', function (req, res, next) {
  var decoded = jwt.decode(req.query.token);
  BookedTrip.findById(req.params.id, function (err, booking) {
    if (err) {
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }
    if (!booking) {
      return res.status(500).json({
        title: 'No Message Found!',
        error: { message: 'Booking not found' }
      });
    }
    if (booking.user != decoded.userToken._id) {
      return res.status(401).json({
        title: 'Not Authenticated',
        error: { message: 'Users do not match' }
      });
    }
    booking.remove(function (err, result) {
      if (err) {
        return res.status(500).json({
          title: 'An error occurred',
          error: err
        });
      }
      // Start of: the corresponding trips in users should also be deleted --->>>
      // User.findById(decoded.userToken._id, function (err, user) {
      //   if (err) {
      //     return res.status(500).json({
      //       title: 'An error occurred',
      //       error: err
      //     });
      //   }
      //   user.bookedtrips.remove(function (err, result) {
      //     if (err) {
      //       return res.status(500).json({
      //         title: 'An error occurred',
      //         error: err
      //       });
      //     }
      //   });
      // });
      // User.update({ _id: booking.user }, function (err, user) {
      //   if (err) {
      //     return res.status(500).json({
      //       title: 'An error occurred',
      //       error: err
      //     });
      //   }
      //   user.bookedtrips.update({ _id: booking._id }, function (err, user) {
      //     if (err) {
      //       return res.status(500).json({
      //         title: 'An error occurred',
      //         error: err
      //       });
      //     }
      //   });
      //   // res.status(200).json(
      //   //   user
      //   // );
      // }
      // );
      // <<<--- End of: the corresponding trips in users should also be deleted
      res.status(200).json({
        message: 'Deleted booking',
        obj: result
      });
    });
  });
});

module.exports = router;
