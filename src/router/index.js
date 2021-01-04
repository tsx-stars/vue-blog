import Vue from 'vue'
import VueRouter from 'vue-router'
import settings from '@/settings'
import { getQueryStr, toLogin, userCenterLogout } from '@/utils'
import Layout from '@/layout'
import menuList from './menuList'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/operate',
  },
  createRoute('404', { path: '*' }),
  createRoute('login'),
  ...menuList.map(({ name, children }) => ({
    name,
    path: `/${name}`,
    component: Layout,
    redirect: `/${name}/${children[0].name}`,
    children: children.map(({ name: name2 }) =>
      createRoute(`${name}/${name2}`)
    ),
  })),
]

if (process.env.NODE_ENV === 'development') {
  routes.push(createRoute('icons'))
  routes.push(createRoute('401'))
  routes.push(createRoute('test'))
}

const router = new VueRouter({
  mode: 'history',
  base: settings.publicPath,
  scrollBehavior: () => ({ x: 0, y: 0 }),
  routes,
})

router.beforeEach((to, from, next) => {
  next()
  /*let { ticket } = getQueryStr()
  if (ticket) {
    next()
  } else {
    $.getScript(window.App.userCenter + '/CASLoginAPI.do', function (e) {
      //用户中心未登录
      if (!window.CASLoginResEntity?.loginFlag) {
        toLogin()
      }
      //自己未登录
      else if (!sessionStorage.getItem('token')) {
        userCenterLogout()
      } else {
        next()
      }
    })
  }*/
})

export default router

function createRoute(path, config) {
  let tmpArr = path.split('/')
  let name = tmpArr[tmpArr.length - 1]
  let pathBefore = path.includes('/') ? '' : '/'
  return {
    path: pathBefore + name,
    name,
    component: (resolve) => require([`@/views/${path}`], resolve),
    ...config,
  }
}
