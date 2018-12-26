
var formidable = require("formidable")
var classifyModel = require("../../models/classify/classify");
class Classify{
    constructor(){

	}
     async add(req,res,next){
         const form  = new formidable.IncomingForm()
		 var classifyData = {
		    name:req.body.name,
		    recommend:req.body.recommend
		  }
          
      var findresult = await classifyModel.findOne({name:classifyData.name});
        if(findresult){
	        res.send({
	            success:false,
	            msg:'该分类已存在'
	        })
        }
      var addresult =   await classifyModel.create(classifyData);
        res.send({
            success:true,
            msg:'添加成功'
        })
    }
   async list(req,res,next){
   	let page = req.body.page;
    let pageSize = req.body.pageSize;
    let skip = (page-1)*pageSize;
    var findresult = await classifyModel.find({}).skip(skip).limit(pageSize)
    var count = await classifyModel.count();
        if(findresult){
	        res.send({
	            success:true,
	            content:findresult,
	            count:count
	        })
        }else{
    	  res.send({
            success:false,
            content:'查询失败'
           })
        }
  
    }
    update(){

    }
    delete(){

    }



}



module.exports =  new Classify();