import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import xhr from './utils/request'
import './icons'

Vue.config.productionTip = false
Vue.config.devtools = true

window.app = {
  name: process.env.VUE_APP_NAME,
  version: process.env.VUE_APP_VERSION,
  update_time: process.env.VUE_APP_UPDATE_TIME,
  author: process.env.VUE_APP_AUTHOR,
  email: process.env.VUE_APP_EMAIL,
}
import './styles/common.scss'

//引入饿了么组件
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

import hui from 'h_ui'
import 'h_ui/dist/h_ui.min.css' // 使用 CSS
Vue.use(hui)

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
