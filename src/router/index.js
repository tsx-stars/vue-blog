import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import('../views/index')
  },
  {
    path: '/home',
    name: 'home',
    redirect: '/home/stars01',
    component: () => import('../views/home'),
    children: [
      {
        path: 'stars01',
        name: 'stars01',
        component: () => import('../views/stars/stars01')
      },
      {
        path: 'stars02',
        name: 'stars02',
        component: () => import('../views/stars/stars02')
      },
      {
        path: 'dangpi01',
        name: 'dangpi01',
        component: () => import('../views/dangpi/dangpi01')
      },
      {
        path: 'dangpi02',
        name: 'dangpi02',
        component: () => import('../views/dangpi/dangpi02')
      },
      {
        path: 'side03',
        name: 'side03',
        component: () => import('../views/side03')
      },
      {
        path: 'userInfo',
        name: 'userInfo',
        component: () => import('../views/user/userInfo')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
