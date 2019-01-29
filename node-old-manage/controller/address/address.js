
var formidable = require("formidable")
var BaseComponent = require ('../../prototype/baseComponent')
var addressModel = require("../../models/address/address");
class Address extends  BaseComponent{
    constructor(){
        super()
        this.add = this.add.bind(this);
    }
    async add(req,res,next){
        const address_id = await this.getId('address_id');
        var user_id =req.get("Authorization");
        console.log(req.body.address)
        var addressData = {
            "id" :address_id,
            "address" : req.body.address,
            "phone" : req.body.phone,
            "name" :req.body.name,
            "address_detail" : req.body.address_detail,
            "user_id" :user_id,
            "isDefult" : req.body.isDefult
        }

        if(req.body.isDefult){
            await addressModel.updateMany(
                {"isDefult":true},
                {$set:{
                 "isDefult":false
            }})
        }

        if(req.body._id){
            await addressModel.update({_id:req.body._id},addressData);
        }else{
            await addressModel.create(addressData);
        }
        res.send({
            success:true,
            msg:'添加成功'
        })
    }
    async list(req,res,next){
        var user_id =req.get("Authorization");
        let page = req.body.page;
        let pageSize = req.body.pageSize;
        let skip = (page-1)*pageSize;
        var findresult = await addressModel.find({user_id}).skip(skip).limit(pageSize)
        var count = await addressModel.count();
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
        const _id = req.body.id;
        var findresult = await addressModel.remove({_id});
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



module.exports =  new Address();