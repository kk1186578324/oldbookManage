var express = require('express')
var Classify  = require('../controller/classify/classify');
const router  = express.Router();
router.post("/add",Classify.add);
router.post("/list",Classify.list);
router.post("/update",Classify.update);
router.delete("/del/:classify_id",Classify.delete);

module.exports =  router;
