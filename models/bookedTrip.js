var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    bookingId: {type: String, required: true},
    bookingDate: {type: String, required: true},
    name: {type: String, required: true},
    email: {type: String, required: true},
    mobileNumber: {type: Number, required: true},
    bus_id: {type: String, required: true},
    destination: {type: String, required: true},
    from_time: {type: String, required: true},
    price: {type: String, required: true},
    source: {type: String, required: true},
    to_time: {type: String, required: true}
});

module.exports = mongoose.model('BookedTrip', schema);