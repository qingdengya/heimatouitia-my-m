import request from '@/utils/request'



// 获取频道列表
export const getUserChannels = () => {
  return request({
    method: 'GET',
    url: `/v1_0/user/channels`
  })
}



