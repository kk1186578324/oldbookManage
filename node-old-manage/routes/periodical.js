var express = require('express');
var Periodical  = require('../controller/periodical/periodical');
const router  = express.Router();
router.post("/add",Periodical.add);
router.post("/list",Periodical.list);
router.post("/update",Periodical.update);
router.delete("/del/:books_id",Periodical.delete);
module.exports =  router;