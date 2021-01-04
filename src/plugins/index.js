import Vue from 'vue'
import './appInfo'
import './globalAPI'
import './globalComponents'
import './hui'
import '../icons'

if (process.env.NODE_ENV === 'development') {
  require('../mock')
  window.vm = new Vue()
}
