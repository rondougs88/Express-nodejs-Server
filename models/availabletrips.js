var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    bus_id: {type: String, required: true},
    destination: {type: String, required: true},
    from_time: {type: String, required: true},
    price: {type: String, required: true},
    source: {type: String, required: true},
    to_time: {type: String, required: true}
});

module.exports = mongoose.model('availableTrips', schema, 'availabletrips');

