<template>
  <div
    v-if="showDialog"
    :class="['dialog-box', !autoClose && 'bg']"
    @click="clickBG"
  >
    <div class="toast pos-center" v-if="autoClose">
      <p>{{ text }}</p>
    </div>
    <div
      class="alert pos-center flex-col-between-center"
      v-else
      @click.stop.prevent
    >
      <p class="content">{{ text }}</p>
      <div class="botton flex-row-between-center">
        <BaseButton
          smallFont
          canClick
          type="primary"
          :block="isAlert"
          :class="[!isAlert && 'button-confirm']"
          :buttonText="confirmText"
          @btnClick="confirmClick"
        />
        <BaseButton
          smallFont
          canClick
          v-if="!isAlert"
          class="button-cancel"
          type="cancel"
          :buttonText="cancelText"
          @btnClick="cancelClick"
        />
      </div>
    </div>
  </div>
</template>

<script>
import BaseButton from '../BaseButton'
export default {
  components: { BaseButton },
  data() {
    return {
      text: '',
      duration: 2000,
      autoClose: true,
      isAlert: false,
      showDialog: true,
      showBtn: true,
      showCancelBtn: true,
      confirmText: '确定',
      cancelText: '取消',
    }
  },

  created() {
    this.closeToast()
  },
  methods: {
    closer() {
      this.showDialog = false
    },
    closeToast() {
      this.autoClose &&
        setTimeout(() => {
          this.closer()
        }, this.duration)
    },
    clickBG() {
      if (this.autoClose) return
      this.showDialog = false
    },
    cancelClick() {
      this.showDialog = false
      this.handleCancel && this.handleCancel()
    },
    confirmClick() {
      this.showDialog = false
      this.handleConfirm && this.handleConfirm()
    },
  },
}
</script>

<style lang="less" scoped>
.dialog-box {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999;
  * {
    box-sizing: border-box;
  }
}
.pos-center {
  position: absolute;
  z-index: 11;
  border-radius: 5px;
}
.toast {
  color: #fff;
  max-width: 80%;
  padding: 10px 22px;
  background: #444;
}
.alert {
  color: #444;
  width: 670px;
  height: 376px;
  padding: 32px 38px;
  font-size: 28px;
  background: #fff;
  border: 1px solid #eee;
  text-align: center;
  .button-confirm,
  .button-cancel {
    width: 281px;
    height: 76px;
    border-radius: 10px;
  }
  // margin-right: 20px;
}
.content {
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
}
.botton {
  width: 594px;
  height: 76px;
  line-height: 76px;
}
.bg {
  background: rgba(0, 0, 0, 0.8);
}
.pos-center {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.flex-col-between-center,
.flex-row-between-center {
  display: flex;
  justify-content: space-between;
}
.flex-col-between-center {
  flex-direction: column;
}
</style>
