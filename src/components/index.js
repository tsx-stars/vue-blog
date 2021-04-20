import Vue from 'vue'
/*import Dialog from './Dialog/index'
Vue.use(Dialog)*/

const context = require.context('./', false, /\.vue$/)

context.keys().forEach((key) => {
  const component = context(key).default
  Vue.component(component.name, component)
})
