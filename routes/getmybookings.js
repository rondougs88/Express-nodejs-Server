var express = require('express');
var router = express.Router();
var mybookingslist = require('../models/bookedTrip');
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

router.get('/', function (req, res) {

  var decoded = jwt.decode(req.query.token);
  mybookingslist.find({user: decoded.userToken}, function (err, mybookings) {
    if (err) {
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }
    res.status(200).json(
      mybookings
    );
  });
})

module.exports = router;