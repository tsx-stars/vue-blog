import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/common.scss'
import './plugins'
import * as filters from './filters'

Vue.config.productionTip = false
// Vue.config.devtools = true
//引入饿了么组件
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

import hui from 'h_ui'
import 'h_ui/dist/h_ui.min.css' // 使用 CSS
Vue.use(hui)

// require('./mock/index')

// register global utility filters
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key])
})

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
