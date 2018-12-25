
import axios from "axios"
/**
 * 获取登录信息
 */

export const addClassify = (param) => axios.post('/classify/add', param, {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
	return res.data;
});



