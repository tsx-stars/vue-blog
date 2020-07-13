<template>
  <div class="components-container" style="margin: 100px auto; width: 500px;">
    <el-drag-select
      class="el-drag-select"
      v-model="value"
      style="width: 500px;"
      multiple
      placeholder="请选择"
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-drag-select>

    <div style="margin-top: 30px;">
      <el-tag v-for="item of value" :key="item" style="margin-right: 15px;">
        {{ item }}
      </el-tag>
    </div>
  </div>
</template>

<script>
import ElDragSelect from '@/components/DragSelect' // base on element-ui

export default {
  name: 'DragSelectDemo',
  components: { ElDragSelect },
  data() {
    return {
      value: ['Apple', 'Banana', 'Orange'],
      options: [
        {
          value: 'Apple',
          label: 'Apple',
        },
        {
          value: 'Banana',
          label: 'Banana',
        },
        {
          value: 'Orange',
          label: 'Orange',
        },
        {
          value: 'Pear',
          label: 'Pear',
        },
        {
          value: 'Strawberry',
          label: 'Strawberry',
        },
        {
          value: 'important',
          label: 'important',
        },
        {
          value: 'l-drag-selec',
          label: 'l-drag-selec',
        },
        {
          value: '-select__tag',
          label: '-select__tag',
        },
      ],
    }
  },
}
</script>
<style lang="scss" scoped>
/*.el-drag-select ::v-deep .el-select__tags-text {
  display: inline-block !important;
  width: 60px !important;
  vertical-align: bottom;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}*/
</style>
<style>
.el-select__tags {
  overflow: auto !important;
}
.el-select__tags > span {
  display: block!important;
  width: 2000px !important;
  max-width: 2000px !important;
  height: 30px;
  overflow: auto;
}
.el-select__tags > span > span {
  display: inline !important;
}
</style>
