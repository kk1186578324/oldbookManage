import express from  'express'
// import Bannar from '../controller/banner/banner'
const router  = express.router();
const baseHandle = new BaseComponent();

router.post("/addImg:type",baseHandle.uploadImg)