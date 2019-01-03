var express = require('express')
var Like  = require('../controller/like/like');
const router  = express.Router();
router.post("/add",Like.add);
router.post("/list",Like.list);
module.exports =  router;