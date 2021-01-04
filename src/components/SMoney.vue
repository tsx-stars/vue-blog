<template>
  <span class="money" v-html="unitPrice"></span>
</template>

<script>
export default {
  name: 'SMoney',
  props: {
    money: null,
  },
  computed: {
    unitPrice() {
      let html
      let { money } = this
      if (money === null || money === undefined) {
        html = '--'
      } else {
        money = +money
        if (!isNaN(money)) {
          money = money.toFixed(2)
          money = String(money)
          html = `￥${money.slice(0, -2)}${money.slice(-2).small()}`
        } else {
          html = '--'
        }
      }
      return html
    },
  },
}
</script>

<style scoped lang="scss">
.money {
  font-size: 28px;
  color: #1266c4;
  margin: 0 6px;
}
</style>
