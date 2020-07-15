<template>
  <div class="components-container">
    <div style="margin: 50px auto 0; width: 800px;" class="editor-container">
      <dnd-list
        :list1="list1"
        :list2="list2"
        list1-title="List"
        list2-title="Article pool"
      />
    </div>
  </div>
</template>

<script>
import DndList from '@/components/DndList'
import axios from 'axios'
export default {
  name: 'DndListDemo',
  components: { DndList },
  data() {
    return {
      list1: [],
      list2: [],
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      this.listLoading = true
      this.$xhr('/dev/dnd-list', 'post').then((res) => {
        console.log(res)
        this.list1 = res.data.splice(0, 5)
        this.list2 = res.data
      })
      /*axios.post('/dev/dnd-list').then((res) => {
        console.log(res)
        let data = res.body
        this.list1 = data.items.splice(0, 5)
        this.list2 = data.items
      })*/
    },
  },
}
</script>
