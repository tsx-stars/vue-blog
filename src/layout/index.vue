<template>
  <div>
    <SmsHead />
    <div class="content min-h">
      <SmsSide class="side min-h" />
      <router-view class="main" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'layout',
  components: {
    SmsHead: () => import('./SmsHead'),
    SmsSide: () => import('./SmsSide'),
  },
  methods: {},
}
</script>

<style scoped lang="scss">
.min-h {
  min-height: calc(100vh - 60px);
}
.content {
  display: flex;
}
.side {
  flex: 0 0 240px;
  background: #000;
}
.main {
  padding: 20px;
}
</style>
