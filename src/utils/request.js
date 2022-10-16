/**
 * 封装 axios 请求模块
 */
import axios from 'axios'
import store from '@/store';
// 设置网络请求跟地址
const request = axios.create({
  baseURL: ' http://toutiao.itheima.net '
})

// 请求拦截器
request.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // config  本次请求的配置对象
  console.log(config);
  // 拦截器去除空格处理
  config.baseURL = config.baseURL.trim()
  config.url = config.url.trim()


  // 统一设置请求头
  const { user } = store.state
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${store.state.user.token}`
  }

  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 响应拦截器


export default request
