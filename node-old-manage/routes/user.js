var express = require('express')
var User  = require('../controller/user/user');
/*//处理formdata
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({
    extended: false
});*/

const router  = express.Router();
router.post("/login",User.login);
module.exports =  router;