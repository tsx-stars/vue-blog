<template>
  <div class="index">
    主页
    <ElButton @click="$jump('home')">去home页</ElButton>
    <el-button @click="$jump('login')">登录</el-button>
    <!--    <svg-icon style="font-size: 20px;" iconClass="edit" />-->
    <svg-icon style="font-size: 20px;" icon-class="chart" />
    <svg-icon icon-class="edit" />
    <div
      class="test"
      style="
        width: 100px;
        height: 100px;
        background: red;
        margin: 100px auto 0;
      "
    >
      拉拉
    </div>
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

<style scoped lang="scss">
.test {
  transition: all 1s;
}
.test:hover {
  transform: translate(0, -40px);
}
</style>
