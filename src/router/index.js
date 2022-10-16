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
  }
]

const router = new VueRouter({
  routes
})

export default router
