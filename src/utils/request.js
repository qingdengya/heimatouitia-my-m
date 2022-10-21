/**
 * 封装 axios 请求模块
 */
import axios from 'axios'
import store from '@/store';
import JSONBig from 'json-bigint'
// 设置网络请求跟地址
const request = axios.create({
  baseURL: ' http://toutiao.itheima.net ',//搜索文章不能用
  // baseURL: 'http://geek.itheima.net',//搜索不能用



  // 自定义后端返回的原始数据
  transformResponse: [function (data) {
    try {
      return JSONBig.parse(data)
    } catch (e) {
      return data
    }
    // 对接收的 data 进行任意转换处理
    // axios 默认回在内部这样处理后端返回的数据
    // return data;
  }]

})

// 请求拦截器
request.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // config  本次请求的配置对象
  // console.log(config);
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
