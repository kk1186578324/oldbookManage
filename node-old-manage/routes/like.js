var express = require('express')
var Like  = require('../controller/like/like');
const router  = express.Router();
router.post("/add",Like.add);
router.post("/list",Like.list);
router.post("/book",Like.book);
router.post("/bookList",Like.bookList);
router.post("/allList",Like.allList);
module.exports = router;