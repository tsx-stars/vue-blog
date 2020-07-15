<template>
  <div class="components-container">
    <div style="margin: 100px auto 0; width: 500px;">
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
    </div>
    <div style="margin: 10px 0 0 20px;">
      <h4 style="margin-bottom: 10px;">当前顺序</h4>
      <el-tag
        v-for="item of value"
        :key="item"
        style="margin-right: 15px; margin-bottom: 10px;"
      >
        {{ item }}
      </el-tag>
    </div>
  </div>
</template>

<script>
import ElDragSelect from '@/components/DragSelect' // base on element-ui
import axios from 'axios'
import Mock from 'mockjs'
export default {
  name: 'DragSelectDemo',
  components: { ElDragSelect },
  data() {
    return {
      value: [],
      options: [],
    }
  },
  mounted() {
    let options = Mock.mock({
      // 20条数据
      'data|20': [
        {
          value: '@ctitle',
          label: '@ctitle',
        },
      ],
    }).data
    console.log(options, '==')

    this.$xhr('/dev/drag-select', 'post').then((res) => {
      console.log(res.data)
      this.options = res.data
      this.value = this.options.slice(0, 3).map((item) => item.value)
    })
  },
}
</script>
<style lang="scss" scoped></style>
