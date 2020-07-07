<template>
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @select="handleSelect"
    @close="handleClose"
  >
    <el-button style="margin-left: 30px;" @click="$jump('index')"
      >回主页</el-button
    >
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>stars模块</span>
      </template>
      <el-menu-item index="stars01">stars01</el-menu-item>
      <el-menu-item index="stars02">stars02</el-menu-item>
    </el-submenu>
    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-menu"></i>
        <span>dangpi模块</span>
      </template>
      <el-menu-item index="dangpi01">dangpi01</el-menu-item>
      <el-menu-item index="dangpi02">dangpi02</el-menu-item>
    </el-submenu>
    <el-menu-item index="side03">
      <i class="el-icon-document"></i>
      <span slot="title">导航三</span>
    </el-menu-item>
    <el-submenu index="4">
      <template slot="title">
        <i class="el-icon-menu"></i>
        <span>用户管理模块</span>
      </template>
      <el-menu-item index="userInfo">用户信息</el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  name: 'sideBar',
  data() {
    return {}
  },
  mounted() {
    console.log('页面加载执行')
  },
  methods: {
    handleSelect(index, indexPath) {
      console.log(index, indexPath)
      this.$jump(index)
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },
  },
}
</script>
