import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [

  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login')
  },
  {
    path: '/',
    // name: 'layout', 如果父亲有默认子路由  name就没有意义，可以省略
    component: () => import('@/views/layout'),
    children: [
      {
        path: '',
        redirect: "/home"
      },
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home'),
      },

      {
        path: '/my',
        name: 'my',
        component: () => import('@/views/my'),
      },
      {
        path: '/qa',
        name: 'qa',
        component: () => import('@/views/qa'),
      },
      {
        path: '/video',
        name: 'video',
        component: () => import('@/views/video'),
      },
    ]
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search'),
  },
  {
    path: '/article/:articleId', //需要传递文章id
    name: 'article',
    component: () => import('@/views/article'),
    // 开启 Props 传参，说白了就是把路由参数映射到组件的 props 数据中
    props: true
  },
  {
    path: '/Chat',
    name: 'Chat',
    component: () => import('@/views/Chat'),
  },
  {
    path: '/user/profile',
    name: 'user-profile',
    component: () => import('@/views/user-profile'),
  },
]

const router = new VueRouter({
  routes
})

export default router
