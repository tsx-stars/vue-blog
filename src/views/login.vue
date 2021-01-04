<template>
  <div></div>
</template>
<script>
import { getQueryStr, toLogin } from '../utils'
import { addUserAnalysisEvent } from '@/utils/buryingPoint'
export default {
  name: 'login',
  beforeCreate() {
    let { ticket } = getQueryStr()
    if (ticket) {
      //登录中
      this.$store.dispatch('login/checkTicket', ticket).then((res) => {
        addUserAnalysisEvent('prize-login')
        this.$store.dispatch('login/getAccountBalances')
      })
    } else {
      toLogin()
    }
  },
}
</script>
<style lang="scss" scoped></style>
