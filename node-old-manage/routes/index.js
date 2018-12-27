
var classify = require('./classify');
var banner = require('./banner');
var books = require('./books');
var periodical = require('./periodical');//期刊
var v1 = require('./v1');


module.exports = app => {
    app.use('/books', books);
    app.use('/classify', classify);
	app.use('/banner', banner);
    app.use('/periodical', periodical);
    app.use('/v1', v1);
}