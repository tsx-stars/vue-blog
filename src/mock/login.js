let obj = {
  //登录
  'post|login': {
    errcode: 0,
    errmsg: 'SUCCESS',
    obj: {
      loginName: null,
      mobile: '17343639593',
      authId: '232890118992568320',
      token:
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJsb2dpbklkIjoiOCIsIm1vYmlsZSI6IjE3MzQzNjM5NTkzIiwicGlkIjoiOCIsImV4cCI6MTYwNTgzOTEwMiwiYXV0aElkIjoiMjMyODkwMTE4OTkyNTY4MzIwIn0.XbpWDoBD1ErfBWIfGI84syN3rZiKwJFXhI9VM5D1gDA',
    },
  },
  //获取客户余额
  getAccountBalances: {
    errcode: 0,
    errmsg: 'SUCCESS',
    obj: { account_balances: '9910.1', total_recharge: '10020.0' },
  },
  //登出
  logout: null,
}
export default obj
