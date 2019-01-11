
var formidable = require("formidable")
var commentModel = require("../../models/comment/comment");
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
        var result = await commentModel.create(paramData);
        if(result){
            res.send({
                success:true,
                msg:'操作成功'
            })
        }

    }
}



module.exports =  new Comment();