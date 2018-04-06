var express = require('express');
var router = express.Router();
var user = require('../models/user');

router.post('/', function (req, res) {

  var registerUser = new user({
    name: req.body.name,
    email: req.body.email,
    mobile: req.body.mobile,
    password: req.body.password,
  });

  registerUser.save(function (err, result) {
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


})

module.exports = router;