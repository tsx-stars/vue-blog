<template>
  <div class="demo">
    <el-button @click="exportCsv">导出csv</el-button>
    <div id="aniimated-thumbnials">
      <a :href="img01">
        <img :src="img01" />
      </a>
      <a :href="img02">
        <img :src="img02" />
      </a>
    </div>
  </div>
</template>

<script>
import { exportCsv } from '../utils'
import 'lightgallery.js'
import 'lightgallery.js/src/css/lightgallery.css'

export default {
  name: 'demo',
  data() {
    return {
      img01: require('../assets/01.png'),
      img02: require('../assets/02.png'),
    }
  },
  mounted() {
    window.lightGallery(document.getElementById('aniimated-thumbnials'), {
      thumbnail: true,
    })
  },
  methods: {
    exportCsv() {
      let data = [
        ['name1', 'city1', 'some other info'],
        ['name2', 'city2', 'more info'],
      ]
      exportCsv(data)
    },
  },
}
</script>

<style scoped lang="scss"></style>
