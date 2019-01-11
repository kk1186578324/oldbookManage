var formidable = require("formidable")
var BaseComponent = require('../../prototype/baseComponent')
var userModel = require("../../models/user/user");
var request = require('request');
var FormData = require('form-data');
var formData = new FormData();
// var jwt = require('jsonwebtoken');
var fs = require('fs');
var path = require('path');
// const redis = require('redis')
// const client = redis.createClient()
class User {
    constructor() {
        this.login = this.login.bind(this);
    }

    async login(req, res, next) {

        //拿到前台给的code后，发送请求
        if (req.body.code) {
            let options = {
                method: 'POST',
                url: 'https://api.weixin.qq.com/sns/jscode2session?',
                formData: {
                    appid: req.body.appid,
                    secret: req.body.secret,
                    js_code: req.body.code,
                    grant_type: 'authorization_code'
                }
            };

            request(options, async (error, response, body) => {
                if (error) { //请求异常时，返回错误信息
                    res.json({
                        "status": "error",
                        "code": "出错"
                    })
                } else {
                    //返回值的字符串转JSON
                    let _data = JSON.parse(body);

                    console.log(_data)

                    //根据返回值创建token
                    // var  secret  = fs.readFileSync(path.join(__dirname, '../../config/pri.key'))
                    // let token =
                    //     jwt.sign({
                    //         data: req.body.code
                    //     }, 'secret', {expiresIn: 10*1000});
                    //
                    // console.log(token)
                    // console.log(_data)

                    var param = {
                        userName: req.body.userInfo.nickName,
                        avatar: req.body.userInfo.avatarUrl,
                        city: req.body.userInfo.city,
                        openid: _data.openid
                    }
                    var loginResult = await userModel.findOne({openid:param.openid});
                    console.log(loginResult)
                    if (loginResult) {
                        res.json({
                            success:true,
                            "openid":  _data.openid
                        });

                        // var createResult = await userModel.update({
                        //     "openid": param.openid
                        // },{$set:{
                        //     "token": token,
                        // }})

                        // client.set('token',token) // 注意，value会被转为字符串,所以存的时候要先把value 转为json字符串


                    }else{
                        var createResult = await userModel.create(param)
                        if(createResult){
                            res.json({
                                success:true,
                                openid: _data.openid
                            })
                        }
                    }
                }
            })
          };
        }
    }

    module.exports = new User();