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

// 引入 aip网络请求模块

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
