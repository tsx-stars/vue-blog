import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout'
import menuList from './menuList'

//push
const VueRouterPush = Router.prototype.push
Router.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch((err) => err)
}
//replace
const VueRouterReplace = Router.prototype.replace
Router.prototype.replace = function replace(to) {
  return VueRouterReplace.call(this, to).catch((err) => err)
}
Vue.use(Router)

const routes = [
  {
    path: '/',
    component: () => import('../views/index'),
    // redirect: '',
  },
  createRoute('404', { path: '*' }),
  createRoute('home'),
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

const router = new Router({
  mode: 'history',
  scrollBehavior: () => ({ x: 0, y: 0 }),
  routes,
})

router.beforeEach((to, from, next) => {
  next()
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
