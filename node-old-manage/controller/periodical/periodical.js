
var formidable = require("formidable")
var BaseComponent = require ('../../prototype/baseComponent')
var periodicalModel = require("../../models/periodical/periodical");
class Periodical extends  BaseComponent{
    constructor(){
        super()
        this.add = this.add.bind(this);
    }
    async add(req,res,next){
        const periodical_id = await this.getId('periodical_id');
        var booksData = {
            content:req.body.content,
            fav_nums:req.body.fav_nums,
            image:req.body.image,
            index:req.body.index,
            like_status:req.body.like_status,
            pubdate:req.body.pubdate,
            title:req.body.title,
            type:req.body.type,
            id:periodical_id
        }

        var findresult = await periodicalModel.findOne({title:booksData.title});
        if(findresult){
            res.send({
                success:false,
                msg:'该名称已存在'
            })
            return;
        }
        var addresult =   await periodicalModel.create(booksData);
        res.send({
            success:true,
            msg:'添加成功'
        })
    }
    async list(req,res,next){
        let page = req.body.page||1;
        let pageSize = req.body.pageSize||10;
        let skip = (page-1)*pageSize;
        var findresult = await periodicalModel.find({}).sort({pubdate:1}).skip(skip).limit(pageSize)
        var count = await periodicalModel.count();
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
        var booksData = {
            content:req.body.content,
            fav_nums:req.body.fav_nums,
            image:req.body.image,
            index:req.body.index,
            like_status:req.body.like_status,
            pubdate:req.body.pubdate,
            title:req.body.title,
            type:req.body.type,
        }
        var result = await periodicalModel.update({_id:req.body._id},booksData);
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
        const _id = req.params.books_id;
        var findresult = await periodicalModel.remove({_id});
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



module.exports =  new Periodical();