<template>
  <h-msgBox
    v-model="imgBox"
    title="查看图片"
    :mask-closable="false"
    :zIndex="2000"
  >
    <img v-if="imgBox" :src="intactImgUrl" style="width: 100%" />
    <template slot="footer">
      <h-button type="primary" @click="closeImgBox">确定</h-button>
    </template>
  </h-msgBox>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'ImgSee',
  data() {
    return {}
  },
  computed: {
    ...mapState(['imgUrl']),
    imgBox: {
      get() {
        return this.$store.state.imgBox
      },
      set() {
        this.closeImgBox()
      },
    },
    intactImgUrl() {
      let { imgUrl } = this
      if (!imgUrl.includes('http')) {
        imgUrl = window.App.baseURL + imgUrl
      }
      return imgUrl
    },
  },
  methods: {
    ...mapMutations(['closeImgBox']),
  },
}
</script>

<style scoped lang="scss"></style>
