import fetch from '@/config/fetch'

/**
 * 添加分类
 */

export const addClassify = data => fetch('/classify/add', data, 'POST');

export const listClassify = data => fetch('/classify/list', data, 'POST');

/**
 * 退出
 */


