<template>
  <div style="padding: 100px 0 0 100px">
    <h-button @click="test">test</h-button>
    <h-button @click="test2">test2</h-button>
    <h-table :columns="columns" :data="list"></h-table>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'test',
  components: {},
  data() {
    return {
      columns: [
        {
          title: 'id',
          key: 'id',
        },
        {
          title: '名称',
          key: 'name',
        },
      ],
      list: [
        { id: '01', name: 'q' },
        { id: '02', name: 'w' },
      ],
    }
  },
  created() {},
  methods: {
    add() {
      this.list.push({ id: '', name: '' })
    },
  },
}
</script>
