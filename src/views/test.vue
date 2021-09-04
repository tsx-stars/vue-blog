<template>
  <div class="list">
    <div @click="show = !show">点击{{ show }}</div>
    <div
      class="animated"
      :class="show ? 'bounceInUp' : 'bounceOutUp'"
      style="
        width: 100px;
        height: 100px;
        background: rebeccapurple;
        margin: 300px auto;
      "
    ></div>
  </div>
</template>

<script>
export default {
  name: 'test',
  data() {
    return {
      show: false,
    }
  },
  mounted() {
    window.vm = this
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      let domHeight, scrollTop, visualHeight
      domHeight = $('animated1').offset().top //元素距顶部高度
      scrollTop = $(window).scrollTop() //获取滚动条到顶部的垂直高度
      visualHeight = $(window).height()
      console.log(domHeight, scrollTop + visualHeight)
      if (scrollTop + visualHeight > domHeight) {
        this.animated1 = true
      } else {
        this.animated1 = false
      }
    },
  },
}
</script>

<style scoped lang="scss">
.item {
  display: block;
  margin: 50px auto;
  height: 400px;
  width: 800px;
  background: rgba(74, 183, 189, 0.32);
  > img {
    width: 100%;
    height: 100%;
  }
}
</style>
