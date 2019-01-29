var mongoose = require('mongoose');
var AddressSchema = new mongoose.Schema({
    "id" :Number,
    "address" :String,
    "phone" : String,
    "name" :String,
    "address_detail" : String,
    "user_id" :String,
    "isDefult" : Boolean
})
module.exports = mongoose.model('Address',AddressSchema);