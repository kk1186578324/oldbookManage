
var formidable = require("formidable")
var commentModel = require("../../models/comment/comment");
var BaseComponent = require ('../../prototype/baseComponent')
class Comment extends BaseComponent{
    constructor(){
          super();
        this.add = this.add.bind(this);
    }
    /**
     *书籍评论
     * @param
     * @param
     */
    async add(req,res,next){
        var UserId =req.get("Authorization");
        const id = await this.getId('comment_id');
        var paramData = {
            id,
            bookId:req.body.book_id,
            userId:UserId,
            content:req.body.content
        }
        console.log(paramData)
        var result = await commentModel.create(paramData);
        if(result){
            res.send({
                success:true,
                msg:'操作成功'
            })
        }

    }
    async list(req,res,next){
        var paramData = {
            bookId:req.body.book_id,
        }
        console.log(paramData)
        var result = await commentModel.find(paramData);
        if(result){
            res.send({
                success:true,
                content:result
            })
        }

    }
}



module.exports =  new Comment();