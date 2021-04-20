<template>
  <div style="display: inline-block" @click="startUpload">
    <img
      v-if="imgSrc"
      style="width: 80px; height: 80px"
      :src="baseURL + imgSrc"
      alt=""
    />
    <slot v-else>
      <div class="upload-img">
        <img style="width: 31px" src="@/assets/box.png" alt="" />
        <p style="font-size: 14px; color: #333">点击添加图片</p>
        <p style="font-size: 12px; color: #999999">
          仅支持{{ acceptName }}格式图片，大小不超过{{ fileMax }}M
        </p>
      </div>
    </slot>
    <input
      type="file"
      style="display: none"
      ref="file"
      :accept="accept"
      @change="uploading($event)"
    />
  </div>
</template>

<script>
export default {
  name: 'SUpload',
  props: {
    //上传文件类型
    accept: {
      type: String,
      // default: 'image/jpg, image/png, image/gif',
      default: 'image/png',
    },
    //上传文件大小限制,单位m
    fileMax: {
      type: Number,
      default: 2,
    },
    imgSrc: {
      type: String,
    },
  },
  data() {
    return {
      baseURL: window.App.baseURL,
      // localImgSrc: undefined,
    }
  },
  computed: {
    acceptName() {
      return this.accept
        .split(',')
        .map((item) => {
          return item.split('/')[1]
        })
        .join()
    },
  },
  mounted() {},
  methods: {
    startUpload() {
      if (this.$attrs.disabled) return
      this.$refs.file.click()
    },
    // 上传图片
    uploading(event) {
      let [file] = event.target.files
      let { size, name, type } = file
      if (!this.accept.includes(type)) {
        this.$hNotice.warning({
          title: '文件格式不正确',
          desc: `文件${file.name}格式不正确，请上传 ${this.acceptName} 格式的图片。`,
        })
        return
      }
      if (size > this.fileMax * 1024 * 1024) {
        this.$hNotice.warning({
          title: '超出文件大小限制',
          desc: `文件${name}太大，不能超过${this.fileMax}M。`,
        })
        return
      }
      this.uploadImgFun1(file)
      // this.showImg(file)
    },
    // 上传图片接口
    uploadImgFun1(file) {
      let params = new FormData()
      params.append('file', file)
      this.$xhr('fileUpload', 'post', params)
        .then((res) => {
          this.$emit('update:fileInfo', res)
        })
        .catch((err) => {
          this.$emit('update:fileInfo', {})
        })
    },
    //显示图片
    showImg(file) {
      let reads = new FileReader()
      reads.readAsDataURL(file)
      reads.onload = () => {
        this.localImgSrc = reads.result
      }
    },
  },
}
</script>

<style scoped lang="scss">
.upload-img {
  cursor: pointer;
  width: 240px;
  height: 140px;
  background: #f7f7f7;
  border: 1px dashed #dddddd;
  border-radius: 2px;
  text-align: center;
  > img {
    margin-top: 30px;
  }
  > p:nth-child(3) {
    margin-top: -8px;
  }
  &:hover {
    border: 1px dashed #298dff;
  }
}
</style>
