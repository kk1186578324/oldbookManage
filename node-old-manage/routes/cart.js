var express = require('express')
var Cart  = require('../controller/cart/cart');
const router  = express.Router();
router.post("/add",Cart.add);
router.post("/list",Cart.list);
router.post("/del",Cart.delete);
router.post("/update",Cart.update);
router.post("/getOne",Cart.getOneBook);
module.exports =  router;