/* 
文章请求模块

*/

import request from "@/utils/request";

// 获取文章列表
export const getAeticleList = (params) => {
  return request({
    method: 'GET',
    url: `/v1_0/articles`,
    params
  })
}


// 获取文章详情
export const getAeticleById = (article_id) => {
  return request({
    method: 'GET',
    url: ` /v1_0/articles/${article_id}`,
  })
}


// 收藏文章
export const addCollect = (target) => {
  return request({
    method: 'POST',
    url: `/v1_0/article/collections`,
    data: {
      target
    }
  })
}
// 取消收藏
export const clearCollect = (target) => {
  return request({
    method: 'DELETE',
    url: `/v1_0/article/collections/${target}`,
  })
}
