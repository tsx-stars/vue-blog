import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import xhr from './utils/request'

Vue.config.productionTip = false
Vue.config.devtools = true

//引入饿了么组件
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

// require('./mock/index')

//路由跳转
Vue.prototype.$jump = (name, query) => {
  router.push({
    name,
    query,
  })
}
Vue.prototype.$xhr = xhr

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
