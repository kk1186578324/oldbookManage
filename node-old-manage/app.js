var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var jwt = require('jsonwebtoken');
var fs = require('fs');
// var connect = require('connect');
const db = require("./models/db.js");
var router = require('./routes/index');
var history = require('connect-history-api-fallback');
import chalk from 'chalk';
// var usersRouter = require('./routes/users');
// const redis = require('redis')
// const client = redis.createClient()
var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
router(app);
app.use(function(req, res, next) {



    next(createError(404));
    //
    // var _urlArr = ["/like/add","/comment/add"]
    // console.log("url:"+req.originalUrl);
    // if(req.originalUrl=="/user/login"){
    //     next()
    // }else{
    //     client.get('token', function(err, value){


            // if(_urlArr.indexOf(req.originalUrl)!=-1){
            //     var token =req.get("Authorization")
            //
            //     console.log(value)
            //     console.log(token)
            //     if(value!==token){
            //         return res.json({status:"1001", success: false, message: 'token信息错误.' });
            //     }
                // var  secret  = fs.readFileSync(path.join(__dirname, 'config/pub.key'))
                // console.log(secret)

                // 确认token
                // jwt.verify(token, 'secret', function(err, decoded) {
                //     if (err) {
                //         console.log(err)
                //         return res.json({status:"1001", success: false, message: 'token信息错误.' });
                //     } else {
                //         // 如果没问题就把解码后的信息保存到请求中，供后面的路由使用
                //         // req.api_user = decoded;
                //         console.log(decoded)
                //         next()
                //     }
                // });
    //         }
    //         // next()
    //
    //     })
    //
    //
    // }

    //
    // if(req.cookies.token){
    //      next()
    // }else{
    //     next()
    //     console.log("url:"+req.originalUrl);
    // }


});


// catch 404 and forward to error handler

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
app.use(history())

app.use(express.static("./public"))
app.listen(3000, () => {
    console.log(
        chalk.green(`成功监听端口:3000`)
    )
})
module.exports = app;
