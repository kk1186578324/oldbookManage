var express = require('express');
var Books  = require('../controller/books/books');
const router  = express.Router();
router.post("/add",Books.add);
router.post("/list",Books.list);
router.post("/update",Books.update);
router.delete("/del/:books_id",Books.delete);
module.exports =  router;
