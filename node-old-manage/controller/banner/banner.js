
var formidable = require("formidable")
var BaseComponent = require ('../../prototype/baseComponent')
var bannerModel = require("../../models/banner/banner");
class Banner extends  BaseComponent{
    constructor(){
        super()
        this.add = this.add.bind(this);
    }
    async add(req,res,next,paramData){
        const banner_id = await this.getId('banner_id');
        console.log(paramData)
        var bannerData = {
            name:req.body.name,
            url:req.body.url,
            id:banner_id
        }

        var findresult = await bannerModel.findOne({name:bannerData.name});
        if(findresult){
            res.send({
                success:false,
                msg:'该名称已存在'
            })
            return;
        }
        var addresult =   await bannerModel.create(bannerData);
            res.send({
                success:true,
                msg:'添加成功'
            })
    }
    async list(req,res,next){
        let page = req.body.page;
        let pageSize = req.body.pageSize;
        let skip = (page-1)*pageSize;
        var findresult = await bannerModel.find({}).skip(skip).limit(pageSize)
        var count = await bannerModel.count();
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
        var bannerData = {
            name:req.body.name,
            url:req.body.url
        }
        var result = await bannerModel.update({_id:req.body._id},bannerData);
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
        const banner_id = req.params.banner_id;
        var findresult = await bannerModel.remove({_id:banner_id});
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



module.exports =  new Banner();