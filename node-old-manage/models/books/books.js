var mongoose = require('mongoose');
var BooksSchema = new mongoose.Schema({
    "title":String,
    "author":String,
    "fav_nums":Number,
    "like_status":Number,
    "price":String,
    "score":Number,
    "classify":String,
    "image":String,
    "id":Number
})
module.exports = mongoose.model('Books',BooksSchema);
