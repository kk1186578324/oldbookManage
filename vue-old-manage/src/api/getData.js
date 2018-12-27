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
 *上传图片
 * @param
 * @param
 */
export const  uploadImg = imgData => fetch('/upload/addImg',imgData, 'POST');
/**
 *添加banner
 * @param
 * @param
 */
export const  addBanner = bannerData => fetch('/banner/add',bannerData, 'POST');


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
 *删除banner
 * @param
 * @param
 */
export const  deleteBanner = banner_id => fetch('/banner/del/' + banner_id, {}, 'DELETE');

/**
 *添加书本信息
 * @param
 * @param
 */
export const  addBooks= bannerData => fetch('/books/add',bannerData, 'POST');


/**
 *获取书本信息
 * @param
 * @param
 */
export const listBooks = data => fetch('/books/list', data, 'POST');


/**
 * 编辑书本信息
 *
 */
export const  updateBooks = data => fetch('/books/update',data, 'POST');

/**
 *删除编辑书本信息
 * @param
 * @param
 */
export const  deleteBooks = books_id => fetch('/books/del/' + books_id, {}, 'DELETE');



/**
 *添加期刊信息
 * @param
 * @param
 */
export const  addPeriodical= bannerData => fetch('/periodical/add',bannerData, 'POST');


/**
 *获取期刊信息
 * @param
 * @param
 */
export const listPeriodical = data => fetch('/periodical/list', data, 'POST');


/**
 * 编辑期刊信息
 *
 */
export const  updatePeriodical = data => fetch('/periodical/update',data, 'POST');

/**
 *删除期刊信息
 * @param
 * @param
 */
export const  deletePeriodical = books_id => fetch('/periodical/del/' + books_id, {}, 'DELETE');
