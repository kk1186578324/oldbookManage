import fetch from '@/config/fetch'

/**
 * 添加分类
 */

export const addClassify = data => fetch('/classify/add', data, 'POST');
/**
 *获取分类
 * @param
 * @param
 */
export const listClassify = data => fetch('/classify/list', data, 'POST');
/**
 *删除分类
 * @param
 * @param
 */
export const  deleteClassify = classify_id => fetch('/classify/del/' + classify_id, {}, 'DELETE');

/**
 * 编辑分类
 *
 */
export const  updateClassify = classifyData => fetch('/classify/update',classifyData, 'POST');

/**
 *添加banner图
 * @param
 * @param
 */
export const  addBanner = bannerData => fetch('/banner/add',bannerData, 'POST');
/**
 *上传图片
 * @param
 * @param
 */
export const  uploadImg = imgData => fetch('/upload/addImg',imgData, 'POST');

/**
 *获取banner
 * @param
 * @param
 */
export const listBanner = data => fetch('/banner/list', data, 'POST');


/**
 * 编辑banner
 *
 */
export const  updateBanner = data => fetch('/banner/update',data, 'POST');

/**
 *删除分类
 * @param
 * @param
 */
export const  deleteBanner = banner_id => fetch('/banner/del/' + banner_id, {}, 'DELETE');
