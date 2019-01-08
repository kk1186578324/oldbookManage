
var formidable = require("formidable")
var BaseComponent = require ('../../prototype/baseComponent')
var booksModel = require("../../models/books/books");
class Books extends  BaseComponent{
    constructor(){
        super()
        this.add = this.add.bind(this);
    }
    async add(req,res,next){
        const books_id = await this.getId('books_id');
        var booksData = {
            title:req.body.title,
            author:req.body.author,
            fav_nums:req.body.fav_nums,
            like_status:req.body.like_status,
            price:req.body.price,
            score:req.body.score,
            image:req.body.image,
            classify:req.body.classify,
            pubdate:req.body.pubdate,
            validity:req.body.validity,
            id:books_id
        }
        var findresult = await booksModel.findOne({title:booksData.title});
        if(findresult){
            res.send({
                success:false,
                msg:'该名称已存在'
            })
            return;
        }
        var addresult =   await booksModel.create(booksData);
        res.send({
            success:true,
            msg:'添加成功'
        })
    }
    async list(req,res,next){
        let page = req.body.page||1;
        let pageSize = req.body.pageSize||10;
        let skip = (page-1)*pageSize;
        var findresult = await booksModel.find({}).skip(skip).limit(pageSize)
        var count = await booksModel.count();
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
            title:req.body.title,
            author:req.body.author,
            fav_nums:req.body.fav_nums,
            like_status:req.body.like_status,
            price:req.body.price,
            score:req.body.score,
            image:req.body.image,
            validity:req.body.validity,
            pubdate:req.body.pubdate,
            classify:req.body.classify
        }
        var result = await booksModel.update({_id:req.body._id},booksData);
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
        var findresult = await booksModel.remove({_id});
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
    /**
     *获取书籍详情
     * @param
     * @param
     */
    async detail(req,res,next){
        const id = req.params.books_id;
        console.log(id)
        var findresult = await booksModel.findOne({id});

        if(findresult){
            res.send({
                success:true,
                content:findresult,
            })
        }else {
            res.send({
                success:false,
                msg:'获取失败'
            })
        }
    }
    /**
     *搜索书籍
     * @param
     * @param
     */
    async search(req,res,next){
        let booksData = {}
        booksData.title = new RegExp(req.body.bookName);

        var findresult = await booksModel.find(booksData);

        if(findresult){
            res.send({
                success:true,
                content:findresult,
            })
        }else {
            res.send({
                success:false,
                msg:'获取失败'
            })
        }
    }


}



module.exports =  new Books();