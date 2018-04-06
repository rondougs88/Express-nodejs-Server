var express = require('express');
var router = express.Router();
var mybookingslist = require('../models/bookedTrip');

router.get('/', function (req, res) {

  mybookingslist.find({}, function (err, mybookings) {
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