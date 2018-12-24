var mongoose = require('mongoose');
var classifySchema = new mongoose.Schema({
  "name":String,
  "status":String
})
const Classify= mongoose.model('Classify',classifySchema);



export default Classify