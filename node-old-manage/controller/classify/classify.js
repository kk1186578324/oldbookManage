
var formidable = require("formidable")
var classifyModel = require("../../models/classify/classify");
class Classify{
    constructor(){

	}
    async add(req,res,next){
        const form  = new formidable.IncomingForm()
        form.parse(req,async (err,fields,files)=>{
              console.log(fields)
            if(err){
                res.send({
                    status:0,
                    message:'表单信息错误'
                })
                return
            }

            const classifyData = {name,recommend} = fields;

            await classifyModel.create(classifyData);

            res.send({
                status: 1,
                success: '添加成功',
            })


        })

    }

    update(){

    }
    delete(){

    }



}



module.exports =  new Classify();