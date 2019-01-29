var mongoose = require('mongoose');
var commentSchema = new mongoose.Schema({

    "userId":String,
    "art_id":String,
    "id":Number,
    "fav_nums":Number,
    "image":String,
    "index":Number,
    "like_status":Number,
    "pubdate":String,
    "title":String,
    "type":Number,
    "url":String,
})
module.exports = mongoose.model('like',commentSchema);
