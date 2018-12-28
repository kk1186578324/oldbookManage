var express = require('express')
var Like  = require('../controller/like/like');
const router  = express.Router();
router.post("/add",Like.add);
module.exports =  router;