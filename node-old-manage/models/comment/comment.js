var mongoose = require('mongoose');
var commentSchema = new mongoose.Schema({
    "bookId":String,
    "userId":String,
    "id":Number,
    "content":String
})
module.exports = mongoose.model('comment',commentSchema);
