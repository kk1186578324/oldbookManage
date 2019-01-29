
var formidable = require("formidable")
var BaseComponent = require ('../../prototype/baseComponent')
var periodicalModel = require("../../models/periodical/periodical");
var booksModel = require("../../models/books/books");
var likeModel = require("../../models/like/like");
class Like extends  BaseComponent{
    constructor(){
        super()
        this.add = this.add.bind(this);
        this.book = this.book.bind(this);
    }
    /**
     *期刊喜欢
     * @param
     * @param
     */
    async add(req,res,next){
        const like_id = await this.getId('like_id');
        var userId =req.get("Authorization");
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
        //查找并更新like状态

        var addresult =await periodicalModel.update({_id:findresult._id},findresult);
        var likeData ={
            "userId":userId,
            "art_id":req.body.art_id,
            "id":like_id,
            "fav_nums":findresult.fav_nums,
            "image":findresult.image,
            "index":findresult.index,
            "like_status":findresult.like_status,
            "pubdate":findresult.pubdate,
            "title":findresult.title,
            "type":findresult.type,
            "url":findresult.url,
        }
        var result = await likeModel.findOne({userId,art_id:req.body.art_id});

         if(result){
             await likeModel.update(
                 {userId,art_id:req.body.art_id},
                 {$set:{
                 "fav_nums": findresult.fav_nums,
                 "like_status":findresult.like_status
             }})
         }else{
           await likeModel.create(likeData);
         }
         res.send({
                success:true,
                msg:'操作成功'
            })

    }
    async list(req,res,next){
        var userId =req.get("Authorization");
        var paramData = {
            id:req.body.art_id,
            type:req.body.type
        }

        var likeResult = await likeModel.findOne({userId,art_id:paramData.id});
        var findresult = await periodicalModel.findOne(paramData);
        if(likeResult){
            res.send({
                success:true,
                content:{
                    "fav_nums": likeResult.fav_nums,
                    "like_status": likeResult.like_status
                }
            })
        }else{
            res.send({
                success:true,
                content:{
                    "fav_nums": findresult.fav_nums,
                    "like_status": 0
                }
            })
        }

    }

    async allList(req,res,next){

        var userId =req.get("Authorization");
        var paramData = {
            userId
        }

        var likeResult = await likeModel.find(paramData);
        if(likeResult){
            res.send({
                success:true,
                content:likeResult
            })
        }


    }

    /**
     * 书籍喜欢
     * @param
     * @param
     */

    async book(req,res,next){
        const like_id = await this.getId('like_id');
        var userId =req.get("Authorization");
        var paramData = {
            art_id:req.body.art_id,
            isLike:req.body.behavior
        }
        var findresult = await booksModel.findOne({id:paramData.art_id});
        if(findresult){
            if(paramData.isLike=="like"){
                findresult.fav_nums++;
                findresult.like_status = 1;
            }else {
                findresult.fav_nums--;
                findresult.like_status =0;
            }
        }
        //查找并更新like状态

        var addresult =await booksModel.update({_id:findresult._id},findresult);
        var likeData ={
            "userId":userId,
            "art_id":req.body.art_id,
            "id":like_id,
            "title":findresult.title,
            "author":findresult.author,
            "fav_nums":findresult.fav_nums,
            "like_status":findresult.like_status,
            "price":findresult.price,
            "score":findresult.score,
            "classify":findresult.classify,
            "image":findresult.image,
            "pubdate":findresult.pubdate,
            "validity":findresult.validity
        }
        var result = await likeModel.findOne({userId,art_id:req.body.art_id});

        if(result){
            await likeModel.update(
                {userId,art_id:req.body.art_id},
                {$set:{
                        "fav_nums": findresult.fav_nums,
                        "like_status":findresult.like_status

                    }})
        }else{
            await likeModel.create(likeData);
        }
        res.send({
            success:true,
            msg:'操作成功'
        })
    }

    async bookList(req,res,next){
        var paramData = {
            id:req.body.art_id,
        }
        var findresult = await booksModel.findOne({id:paramData.id});
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