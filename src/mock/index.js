import settings from '@/settings'
const { startUpMock, partialImport, needMockList } = settings

const Mock = require('mockjs')

// 设置拦截ajax请求的相应时间
Mock.setup({
  timeout: '200-600',
})

let configArray = []

// 使用webpack的require.context()遍历所有mock文件
const files = require.context('.', true, /\.js$/)

//mock名称列表
let mockArr = files.keys()

//mock过滤
const reg = /\.\/(.*)\.js/
mockArr = mockArr.filter((key) => {
  let tmp = key.match(reg)[1]
  return (
    startUpMock &&
    key !== './index.js' &&
    files(key).default &&
    (needMockList.includes(tmp) || !partialImport)
  )
})

mockArr.forEach((key) => {
  configArray.push(files(key).default)
})

// 注册所有的mock服务
configArray.forEach((item) => {
  for (let [path, target] of Object.entries(item)) {
    if (path.includes('|')) {
      let protocol = path.split('|')
      // Mock.mock(new RegExp('^' + protocol[1]), protocol[0], target)
      Mock.mock(
        new RegExp(protocol[1]),
        protocol[0],
        XHR2ExpressReqWrap(target)
      )
    } else {
      Mock.mock(new RegExp(path), XHR2ExpressReqWrap(target))
    }
  }
})

//处理参数
function XHR2ExpressReqWrap(respond) {
  return function (options) {
    let result = null
    if (respond instanceof Function) {
      const { body, type, url } = options
      result = respond({
        method: type,
        body: JSON.parse(body),
        query: param2Obj(url),
      })
    } else {
      result = respond
    }
    return Mock.mock(result)
  }
}

//get请求处理查询字符串
function param2Obj(url) {
  const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ')
  if (!search) {
    return {}
  }
  const obj = {}
  const searchArr = search.split('&')
  searchArr.forEach((v) => {
    const index = v.indexOf('=')
    if (index !== -1) {
      const name = v.substring(0, index)
      const val = v.substring(index + 1, v.length)
      obj[name] = val
    }
  })
  return obj
}
