var express = require('express')
var comment  = require('../controller/comment/comment');
const router  = express.Router();
router.post("/add",comment.add);
module.exports =  router;