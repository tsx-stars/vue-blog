<template>
  <div class="home">
    <sideBar style="min-width: 200px"></sideBar>
    <router-view style="flex: 1;background: #42aa92" />
  </div>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {}
  },
  components: {
    sideBar: () => import('@/components/sideBar')
  },
  mounted() {
    this.$message.success('进入了home页')
  }
}
</script>

<style scoped>
.home {
  display: flex;
}
</style>
