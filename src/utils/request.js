/**
 * 封装 axios 请求模块
 */
import axios from 'axios'

// 设置网络请求跟地址
const request = axios.create({
  baseURL: 'http://toutiao.itheima.net'
})

export default request
