
var formidable = require("formidable")
var BaseComponent = require ('../../prototype/baseComponent')
var booksModel = require("../../models/books/books");
var cartModel = require("../../models/cart/cart");
class Cart extends  BaseComponent{
    constructor(){
        super()
        this.add = this.add.bind(this);

    }

    /**
     * 购物车
     * @param
     * @param
     */

    async add(req,res,next){
        const cart_id = await this.getId('cart_id');
        var userId =req.get("Authorization");
        var paramData = {
            book_id:req.body.book_id
        }
        var findresult = await booksModel.findOne({id:paramData.book_id});
        var cartData ={
            "userId":userId,
            "book_id":req.body.book_id,
            "id":cart_id,
            "title":findresult.title,
            "author":findresult.author,
            "fav_nums":findresult.fav_nums,
            "like_status":findresult.like_status,
            "price":findresult.price,
            "score":findresult.score,
            "classify":findresult.classify,
            "image":findresult.image,
            "pubdate":findresult.pubdate,
            "validity":findresult.validity,
            "count":1,
            "allPrice":+findresult.price*1,
            "isChecked":true
        }
        var result = await cartModel.findOne({userId,book_id:req.body.book_id});

        if(result){
          await cartModel.update(
                {userId,book_id:req.body.book_id},
                {$set:{
                        "count": ++result.count,
                        "allPrice":(+result.allPrice)+ (+result.price)
                    }})

            res.send({
                success:true,
                content:result.count
            })
        }else{
         var addResult=await cartModel.create(cartData);

         if(addResult){
             res.send({
                 success:true,
                 content:1
             })
         }else{
             res.send({
                 success:false,
                 msg:"添加失败！"
             })
         }

        }

    }
    //查询单条数据购物信息

    async getOneBook(req,res,next){


        var userId =req.get("Authorization");
        console.log(userId,"userId")
        var paramData = {
            book_id:req.body.book_id
        }

        var result = await cartModel.findOne({userId,book_id:req.body.book_id});
        if(result){
            res.send({
                success:true,
                content:result.count
            })
        }else {
            res.send({
                success:false,
                msg:"获取失败！"
            })
        }

    }

    async list(req,res,next){
        var userId =req.get("Authorization");
        var findresult = await cartModel.find({userId});
        if(findresult){
            res.send({
                success:true,
                content:findresult
            })
        }else {
            res.send({
                success:false,
                msg:"获取失败！"
            })
        }

    }

    async update(req,res,next){

        var cartsData = req.body.carts;
        var result =  await cartModel.update({_id:cartsData._id},cartsData)
        if(result){
            res.send({
                success:true,
                msg:"编辑成功！"
            })
        }else {
            res.send({
                success:false,
                msg:"获取失败！"
            })
        }
    }

    async delete(req,res,next){
        const _id = req.body.id;
        console.log(_id)
        var findresult = await cartModel.remove({_id});
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



module.exports =  new Cart();