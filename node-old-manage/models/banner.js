var mongoose = require('mongoose');
var bannerSchema = new mongoose.Schema({
  "bannerImg":String,
})
module.exports = mongoose.model('Banner',bannerSchema);
