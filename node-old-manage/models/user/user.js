var mongoose = require('mongoose');
var BooksSchema = new mongoose.Schema({
    "date":String,
    "name":String,
    "address":String,
    "password":String,
    "classify":String,
    "img":String,
    "id":Number
})
module.exports = mongoose.model('Books',BooksSchema);
