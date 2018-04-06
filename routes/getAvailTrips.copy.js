var express = require('express');
var router = express.Router();





var mongoose = require('mongoose');





// var availableTrips = require('../models/availableTrips');



var trips;



/* GET home page. */
// router.get((req, res) => {

//   MongoClient.connect(url, function(err, db) {
//     if (err) throw err;
//     var dbo = db.db("test");
//     dbo.collection("availableTrips ").find({}, function(err, result) {
//       if (err) throw err;
//       trips = result;
//       console.log(result.name);
//       db.close();
//     });
//   });

//   // const source = parseInt(req.params['source']);
//   // const destination = parseInt(req.params['destination']);

//   // const availTrips = trips.filter(data => {
//   //   return (data.source === source && data.destination === destination);
//   // });
//   res.status(200).json(
//     availTrips
//   );
// });

router.get('/', function (req, res) {

  //Import the mongoose module
  // var url = "mongodb://localhost:27017/";

  //Set up default mongoose connection
  // var mongoDB = 'mongodb://localhost:27017/test/';
  // mongoose.connect(mongoDB);
  var Schema = mongoose.Schema;
  var schema = new Schema({
    bus_id: { type: String, required: true },
    destination: { type: String, required: true },
    from_time: { type: String, required: true },
    price: { type: String, required: true },
    source: { type: String, required: true },
    to_time: { type: String, required: true }
  }, { collection : 'availableTrips' });

  // Get Mongoose to use the global promise library
  // mongoose.Promise = global.Promise;

  //Get the default connection
  // var db = mongoose.connection;

  // //Bind connection to error event (to get notification of connection errors)
  // db.on('error', console.error.bind(console, 'MongoDB connection error:'));

  // // db.availableTrips.find()
  // db.collection("availableTrips").find({})
  // .toArray(function(err, result) {
  //   if (err) throw err;
  //   console.log(result);
  //   db.close();
  // });
  // .exec(function (err, messages) {
  //   if (err) {
  //       return res.status(500).json({
  //           title: 'An error occurred',
  //           error: err
  //       });
  //   }
  //   res.status(200).json({
  //       message: 'Success',
  //       obj: messages
  //   });
  // });;

  var availableTrips = mongoose.model('availableTrips', schema);
  availableTrips
    .find()
    .exec(function (err, messages) {
      if (err) {
        return res.status(500).json({
          title: 'An error occurred',
          error: err
        });
      }
      res.status(200).json({
        message: 'Success',
        obj: messages
      });
    });

  // MongoClient.connect(url, function (err, db) {
  //   if (err) throw err;
  //   var dbo = db.db("test");
  //   dbo.collection("availableTrips ").find({}, function (err, result) {
  //     if (err) throw err;
  //     trips = result;
  //     console.log(result.name);
  //     db.close();
  //   });
  // });

  // const source = parseInt(req.params['source']);
  // const destination = parseInt(req.params['destination']);

  // const availTrips = trips.filter(data => {
  //   return (data.source === source && data.destination === destination);
  // });
  // res.status(200).json(
  //   trips
  // );
  // res.send('Birds home page')
})

module.exports = router;
