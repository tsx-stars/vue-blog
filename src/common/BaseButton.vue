<template>
  <div v-if="block" :class="['base-button', canClick && 'active']" @click.stop="handleClick">
    <p :class="[smallFont && 'small-font-size']">{{ buttonText }}</p>
  </div>
  <button v-else :class="['default', type]" @click.stop="handleClick">
    {{ buttonText }}
  </button>
</template>

<script>
export default {
  name: 'BaseButton',
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    buttonText: {
      type: String,
      default: '确定'
    },
    canClick: {
      type: Boolean,
      default: false
    },
    block: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: ''
    },
    smallFont: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleClick () {
      if (!this.canClick || this.loading) {
        return
      }
      this.$emit('btnClick')
    }
  }
}
</script>

<style lang="less" scoped>
.base-button {
  * {
    box-sizing: border-box;
    font-family: PingFangSC-Regular;
  }
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  background: #d9d9d9;
  font-size: 36px;
  color: #ffffff;
  > p {
    letter-spacing: 4px;
  }
}
.active {
  background: #3060ff;
}
.small-font-size {
  font-size: 28px;
}

.default {
  color: #555;
  padding: 6px 20px;
  background: #fff;
  border: 1px solid #bbb;
  border-radius: 3px;
}
.primary {
  color: #fff;
  border: none;
  // background: #009688;
  background: #3060FF;;
}
.normal {
  color: #fff;
  border: none;
  background: #1e9fff;
}
.danger {
  color: #fff;
  border: none;
  background: #f14e44;
}
.cancel {
  color: #333;
  border: none;
  background: #e6e6e6;
}
</style>
