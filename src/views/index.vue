<template>
  <div class="index">
    主页
    <el-button @click="$jump('home')">去home页</el-button>
    <el-button @click="$jump('login')">登录</el-button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'index',
  data() {
    return {}
  },
  mounted() {
    axios
      .post('/vab-mock-server/register')
      .then((res) => {
        console.log('注册成功')
      })
      .catch((err) => {
        console.log('注册失败')
      })
  },
  methods: {},
}
</script>

<style scoped lang="scss"></style>
