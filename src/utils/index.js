export {
  formatDate, //日期格式转换
  deepCopy, //深度克隆
  paramObj, //将url请求参数转为json格式
  exportCsv, //前端根据二维数组导出csv表格
}

function formatDate(date, fmt = 'yyyy-MM-dd') {
  if (!date) {
    return date
  }
  if (typeof date === 'number') {
    date = new Date(date)
  }
  if (typeof date === 'string') {
    date = new Date(Number(date))
  }
  let o = {
    'M+': date.getMonth() + 1, //月份
    'd+': date.getDate(), //日
    'h+': date.getHours(), //小时
    'm+': date.getMinutes(), //分
    's+': date.getSeconds(), //秒
    'q+': Math.floor((date.getMonth() + 3) / 3), //季度
    S: date.getMilliseconds(), //毫秒
  }
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + '').substr(4 - RegExp.$1.length)
    )
  for (let k in o)
    if (new RegExp('(' + k + ')').test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      )
  return fmt
}

function deepCopy(obj, cache = []) {
  if (obj === null || typeof obj !== 'object') {
    return obj
  }
  const hit = cache.filter((c) => c.original === obj)[0]
  if (hit) {
    return hit.copy
  }
  const copy = Array.isArray(obj) ? [] : {}
  cache.push({
    original: obj,
    copy,
  })
  Object.keys(obj).forEach((key) => {
    copy[key] = deepCopy(obj[key], cache)
  })
  return copy
}

function paramObj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"')
        .replace(/\+/g, ' ') +
      '"}'
  )
}

function exportCsv(arr) {
  let csvContent =
    'data:text/csv;charset=utf-8,' + arr.map((e) => e.join(',')).join('\n')
  let encodedUri = encodeURI(csvContent)
  let link = document.createElement('a')
  link.setAttribute('href', encodedUri)
  link.setAttribute('download', 'my_data.csv')
  link.click()
  link = null
}
