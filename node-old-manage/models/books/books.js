var mongoose = require('mongoose');
var BooksSchema = new mongoose.Schema({
    "name":String,
    "author":String,
    "price":String,
    "score":Number,
    "classify":String,
    "img":String,
    "id":Number
})
module.exports = mongoose.model('Books',BooksSchema);
