'use strict';

var mongoose = require('mongoose');

const idsSchema = new mongoose.Schema({
	classify_id: Number,
	img_id:Number,
    banner_id:Number,
    books_id:Number,
    periodical_id:Number,
    like_id:Number,
    comment_id:Number,
    cart_id:Number,
    address_id:Number

});

const Ids = mongoose.model('Ids', idsSchema);

Ids.findOne((err, data) => {
	if (!data) {
		const newIds = new Ids({
            classify_id: 0,
            img_id:0,
            banner_id:0,
            books_id:0,
            periodical_id:0,
            like_id:0,
            comment_id:0,
            cart_id:0,
            address_id:0
		});
		newIds.save();
	}
})
module.exports = Ids