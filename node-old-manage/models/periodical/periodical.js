var mongoose = require('mongoose');
var periodicalSchema = new mongoose.Schema({
    "content":String,
    "fav_nums":Number,
    "image":String,
    "index":Number,
    "like_status":Number,
    "pubdate":String,
    "title":String,
    "type":Number,
    "id":Number
})
module.exports = mongoose.model('periodical',periodicalSchema);
