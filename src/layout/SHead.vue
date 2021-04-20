<template>
  <div class="prize-headder clearfix">
    <div class="prize-headder-cen">
      <div class="fl">
        <a class="prize-title nav nav-l" href="javascript:">题库平台</a>
      </div>
      <div class="fr">
        <a @click="login" class="nav" href="javascript:">登录</a>
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
export default {
  name: 'SHead',
  data() {
    return {}
  },
  computed: {
    ...mapState('login', ['userInfo']),
  },
  methods: {
    login() {},
    logout() {},
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
