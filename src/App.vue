<template>
  <div>
    <!--main-->
    <router-view />
    <!--图片查看-->
    <s-img-see />
    <!--    gtn同步用户中心会话-->
    <!--<iframe
      style="display: none"
      :src="fileCenterUrl + '/open/dest/login/sign_H5!.js?t' + +new Date()"
    ></iframe>-->
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      fileCenterUrl: window.App.fileCenterUrl,
    }
  },
  methods: mapActions('login', ['getAccountBalances', 'checkTicket']),
}
</script>
<style lang="scss"></style>
