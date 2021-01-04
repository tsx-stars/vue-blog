import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

Vue.use(Vuex)
const files = require.context('./modules', false, /\.js$/)
const modules = {}

files.keys().forEach((key) => {
  modules[key.replace(/(\.\/|\.js)/g, '')] = files(key).default
})
Object.keys(modules).forEach((key) => {
  modules[key]['namespaced'] = true
})
const store = new Vuex.Store({
  modules,
  getters,
  state: {
    imgBox: false, //查看图片
    imgUrl: '', //图片地址
  },
  mutations: {
    //打开图片弹窗
    openImgBox: (state, imgUrl = '') => {
      state.imgUrl = imgUrl
      state.imgBox = true
    },
    //关闭图片弹窗
    closeImgBox: (state) => {
      state.imgUrl = ''
      state.imgBox = false
    },
  },
})
export default store
