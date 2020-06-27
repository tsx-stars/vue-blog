import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

//引入饿了么组件
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

Vue.prototype.$jump = (name, query) => {
  router.push({
    name,
    query
  })
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
