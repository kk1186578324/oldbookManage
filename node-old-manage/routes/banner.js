var express = require('express')
var  BaseComponent =require('../prototype/baseComponent');
var Banner  = require('../controller/banner/banner');
const router  = express.Router();
var baseHandle = new BaseComponent();

router.post("/add",Banner.add);
router.post("/list",Banner.list);
router.post("/update",Banner.update);
router.delete("/del/:banner_id",Banner.delete);
router.post("/addImg/:type",baseHandle.uploadImg);
module.exports =  router;