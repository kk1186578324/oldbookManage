
var formidable = require("formidable")
var booksModel = require("../../models/books/books");
class Comment {
    constructor(){

        this.add = this.add.bind(this);
    }
    /**
     *书籍评论
     * @param
     * @param
     */
    async add(req,res,next){
        var paramData = {
            id:req.body.book_id,
            userId:req.body.userId,
            content:req.body.content
        }
        console.log(paramData)
        var findresult = await booksModel.findOne({id:paramData.id});

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



module.exports =  new Comment();