var mongoose = require('mongoose');
var BooksSchema = new mongoose.Schema({
    "userName":String,
    "avatar":String,
    "city":String,
    "token":String,
    "openid":String
})
module.exports = mongoose.model('Users',BooksSchema);
