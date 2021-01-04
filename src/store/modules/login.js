import xhr from '@/utils/request'
import { jump, userCenterLogout } from '@/utils'
import settings from '@/settings'

let userInfo = {}
try {
  userInfo = JSON.parse(sessionStorage.getItem('userInfo')) || {}
} catch (e) {
  console.log(e)
}
const state = {
  userInfo,
  /*userInfo: {
    token: undefined,
    mobile: undefined,
    loginName: undefined,
    authId: undefined,
    isAdmin: '1',// 0：管理员 1：非管理员
  },*/
  account_balances: 0.0, //账户余额
  total_recharge: 0.0, //总充值
}

const mutations = {
  /*setLoginState(state, bol = false) {
    state.isLogin = bol
  },*/
  //设置用户信息
  setUserInfo(state, obj = {}) {
    sessionStorage.setItem('userInfo', JSON.stringify(obj))
    state.userInfo = obj
  },
  //设置用户信息
  setAccountBalances(state, obj) {
    state.account_balances = Number(obj.account_balances || 0).toFixed(2)
    state.total_recharge = Number(obj.total_recharge || 0).toFixed(2)
  },
}

const actions = {
  // 获取客户余额
  getAccountBalances({ commit }) {
    xhr.post('getAccountBalances').then((res) => {
      commit('setAccountBalances', res.obj)
    })
  },
  // 验证ticket
  checkTicket({ commit }, ticket) {
    return new Promise((resolve, reject) => {
      xhr('user/login', 'post', {
        ticket,
        service: `${location.origin}${settings.publicPath}/login`,
      })
        .then((res) => {
          commit('setUserInfo', res.obj)
          res.obj?.token && sessionStorage.setItem('token', res.obj.token)
          resolve(res.obj)
          jump('奖品中心')
        })
        .catch(() => {
          userCenterLogout()
          reject()
        })
    })
  },
}

export default {
  state,
  mutations,
  actions,
}
