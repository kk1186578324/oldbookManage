var mongoose = require('mongoose');
var classifySchema = new mongoose.Schema({
  "name":String,
  "recommend":String,
  "id":Number
})

module.exports  =  mongoose.model('Classify',classifySchema);