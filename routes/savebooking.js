var express = require('express');
var router = express.Router();
const fs = require('fs');
var mongoose = require('mongoose');
var bookedTrip = require('../models/bookedTrip');

mongoose.connect('mongodb://localhost:27017/node-angular');

router.post('/', function (req, res, next) {
  var bookedTrip = new bookedTrip({
    bookingId: req.body.content.bookingId,
    bookingDate: req.body.content.bookingDate,
    name: req.body.content.name,
    email: req.body.content.email,
    mobileNumber: req.body.content.mobileNumber,
    bus_id: req.body.content.bus_id,
    destination: req.body.content.destination,
    from_time: req.body.content.from_time,
    price: req.body.content.price,
    source: req.body.content.source,
    to_time: req.body.content.to_time
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

// router.post((req, res) => {
//   const bookedTrip = req.body;

//   fs.readFile("db-bookedtrips.json", "utf8", function (err, data) {
//     if (err)
//       return next(err);

//     var allData;
//     try {
//       allData = JSON.parse(data);
//     } catch (err) {
//       return next(err);
//     }

//     allData.push(bookedTrip);

//     fs.writeFile("db-bookedtrips.json", JSON.stringify(allData), 'utf8', function (err) {
//       if (err)
//         return next(err);

//       res.end();
//     })
//   }); // end of readFile
//   res.send(200).send(bookedTrip);
// });

module.exports = router;
