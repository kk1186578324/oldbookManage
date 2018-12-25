
var classify = require('./classify');


module.exports = app => {
	app.use('/classify', classify);
}