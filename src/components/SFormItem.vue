<template>
  <h-form-item
    class="s-form-item"
    :style="{ minHeight: formItemH }"
    v-bind="{ ...$attrs, hidePopperTime }"
  >
    <template v-if="['text', 'password', 'textarea', 'int'].includes(type)">
      <h-input
        :style="{ width: inputW }"
        v-model="_value"
        @on-focus="showTips = true"
        @on-blur="showTips = false"
        :type="type"
        :maxlength="maxlength"
        :placeholder="placeholder"
        :disabled="disabled"
        :filterRE="filterRE"
      ></h-input>
      <span
        v-if="type === 'textarea' && maxlength"
        class="textarea-count"
        :style="{ bottom: tips && showTips ? '32px' : '0' }"
        >{{ _value.length }}/{{ maxlength }}</span
      >
      <span v-show="tips && showTips">
        <i class="tip-icon"></i>{{ tips }}
      </span>
    </template>
    <h-select
      v-if="type === 'select'"
      v-model="_value"
      :placeholder="placeholder"
      :disabled="disabled"
    >
      <h-option
        v-for="(item, index) in option"
        :value="item.value"
        :key="$attrs.prop + index"
        >{{ item.label }}</h-option
      >
    </h-select>
    <h-typefield
      v-else-if="['money', 'cardNo'].includes(type)"
      v-model="_value"
      :type="type"
      :placeholder="placeholder"
    ></h-typefield>
    <s-upload
      style="margin-bottom: 25px"
      v-else-if="type === 'img'"
      @update:fileInfo="_fileInfo"
      :imgSrc="imgSrc"
      :disabled="disabled"
    />
  </h-form-item>
</template>

<script>
export default {
  name: 'sFormItem',
  props: {
    /*//此属性控制表单验证提示信息tip，当设置为true时，表单控件获取焦点将隐藏tip错误提示信息
    hideTipOnFocus: {
      type: Boolean,
      default: true,
    },
    //是否只在失去焦点的时候触发校验,多选和单选按钮组无法失去焦点，故不支持此属性(v1.0.29)
    onlyBlurRequire: {
      type: Boolean,
      default: true,
    },*/
    option: {
      type: Array,
      default() {
        return []
      },
    },
    maxlength: Number,
    //是否可以输入空格
    space: {
      type: Boolean,
      default: true,
    },
    disabled: null,
    disabledAll: null,
    type: {
      type: String,
      default: 'text',
    },
    //多少毫秒内关闭错误的tips提示（单位：ms） (v1.3.1)
    hidePopperTime: {
      type: Number,
      default() {
        if (this.type === 'img') {
          return 1000
        }
      },
    },
    imgSrc: String,
    inputW: {
      default: '100%',
    },
    value: {
      type: [String, Number],
    },
    tips: {
      type: String,
    },
    placeholder: {
      type: String,
      default() {
        let str = '输入'
        if (this.type === 'select') str = '选择'
        return `请${str}${this.$attrs.label}`
      },
    },
    formItemH: {
      type: String,
      default() {
        if (!this.tips) {
          return '55px'
        } else if (this.type === 'textarea') {
          return '110px'
        } else {
          return '70px'
        }
      },
    },
    //默认首字母禁止输入空格
    filterRE: {
      type: RegExp,
      default() {
        //禁止输入空格
        let reg = null
        if (this.space) {
          reg = /^\s+/
        } else {
          reg = /\s+/
        }
        return reg
      },
    },
  },
  data() {
    return {
      showTips: false,
      uplaodLink: window.App.baseURL + '/fileUpload',
    }
  },
  computed: {
    _value: {
      get() {
        return this.value
      },
      //模拟v-model
      set(v) {
        //去掉首空格
        // let str = v.replace(/^\s+/, '')
        this.$emit('input', v)
      },
    },
  },
  mounted() {},
  methods: {
    //模拟v-model，更改imgSrc
    _fileInfo(v) {
      this.$emit('update:imgSrc', v.url)
      this.$emit('input', v.id)
    },
  },
}
</script>

<style scoped lang="scss">
.s-form-item {
  margin-bottom: 0;
}
</style>
