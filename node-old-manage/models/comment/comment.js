var mongoose = require('mongoose');
var commentSchema = new mongoose.Schema({
    "bookId":String,
    "userId":String,
    "id":Number
})
module.exports = mongoose.model('comment',commentSchema);
