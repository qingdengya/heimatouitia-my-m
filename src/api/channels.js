/* 
频道请求模块
*/

import request from "@/utils/request"


/* 
获取所有频道列表
*/

export const getAllChannels = () => {
  return request({
    method: 'GET',
    url: "/v1_0/channels"
  })
}
/* 
设置用户的频道 
*/
export const setMyChannels = (channel) => {
  return request({
    method: 'PATCH',
    url: "/v1_0/user/channels",
    data: {
      channels: [channel]
    }
  })
}
/* 
删除用户的频道 
*/
export const delMyChannels = (target) => {
  return request({
    method: 'DELETE',
    url: ` /v1_0/user/channels/${target}`,

  })
}





