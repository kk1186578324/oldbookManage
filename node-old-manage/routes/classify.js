import express from  'express'
import Bannar from '../controller/banner/banner'
import Classify from '../controller/classify/classify'
const router  = express.Router();
router.post("/add",Classify.add)
router.post("/update",Classify.update)
router.post("/delete",Classify.delete)

export default router;
