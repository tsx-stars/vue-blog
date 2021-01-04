<template>
  <div class="prize-headder clearfix">
    <div class="prize-headder-cen">
      <div class="fl">
        <a class="gtn-logo" :href="hsUrl"></a>
        <a class="prize-title nav nav-l" href="javascript:">短信平台</a>
      </div>
      <div class="fr">
        <!--<a @click="toLogin" class="nav" href="javascript:">登录</a>-->
        <a class="nav" href="javascript:">{{ userInfo.mobile }}</a>
        <a @click="logout" class="nav" href="javascript:">退出</a>
        <a
          class="admin-center"
          href="https://www.hs.net/com.hundsun.openplat.front/cloud/open/serviceapply/myServicePage.html"
          >管理中心</a
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { toLogin, userCenterLogout } from '@/utils'
export default {
  name: 'PrizeHeadder',
  data() {
    return {
      hsUrl: window.App.hsUrl,
      toLogin,
    }
  },
  computed: {
    ...mapState('login', ['userInfo']),
  },
  methods: {
    logout() {
      //自己的登出
      this.$xhr
        .post('logout', null, { tips: false })
        .then(() => {})
        .finally(userCenterLogout)
    },
  },
}
</script>

<style scoped lang="scss">
.prize-headder {
  background: #282a39;
}
.prize-headder-cen {
  /*width: 1200px;*/
  padding: 0 30px 0 20px;
  height: 60px;
  box-sizing: border-box;
  margin: 0 auto;
  line-height: 60px;
  font-size: 14px;
  .nav {
    display: inline-block;
    height: 60px;
    vertical-align: middle;
    color: #fff;
    padding: 0 12px;
    &:hover {
      color: #298dff;
    }
  }
  .nav-l {
    &:hover {
      border-bottom: 3px solid #60ace8;
    }
  }
  .fr {
    padding: 0 12px;
  }
  .admin-center {
    display: inline-block;
    height: 26px;
    line-height: 26px;
    vertical-align: middle;
    border: 1px solid #7e8093;
    font-size: 14px;
    text-align: center;
    color: #fff;
    transition: all 0.2s;
    padding: 0 12px;
    margin-left: 12px;
    &:hover {
      background-color: #0ae;
    }
  }
}
.gtn-logo {
  width: 150px;
  height: 60px;
  display: inline-block;
  background: url(../assets/gtn-logo-yun.png) center center no-repeat;
  vertical-align: middle;
}
.prize-title {
  font-size: 16px;
  position: relative;
  margin-left: 50px;
  &:after {
    content: '';
    display: block;
    height: 36px;
    width: 1.5px;
    background: #fff;
    position: absolute;
    left: -28px;
    top: 12px;
  }
}
</style>
