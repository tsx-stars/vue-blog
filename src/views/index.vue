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
    axios.post('/vab-mock-server/register').then(res=>{
      alert('注册成功')
    })
    this.$message.success('进入home页')
    /*this.$xhr('/ad/getList','get',{name:'get'}).then((res) => {
      console.log(res)
    })
    this.$xhr('/t2','post',{name:'张三'}).then((res) => {
      console.log(res)
    })*/
  },
}
</script>

<style scoped lang="scss"></style>
