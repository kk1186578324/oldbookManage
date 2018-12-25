var express = require('express')
var Classify  = require('../controller/classify/classify');
const router  = express.Router();
router.post("/add",Classify.add)
router.post("/update",Classify.update)
router.post("/delete",Classify.delete)

module.exports =  router;
