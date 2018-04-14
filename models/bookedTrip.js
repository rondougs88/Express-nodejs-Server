var mongoose = require('mongoose');
var User = require('./user');
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
    to_time: {type: String, required: true},
    user: [{type: Schema.Types.ObjectId, ref: 'user'}]
});

// schema.pre('remove', function(next) {
//     // Remove all the assignment docs that reference the removed person.
//     this.model('user').remove({ bookedtrips: this._id }, next);
// });

schema.post('remove', function (bookedtrip) {
    User.findById(bookedtrip.user, function (err, user) {
        user.bookedtrips.pull(bookedtrip);
        user.save();
    });
});

module.exports = mongoose.model('BookedTrip', schema, 'bookedtrips');
