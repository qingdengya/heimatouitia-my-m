
// 用户相关请求模块

// 导入axios
import request from '@/utils/request'
// import store from '@/store'
export const login = (data) => {
  return request({
    method: 'POST',
    url: '/v1_0/authorizations',
    data
  })
}
export const sendSms = (mobile) => {
  return request({
    method: 'GET',
    url: `/v1_0/sms/codes/${mobile}`
  })
}


// 获取用户信息
export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: ` /v1_0/user `
    // // 请求头
    // headers: {
    //   Authorization: `Bearer ${store.state.user.token}`
    // }
  })
}


// 取消用户关注
export const cancelfollowed = (target) => {
  return request({
    method: 'DELETE',
    url: `/v1_0/user/followings/${target}`,
  })
}

// 添加用户关注
export const addfollowed = (target) => {
  return request({
    method: 'POST',
    url: `/v1_0/user/followings`,
    data: {
      target
    }
  })
}


// 获取当前登录的个人资料
export const getUserProfile = () => {
  return request({
    method: 'GET',
    url: `/v1_0/user/profile`,

  })
}


// 更新用户个人资料
export const updateUserProfile = (data) => {
  return request({
    method: 'PATCH',
    url: `/v1_0/user/profile`,
    data

  })
}

// 更新用户照片资料
export const updateUserPhoto = (data) => {
  return request({
    method: 'PATCH',
    url: `/v1_0/user/photo`,
    data
  })
}
