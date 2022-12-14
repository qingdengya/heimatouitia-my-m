
import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage'
Vue.use(Vuex)
const TOKEN_KEY = 'TOUTIAO_USER'
const TOKEN_MSG = "MESSAGE";
export default new Vuex.Store({
  state: {
    // 一个对象，存储当前登录用户信息（token信息）

    // 从本地存储中取数据
    // user: JSON.parse(window.localStorage.getItem(TOKEN_KEY)) || null
    user: getItem(TOKEN_KEY),
    message: getItem(TOKEN_MSG) //聊天记录,
  },
  mutations: {
    // 修改数据的函数
    setUser(state, data) {
      state.user = data
      // 存入本地存储中  持久化保存
      setItem(TOKEN_KEY, data)
    },
    setMsg(state, data) {
      state.message = data;
      setItem(TOKEN_MSG, state.message);
    }
  },

})
