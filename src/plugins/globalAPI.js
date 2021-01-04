//路由跳转
import Vue from 'vue'
import router from '../router'
import axios from 'axios'
import xhr from '@/utils/request'
import { jump } from '@/utils'

Vue.prototype.$jump = jump
Vue.prototype.$axios = axios
Vue.prototype.$xhr = xhr
Vue.prototype.baseURL = window.App.baseURL
