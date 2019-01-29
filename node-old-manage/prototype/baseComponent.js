;

var formidable  = require('formidable');
var path  = require('path');
var fs  = require('fs');
var gm = require('gm')
var Ids = require('../models/ids')
 class BaseComponent{

    constructor(){
        this.idList = ['classify_id','img_id','banner_id','books_id','periodical_id','like_id','comment_id','cart_id','address_id']
        this.uploadImg = this.uploadImg.bind(this);
        this.getPath = this.getPath.bind(this);
        this.getId = this.getId.bind(this);
    }

    //获取id列表
    async getId(type) {
        if (!this.idList.includes(type)) {
            console.log('id类型错误');
            throw new Error('id类型错误');
            return
        }
        try {
            const idData = await Ids.findOne();
            console.log(idData)
            idData[type]++;
            await idData.save();
            return idData[type]
        } catch (err) {
            console.log('获取ID数据失败');
            throw new Error(err)
        }
    }

    async uploadImg(req,res,next){
       const type = req.params.type;
       try{
           const image_path = await this.getPath(req,res);
           res.send({
               success:true,
               image_path
           })
       }catch(err){
           res.send({
               success:false,
               msg:'上传图片失败'
           })
       }

    }
    async getPath(req,res){
        return new Promise((resolve,reject)=>{
            const form  = formidable.IncomingForm();
            form.uploadDir = './public/img';
            form.parse(req, async(err,fields,files)=>{
                    let img_id;

                 try{
                     img_id = await this.getId('img_id');
                 }catch(err){
                     fs.unlinkSync(files.file.path);
                     reject('获取图片id失败')

                 }
                const hashName = (new Date().getTime() + Math.ceil(Math.random()*10000)).toString(16) + img_id;
                const extname = path.extname(files.file.name);
                console.log(extname)

                if(!['.jpg','.jpeg','.png'].includes(extname)){

                    fs.unlinkSync(files.file.path)
                    res.send({
                        success: false,
                        message: '文件格式错误'
                    })
                    reject('上传失败');
                    return
                }
                const fullName = hashName+extname;
                const repath = './public/img/'+fullName;
                try{
                    fs.renameSync(files.file.path,repath);
                    gm(repath).resize(200,200,"!").write(repath,async(err)=>{

                        resolve(fullName)
                    })


                }catch(err){
                    console.log('保存图片失败', err);
                     if(fs.existsSync(repath)){
                           fs.unlinkSync(repath);
                     }else {
                         fs.unlinkSync(files.file.path);
                     }
                    reject('保存图片失败')
                }




            })


        })



    }



}
module.exports = BaseComponent

