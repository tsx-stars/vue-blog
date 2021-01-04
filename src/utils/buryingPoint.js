// import qs from 'qs'
// import axios from 'axios'
// import Fingerprint from 'fingerprintjs'
import settings from '@/settings'

//事件埋点
export function addUserAnalysisEvent(c_event_info) {
  let url = location.origin + location.pathname
  if (c_event_info === 'prize-login') {
    url = location.origin + settings.publicPath + '/login'
  }
  let userInfo
  try {
    userInfo = JSON.parse(sessionStorage.getItem('userInfo')) || {}
  } catch (e) {
    userInfo = {}
  }
  window.hssdk_click({
    c_userid: userInfo.authId,
    c_pagename: url,
    c_event_info,
    c_other: {
      mobile: userInfo.mobile,
      loginName: userInfo.loginName,
    },
  })
}
