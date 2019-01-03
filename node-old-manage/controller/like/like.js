
var formidable = require("formidable")
var BaseComponent = require ('../../prototype/baseComponent')
var periodicalModel = require("../../models/periodical/periodical");
class Like extends  BaseComponent{
    constructor(){
        super()
        this.add = this.add.bind(this);
    }
    async add(req,res,next){
        var paramData = {
            art_id:req.body.art_id,
            type:req.body.type,
            isLike:req.body.behavior
        }
        var findresult = await periodicalModel.findOne({id:paramData.art_id,type:paramData.type});
        if(findresult){
            if(paramData.isLike=="like"){
                findresult.fav_nums++;
                findresult.like_status = 1;
            }else {
                findresult.fav_nums--;
                findresult.like_status =0;
            }
        }
        var addresult =await periodicalModel.update({_id:findresult._id},findresult);
        res.send({
            success:true,
            msg:'操作成功'
        })
    }
    async list(req,res,next){
        var paramData = {
            id:req.body.art_id,
            type:req.body.type
        }
        var findresult = await periodicalModel.findOne({id:paramData.id,type:paramData.type});
        if(findresult){
            res.send({
                success:true,
                content:{
                    "fav_nums": findresult.fav_nums,
                    "id": findresult.id,
                    "like_status": findresult.like_status
                }
            })
        }else {
            res.send({
                success:false,
                msg:"获取失败！"
            })
        }

    }

}



module.exports =  new Like();