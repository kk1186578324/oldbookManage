
var formidable = require("formidable")
var BaseComponent = require ('../../prototype/baseComponent')
var booksModel = require("../../models/books/books");
class Like extends  BaseComponent{
    constructor(){
        super()
        this.add = this.add.bind(this);
    }
    /**
     *书籍评论
     * @param
     * @param
     */
    async add(req,res,next){
        var paramData = {
            art_id:req.body.art_id,
            userId:req.body.userId,
            content:req.body.content
        }
        var findresult = await booksModel.findOne({id:paramData.art_id});
        if(findresult){
            findresult.comment.push(paramData)
        }
        var addresult =await booksModel.update({_id:findresult._id},findresult);
        res.send({
            success:true,
            msg:'操作成功'
        })
    }
}



module.exports =  new Like();