import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 导入styles/index.less
import '@/styles/index.less'
// 导入vant组件
import '@/plugins'
// 导入 lib-flexible
import 'lib-flexible'
// 加载dayjs 初始化配置
import "@/utils/dayjs"
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
