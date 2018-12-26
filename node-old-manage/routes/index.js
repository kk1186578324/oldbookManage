
var classify = require('./classify');
var banner = require('./banner');
var v1 = require('./v1');


module.exports = app => {
    app.use('/classify', classify);
	app.use('/banner', banner);
    app.use('/v1', v1);
}