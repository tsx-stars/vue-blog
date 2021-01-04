<template>
  <div>
    <h-menu
      theme="dark"
      @on-select="$jump"
      :active-name="$route.path.split('/')[2]"
      :open-names="[$route.path.split('/')[1]]"
      :collapse="false"
    >
      <h-submenu :name="item.name" v-for="item in menuList" :key="item.name">
        <template slot="title">
          <h-icon name="computer"></h-icon>
          <span slot="title">{{ item.describe }}</span>
        </template>
        <h-menu-item
          v-for="item2 in item.children"
          :name="item2.name"
          :key="item2.name"
          >{{ item2.describe }}</h-menu-item
        >
      </h-submenu>
    </h-menu>
  </div>
</template>

<script>
import menuList from '@/router/menuList'
export default {
  name: 'SmsMenu',
  data() {
    return {
      menuList,
    }
  },
}
</script>

<style scoped></style>
