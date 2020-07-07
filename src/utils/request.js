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
    process.env.NODE_ENV == 'development' ? 60000 : window.timeout || 10000,
})

//请求拦截器
service.interceptors.request.use(
  (request) => {
    request.headers['Authorization'] = localStorage.getItem('userToken')
    if (request.config.formDate) {
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
    let {
      status,
      data,
      config: { config },
    } = response
    if (status !== 200) {
      !config.noTip && _this?.$message.error(`接口${status}异常`)
      return Promise.reject(response)
    }
    if (response.request.responseType === 'blob') {
      download(response)
      return
    }
    const { resultCode, message } = data
    if (resultCode) {
      !config.noTip && _this?.$message.error(message || '未知异常')
      return Promise.reject(data)
    } else {
      return data
    }
  },
  (error) => {
    /*网络连接过程异常处理*/
    let {
      message,
      config: { config },
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
      _this?.$message.error(message || '接口未知异常')
    return Promise.reject({
      error_info: message,
    })
  }
)

// 下载文件
function download(res) {
  if (res.data.type !== 'application/json') {
    if (!res.data.size) {
      _this.$hMessage.error('文件不存在')
      return
    }
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
      _this.$hMessage.error(data.message)
    }
    reader.readAsText(res.data, ['utf-8'])
  }
}

//请求方法
export default function (
  url,
  method,
  params,
  {
    tip = true, //错误弹提示
    Authorization = true, //带请求头
    ...config
  } = {}
) {
  let data = method.toLocaleLowerCase() === 'get' ? 'params' : 'data'
  return service({
    method,
    url,
    [data]: params,
    responseType: config.responseType,
    withCredentials: config.withCredentials || config.formDate,
    config: { tip, Authorization, ...config },
  })
    .then((res) => {
      return Promise.resolve(res)
    })
    .catch((err) => {
      return Promise.reject(err)
    })
}
