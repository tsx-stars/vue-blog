import axios from 'axios'
import Vue from 'vue'
import qs from 'qs'
import router from '../router'
import settings from '@/settings'
const { proxy } = settings
let _this = new Vue()

//初始化axios
const service = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? proxy : '/',
  timeout:
    process.env.NODE_ENV === 'development'
      ? 60000
      : window.App.timeout || 20000,
})

//请求拦截器
service.interceptors.request.use(
  (request) => {
    request.token && (request.headers.token = sessionStorage.getItem('token'))
    if (request.formDate) {
      request.headers[
        'Content-Type'
      ] = `application/x-www-form-urlencoded;charset=UTF-8`
      request.data = qs.stringify(request.data)
    }
    return request
  },
  (error) => {
    return Promise.reject(error)
  }
)

//响应拦截器
service.interceptors.response.use(
  (response) => {
    let { status, data, config } = response
    if (status !== 200) {
      config.tips && _this.$hMessage.error(`接口${status}异常`)
      return Promise.reject(response)
    }
    if (response.request.responseType === 'blob') {
      download(response)
      return
    }
    const { errcode, obj, errmsg } = data || {}
    if (!errcode) {
      return data || {}
    }
    config.tips && _this.$hMessage.error(obj || errmsg || '未知异常')
    return Promise.reject(data)
  },
  (error) => {
    /*网络连接过程异常处理*/
    let { message, config } = error
    if (message.includes('401')) {
      message = '登录信息失效，请重新登录！'
      sessionStorage.clear()
      router.replace({
        path: '/login',
      })
    }
    if (message == 'Network Error') message = '网络错误'
    if (message.includes('timeout')) message = '接口请求超时'
    if (message.includes('Request failed with status code')) {
      message = '接口' + message.substr(message.length - 3) + '异常'
    }
    config.tips && _this.$hMessage.error(message || '接口未知异常')
    return Promise.reject({
      error_info: message,
    })
  }
)

// 下载文件
function download(res) {
  if (
    res.data.type !== 'application/json' ||
    res.headers['content-disposition'].includes('.xls')
  ) {
    /*if (!res.data.size) {
      _this.$hMessage.error('文件不存在')
      return
    }*/
    // let blob = new Blob([res.data], {type: 'application/vnd.ms-excel;charset=utf-8'})
    let href = URL.createObjectURL(res.data)
    let a = document.createElement('a')
    a.href = href
    let title = res.headers['content-disposition']
    a.download = decodeURIComponent(title.split('=')[1])
    // a.download = unescape(decodeURI((title).split('=')[1]))
    a.click()
    a = null
    URL.revokeObjectURL(href)
  } else {
    let reader = new FileReader()
    /*reader.addEventListener("loadend", function() {
        console.log(JSON.parse(reader.result));
    });*/
    reader.onload = (e) => {
      let data = JSON.parse(e.target.result)
      _this.$hMessage.error(data.obj || data.errmsg || '未知异常')
    }
    reader.readAsText(res.data, ['utf-8'])
  }
}

let xhr = (
  url,
  method = 'get',
  params,
  {
    tips = true, //错误弹提示
    token = true, //带请求头
    withCredentials = true, //带会话
    ...config
  } = {}
  //responseType:'blob' //下载
) => {
  let data = method.toLocaleLowerCase() === 'get' ? 'params' : 'data'
  return service({
    method,
    url,
    [data]: params,
    tips,
    token,
    withCredentials,
    ...config,
    // withCredentials: config.withCredentials || config.formDate,
  })
}
xhr.get = (url, ...values) => xhr(url, 'get', ...values)
xhr.post = (url, ...values) => xhr(url, 'post', ...values)
xhr.download = (url, params, config) =>
  xhr(url, 'get', params, { responseType: 'blob', ...config })
//请求方法
export default xhr
