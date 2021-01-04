import Vue from 'vue'
const files = require.context('../components', true, /\.vue|\.js$/)

files.keys().forEach((key) => {
  Vue.component(
    key.replace(/(\.\/(.+\/)?|\.vue|\.js)/g, ''),
    files(key).default
  )
})
