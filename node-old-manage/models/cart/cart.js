var mongoose = require('mongoose');
var CartSchema = new mongoose.Schema({
    "title":String,
    "author":String,
    "fav_nums":Number,
    "like_status":Number,
    "price":String,
    "score":Number,
    "classify":String,
    "image":String,
    "id":Number,
    "pubdate":String,
    "validity":String,
    "userId":String,
    "book_id":String,
    "count":Number,
    "allPrice":Number,
    "isChecked":Boolean
})
module.exports = mongoose.model('Cart',CartSchema);
