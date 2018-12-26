
var formidable = require("formidable")
var BaseComponent = require ('../../prototype/baseComponent')
var classifyModel = require("../../models/classify/classify");
class Classify extends  BaseComponent{
    constructor(){
        super()
        this.add = this.add.bind(this);
    }
     async add(req,res,next){

        const classify_id = await  this.getId('classify_id')
		 var classifyData = {
		    name:req.body.name,
		    recommend:req.body.recommend,
             id:classify_id
		  }
          
      var findresult = await classifyModel.findOne({name:classifyData.name});
        if(findresult){
	        res.send({
	            success:false,
	            msg:'该分类已存在'
	        })
            return;
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
            msg:'查询失败'
           })
        }
  
    }
    async update(req,res,next){
        var classifyData = {
            name:req.body.name,
            recommend:req.body.recommend
        }
        console.log(classifyData)
        var result = await classifyModel.update({_id:req.body._id},classifyData);

        if(result){
            res.send({
                success:true,
                msg:'编辑成功'
            })
        }else{
            res.send({
                success:false,
                msg:'编辑失败'
            })
        }


    }
    async delete(req,res,next){
        const classify_id = req.params.classify_id;
        var findresult = await classifyModel.remove({_id:classify_id});
        console.log(findresult)
        if(findresult){
            res.send({
                success:true,
                msg:"删除成功",
            })
        }else {
            res.send({
                success:false,
                content:'删除失败'
            })
        }

    }



}



module.exports =  new Classify();