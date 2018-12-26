var express = require('express')
var  BaseComponent =require('../prototype/baseComponent');
const router  = express.Router();
var baseHandle = new BaseComponent();
router.post("/addImg/:type",baseHandle.uploadImg)
module.exports =  router;