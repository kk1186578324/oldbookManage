var mongoose = require('mongoose');
var periodicalSchema = new mongoose.Schema({
    "content":String,
    "fav_nums":Number,
    "image":String,
    "index":Number,
    "pubdate":String,
    "title":String,
    "type":Number,
    "url":String,
    "id":Number
})
module.exports = mongoose.model('periodical',periodicalSchema);
