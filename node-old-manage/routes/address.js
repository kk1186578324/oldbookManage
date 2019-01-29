var express = require('express')
var  BaseComponent =require('../prototype/baseComponent');
var Address  = require('../controller/address/address');
const router  = express.Router();
var baseHandle = new BaseComponent();
router.post("/add",Address.add);
router.post("/list",Address.list);
router.post("/update",Address.update);
router.post("/del",Address.delete);
module.exports =  router;