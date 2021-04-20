import Vue from 'vue'
import './appInfo'
import './globalAPI'
import './hui'
import './element'
import './f12'
import '../icons'
import '../components'

if (process.env.NODE_ENV === 'development') {
  require('../mock')
  window.vm = new Vue()
}
