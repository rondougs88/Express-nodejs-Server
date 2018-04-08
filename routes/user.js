var express = require('express');
var router = express.Router();
var user = require('../models/user');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');

router.post('/registeruser', function (req, res) {

  var salt = bcrypt.genSaltSync(10);

  var registerUser = new user({
    name: req.body.name,
    email: req.body.email,
    mobile: req.body.mobile,
    password: bcrypt.hashSync(req.body.password, salt)
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

router.post('/login', function(req, res, next) {
  user.findOne({email: req.body.email}, function(err, user) {
      if (err) {
          return res.status(500).json({
              title: 'An error occurred',
              error: err
          });
      }
      if (!user) {
          return res.status(401).json({
              title: 'Login failed',
              error: {message: 'Invalid login credentials'}
          });
      }
      if (!bcrypt.compareSync(req.body.password, user.password)) {
          return res.status(401).json({
              title: 'Login failed',
              error: {message: 'Invalid login credentials'}
          });
      }
      var token = jwt.sign({user: user}, 'secret', {expiresIn: 7200});
      res.status(200).json({
          message: 'Successfully logged in',
          token: token,
          userId: user._id
      });
  });
});

module.exports = router;