import Vue from 'vue'
// 引入dayjs
import dayjs from "dayjs";
// dayjs 默认语音是英文   我们要配置为中文
import 'dayjs/locale/zh-cn' //加载中文语音包

import relativeTime from "dayjs/plugin/relativeTime"
// 配置使用相对处理相对时间的插件
dayjs.extend(relativeTime)
dayjs.locale('zh-cn')  //配置为全局使用



// dayjs() 获取当前时间
// console.log(dayjs().format("YYYY-MM-DD"));



// 定义一个全局过滤器  然后就可以在任何组件里面使用
// 参数1 过滤器名称
// 参数2  过滤器函数
// 使用方式{{表达式|过滤器}}
Vue.filter("relativeTime", value => {
  return dayjs().to(dayjs(value))
})