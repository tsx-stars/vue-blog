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
    console.log('进入index')
    axios
      .post('/vab-mock-server/register')
      .then((res) => {
        console.log(res);
        console.log('注册成功')
      })
      .catch((err) => {
        console.log(err);
        console.log('注册失败')
      })
    this.$message.success('进入home页')
  },
  methods:{
  }
}
</script>

<style scoped lang="scss"></style>
