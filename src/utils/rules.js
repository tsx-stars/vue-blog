//判断网址
export const customReg = {
  mobile: /^1[3456789]\d{9}$/,
  urlReg: /^(http|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?/,
  versionIdRule2: /(^([0-9]{1,3}[.][0-9]{1,3}[.][0-9]{1,3}|[0-9]{1,3}[.][0-9]{1,3}[.][0-9]{1,3}[.][0-9]{1,5})$)/,
  email: /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/,
}

export const urlRule = {
  test: function urlFunc(rule, val, callback) {
    if (customReg.urlReg.test(val)) callback()
    else callback(new Error('请输入合法的网址'))
  },
  trigger: 'blur',
}

export const mobileRule = {
  test: function urlFunc(rule, val, callback) {
    if (customReg.mobile.test(val)) callback()
    else callback(new Error('请输入合法的手机'))
  },
  trigger: 'blur',
}

export const emailRule = {
  test: function urlFunc(rule, val, callback) {
    if (customReg.email.test(val)) callback()
    else callback(new Error('请输入合法的邮箱'))
  },
  trigger: 'blur',
}

//默认空也返回true
export function rulesCheck(regName, str, excludeEmpty = true) {
  if (!str && excludeEmpty) return true
  return customReg[regName].test(str)
}
