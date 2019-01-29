var express = require('express')
var comment  = require('../controller/comment/comment');
const router  = express.Router();
router.post("/add",comment.add);
router.post("/list",comment.list);
module.exports =  router;