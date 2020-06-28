<template>
  <div class="index">
    主页
    <el-button @click="$jump('home')">去home页</el-button>
    <el-button @click="$jump('login')">登录</el-button>
  </div>
</template>

<script>
export default {
  name: 'index',
  data() {
    return {}
  }
}
</script>

<style scoped lang="scss"></style>
