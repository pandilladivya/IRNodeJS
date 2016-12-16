var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DatabaseSchema = new Schema({
    ipstr: String,
    file:{ data: Object , ContentType:String}
});

module.exports = mongoose.model('Data', DatabaseSchema);