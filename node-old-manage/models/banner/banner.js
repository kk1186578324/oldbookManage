var mongoose = require('mongoose');
var bannerSchema = new mongoose.Schema({
    "name":String,
    "url":String,
    "id":Number
})
module.exports = mongoose.model('Banner',bannerSchema);
