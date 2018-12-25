var mongoose = require('mongoose');
var classifySchema = new mongoose.Schema({
  "name":String,
  "status":String
})

module.exports  =  mongoose.model('Classify',classifySchema);;