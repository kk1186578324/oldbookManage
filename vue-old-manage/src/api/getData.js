import fetch from '@/config/fetch'

/**
 * 登陆
 */

export const addClassify = data => fetch('/classify/add', data, 'POST');



/**
 * 退出
 */


