<template>
  <div class="test">
    <div
      class="box"
      style="
        width: 100px;
        margin: 100px auto;
        background: rgba(74, 183, 189, 0.33);
      "
    >
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
      <div>5</div>
      <div>6</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'test',
  data() {
    return {}
  },
  mounted() {},
  methods: {},
}
</script>

<style scoped lang="scss">
.box {
  overflow-x: auto;
  white-space: nowrap;
  > div {
    display: inline-block;
    width: 25px;
  }
}
</style>
