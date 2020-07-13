<template>
  <el-select
    ref="dragSelect"
    v-model="selectVal"
    v-bind="$attrs"
    class="drag-select"
    multiple
    v-on="$listeners"
  >
    <slot />
  </el-select>
</template>

<script>
import Sortable from 'sortablejs'

export default {
  name: 'DragSelect',
  props: {
    value: {
      type: Array,
      required: true,
    },
  },
  computed: {
    selectVal: {
      get() {
        return [...this.value]
      },
      set(val) {
        this.$emit('input', [...val])
      },
    },
  },
  mounted() {
    this.setSort()
    this.$nextTick().then((res) => {
      let item = this.$refs.dragSelect.$el.querySelectorAll(
        '.el-select__tags > span>span'
      )
      console.log(item)
      item.forEach((item, index) => {
        let text=item.innerText
        console.log(text)
        console.log(item)
        item.setAttribute('title',text)
      })
    })
  },
  methods: {
    setSort() {
      const el = this.$refs.dragSelect.$el.querySelectorAll(
        '.el-select__tags > span'
      )[0]
      this.sortable = Sortable.create(el, {
        ghostClass: 'sortable-ghost', // Class name for the drop placeholder,
        setData: function (dataTransfer) {
          console.log(dataTransfer)
          dataTransfer.setData('Text', '')
          // to avoid Firefox bug
          // Detail see : https://github.com/RubaXa/Sortable/issues/1012
        },
        onEnd: (evt) => {
          console.log(evt)
          console.log(evt.oldIndex)
          const targetRow = this.value.splice(evt.oldIndex, 1)[0]
          console.log(targetRow)
          this.value.splice(evt.newIndex, 0, targetRow)
        },
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.drag-select {
  ::v-deep {
    .sortable-ghost {
      opacity: 0.8;
      color: #fff !important;
      background: #42b983 !important;
    }

    .el-tag {
      cursor: pointer;
    }
  }
  .el-tag {
    display: inline-block !important;
    width: 20px !important;
  }
}
</style>
