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




