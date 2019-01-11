
var classify = require('./classify');
var banner = require('./banner');
var books = require('./books');
var periodical = require('./periodical');//期刊
var like = require('./like');//点赞
var comment = require('./comment');//评论
var user = require('./user');//评论
var v1 = require('./v1');


module.exports = app => {
    app.use('/books', books);
    app.use('/classify', classify);
	app.use('/banner', banner);
    app.use('/periodical', periodical);
    app.use('/like', like);
    app.use('/comment', comment);
    app.use('/user', user);
    app.use('/v1', v1);

}