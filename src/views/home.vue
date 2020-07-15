<template>
  <div class="home">
    <sideBar style="min-width: 200px;"></sideBar>
    <router-view style="flex: 1; width: 70%; padding: 40px;" />
  </div>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {}
  },
  components: {
    sideBar: () => import('@/components/sideBar'),
  },
}
</script>

<style scoped>
.home {
  display: flex;
}
</style>
