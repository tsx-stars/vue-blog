import Vue from 'vue'
import SvgIcon from './SvgIcon' // svg component
// register globally
Vue.component('svg-icon', SvgIcon)

const files = require.context('./svg', false, /\.svg$/)
files.keys().map(files)

const multicolorSvg = require.context('./multicolorSvg', false, /\.svg$/)
multicolorSvg.keys().map(multicolorSvg)
