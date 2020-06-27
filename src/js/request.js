import axios from 'axios'
import Vue from 'vue'
import qs from 'qs'
import router from '../router'
let _this = new Vue()
window.baseURL =
  process.env.NODE_ENV === 'development'
    ? '/dev'
    : window.baseURL || window.location.origin

//初始化axios
const service = axios.create({
  baseURL: window.baseURL,
  timeout:
    process.env.NODE_ENV == 'development' ? 60000 : window.timeout || 10000
})

//请求拦截器
service.interceptors.request.use(
  request => {
    request.headers['Authorization'] = localStorage.getItem('userToken')
    if (request.config.formDate) {
      request.headers[
        'Content-Type'
      ] = `application/x-www-form-urlencoded;charset=UTF-8`
      request.data = qs.stringify(request.data)
    }
    return request
  },
  error => {
    return Promise.reject(error)
  }
)

//响应拦截器
service.interceptors.response.use(
  response => {
    let {
      status,
      data,
      config: { config }
    } = response
    const { code, msg } = data
    if (status !== 200) {
      !config.noTip && _this.$message.error(`接口${status}异常`)
      return Promise.reject(response)
    } else if (code && code == '90006') {
      return data
    } else if (code && code != '100') {
      !config.noTip && _this.$message.error(msg || '未知异常')
      return Promise.reject(data)
    } else {
      return data
    }
  },
  error => {
    /*网络连接过程异常处理*/
    let {
      message,
      config: { config }
    } = error
    console.log(message)
    if (message == 'Network Error') message = '网络错误'
    if (message.includes('timeout')) message = '接口请求超时'
    if (message.includes('401')) {
      message = '登录信息失效，请重新登录！'
      router.push('/login')
    } else message.includes('Request failed with status code')
    message =
      '接口' + message.substr(message.length - 3) + '异常' + !config.noTip &&
      _this.$message.error(message || '接口未知异常')
    return Promise.reject({
      error_info: message
    })
  }
)

//请求方法
export default function(url, method, params, config = {}) {
  let data = method.toLocaleLowerCase() === 'get' ? 'params' : 'data'
  return service({
    method,
    url,
    [data]: params,
    config,
    withCredentials: config.formDate
  })
    .then(res => {
      return Promise.resolve(res)
    })
    .catch(err => {
      return Promise.reject(err)
    })
}
