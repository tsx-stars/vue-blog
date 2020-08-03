import axios from 'axios'
import qs from 'qs'
import router from '@/router'
import { Message } from 'element-ui'
//字段枚举
let fieldEnum = {
  token: 'token',
  code: 'resultCode',
  statusCode: '0',
  msg: 'message',
}

window.baseURL =
  process.env.NODE_ENV === 'development'
    ? '/dev'
    : window.baseURL || window.location.origin

//初始化axios
const service = axios.create({
  baseURL: window.baseURL,
  timeout:
    process.env.NODE_ENV === 'development' ? 60000 : window.timeout || 10000,
})

//请求拦截器
service.interceptors.request.use(
  (request) => {
    request.headers[fieldEnum.token] = sessionStorage.getItem('token')
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
    let { status, data, tips } = response
    if (status !== 200) {
      tips && Message.error(`接口${status}异常`)
      return Promise.reject(response)
    }
    if (response.request.responseType === 'blob') {
      download(response)
      return
    }
    const { [fieldEnum.code]: code, [fieldEnum.msg]: msg } = data
    if (code && code != fieldEnum.statusCode) {
      tips && Message.error(msg || '未知异常')
      return Promise.reject(data)
    } else {
      return data
    }
  },
  (error) => {
    /*网络连接过程异常处理*/
    let { message, tips } = error
    if (message.includes('401')) {
      message = '登录信息失效，请重新登录！'
      sessionStorage.clear()
      router.replace({
        path: '/login',
      })
    }
    if (message === 'Network Error') message = '网络错误'
    if (message.includes('timeout')) message = '接口请求超时'
    if (message.includes('Request failed with status code'))
      message = '接口' + message.substr(message.length - 3) + '异常'
    tips && Message.error(message || '接口未知异常')
    return Promise.reject(error)
  }
)

// 下载文件
function download(res) {
  if (res.data.type !== 'application/json') {
    if (!res.data.size) {
      Message.error('文件不存在')
      return
    }
    // let blob = new Blob([res.data], {type: 'application/vnd.ms-excel;charset=utf-8'})
    let href = URL.createObjectURL(res.data)
    let a = document.createElement('a')
    a.href = href
    let title = res.headers['content-disposition']
    a.download = decodeURIComponent(title.split('=')[1])
    a.click()
    a = null
    URL.revokeObjectURL(href)
  } else {
    let reader = new FileReader()
    reader.onload = (e) => {
      let data = JSON.parse(e.target.result)
      Message.error(data[fieldEnum.msg] || '未知异常')
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
    tips = true, //错误弹提示
    token = true, //带请求头
    ...config // formDate 表单提交, withCredentials Cookies
  } = {}
) {
  let data = method.toLocaleLowerCase() === 'get' ? 'params' : 'data'
  return service({
    method,
    url,
    [data]: params,
    tips,
    token,
    ...config,
  })
}
