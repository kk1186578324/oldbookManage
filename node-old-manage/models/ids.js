'use strict';

var mongoose = require('mongoose');

const idsSchema = new mongoose.Schema({
	classify_id: Number,
	img_id:Number,
    banner_id:Number

});

const Ids = mongoose.model('Ids', idsSchema);

Ids.findOne((err, data) => {
	if (!data) {
		const newIds = new Ids({
            classify_id: 0,
            img_id:0,
            banner_id:0

		});
		newIds.save();
	}
})
module.exports = Ids