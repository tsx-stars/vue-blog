<template>
  <div class="base-input">
    <div :class="['input', showErrorMsg && 'error-input']">
      <span class="area" v-if="phoneType">+86</span>
      <input
        ref="baseInput"
        v-bind="$attrs"
        v-on="$listeners"
        :value="inputValue"
        @input="baseInputInput"
        @blur="baseInputBlur"
        @focus="baseInputFocus"
      />
      <span
        :class="['validation-code', startCountDown && 'bg-gray']"
        v-if="validationType"
        ><span @click.stop.prevent="getValidationCode" v-if="!startCountDown"
          >{{ validationCodeText }}</span
        ><span v-else>{{ count }}s</span></span
      >
      <span class="captcha" v-if="captchaType" @click.stop="clickCaptchaImg"
        ><img :src="captchaImg" alt="图形验证码"
      /></span>
      <span
        class="eye"
        v-if="showEye"
        @click.stop="baseInputShowPwd"
      >
        <i
          :class="['iconfont', showCloseEye ? 'icon-eye-close' : 'icon-browse']"
        ></i>
      </span>
    </div>
    <div class="input-error-messages">
      <div class="strength-tips" v-if="passwordType && isFocus && inputValue !== ''">
        <div class="pwd-strength">
          <p>密码强度 {{ pwdStrengthText }}</p>
          <div class="strength-progress">
            <span v-show="pwdStrength >= 1"></span>
            <span v-show="pwdStrength >= 2"></span>
            <span v-show="pwdStrength >= 3"></span>
          </div>
        </div>
        <div class="tips">
          长度为6-16字符，包含数字、大小写字母，建议添加特殊符号，会显著提高密码安全性
        </div>
      </div>
      <div class="messages" v-else-if="showErrorMsg">
        {{ errorMsg }}
      </div>
    </div>
  </div>
</template>

<script>
const VALIDATOR_TYPE = {
  PHONE_NULL: '手机号为空',
  PHONE_ERROR: '请输入正确的手机号'
}
const VALIDATOR = {
  phoneValidator: (phone = '') => {
    if (phone === '') {
      return VALIDATOR_TYPE.PHONE_NULL
    }
    if (!phone || /^1[3456789]\d{9}$/.test(phone)) {
      return true
    }
    return VALIDATOR_TYPE.PHONE_ERROR
  },
  nullStringValidator: (val = '') => {
    if (val.trim() === '') {
      return true
    }
    return false
  }
}
export default {
  name: 'BaseInput',
  model: {
    event: 'customInput',
    prop: 'inputValue'
  },
  props: {
    validationCodeText: {
      type: String,
      default: '获取短信验证码'
    },
    pwdStrength: {
      type: Number,
      default: 1
    },
    showType: {
      type: String,
      default: ''
    },
    inputValue: {
      type: String,
      default: ''
    },
    messages: {
      type: String,
      default: ''
    },
    captchaImg: {
      type: String,
      default: ''
    },
    valid: {
      type: Boolean,
      default: false
    },
    rules: {
      type: Object,
      default: () => ({
        validator: undefined, // 校验类型
        customValidation: undefined // 自定义校验方法
      })
    },
    clickDisabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      builtInMsg: '',
      startCountDown: false,
      count: 60,
      showEye: false,
      showCloseEye: true,
      isFocus: false
    }
  },
  computed: {
    phoneType () {
      return this.showType === 'phone'
    },
    validationType () {
      return this.showType === 'validationCode'
    },
    captchaType () {
      return this.showType === 'captcha'
    },
    passwordType () {
      return this.showType === 'password'
    },
    errorMsg () {
      if (this.messages !== '') {
        return this.messages
      } else {
        return this.builtInMsg
      }
    },
    showErrorMsg () {
      return this.errorMsg && typeof this.errorMsg === 'string'
    },
    pwdStrengthText () {
      switch (this.pwdStrength) {
        case 1:
          return '弱'
        case 2:
          return '中'
        case 3:
          return '强'

        default:
          break
      }
    }
  },
  watch: {
    clickDisabled (val) {
      if (!val) {
        this.countDown()
      }
    }
  },
  mounted () {
    this.showEye = this.$refs.baseInput.type === 'password'
  },
  methods: {
    baseInputShowPwd () {
      this.showCloseEye = !this.showCloseEye
      this.$refs.baseInput.type = this.showCloseEye ? 'password' : 'text'
    },
    baseInputInput (e) {
      const v = e.target.value
      this.$emit('customInput', v)
    },
    baseInputFocus () {
      this.builtInMsg = ''
      if (this.passwordType) {
        this.isFocus = true
      }
    },
    baseInputBlur () {
      if (this.passwordType) {
        this.isFocus = false
      }
      if (!this.valid) {
        return
      }
      if (!this.phoneType) {
        const isNull = VALIDATOR.nullStringValidator(this.inputValue)
        this.builtInMsg = isNull
          ? this.$refs.baseInput.attributes.placeholder.value
          : ''
      }
      if (this.rules.validator) {
        const noErrorMsg = VALIDATOR[this.rules.validator](this.inputValue)
        if (!this.rules.customValidation && noErrorMsg === true) {
          this.builtInMsg = ''
        } else {
          this.builtInMsg = noErrorMsg
        }
      }
    },
    getValidationCode () {
      this.$emit('getValidationCode')
    },
    clickCaptchaImg () {
      this.$emit('clickCaptchaImg')
    },
    countDown () {
      if (this.startCountDown || this.clickDisabled) {
        return
      }
      this.startCountDown = true
      this.getValidationCodeTimer = setInterval(() => {
        this.count--
        if (this.count === 0) {
          this.count = 60
          this.startCountDown = false
          this.$emit('update:clickDisabled', true)
          clearInterval(this.getValidationCodeTimer)
        }
      }, 1000)
    }
  }
}
</script>

<style lang="less" scoped>
input[type="password"]::-ms-reveal {
  display: none;
}
.iconfont {
  font-size: 40px;
  color: #a8a8a8;
}
.base-input {
  * {
    box-sizing: border-box;
    font-family: PingFangSC-Regular;
  }
  > div.input {
    display: flex;
    margin: 0 auto;
    width: 668px;
    height: 89px;
    border: 2px solid #d9d9d9;
    border-radius: 10px;
    overflow: hidden;
    &.error-input {
      border: 2px solid #ff3030;
    }
    input {
      flex: 1;
      height: 100%;
      font-size: 28px;
      line-height: 26.2px;
      padding-left: 30px;
    }
    .area,
    .validation-code,
    .captcha,
    .eye {
      display: inline-block;
      width: 155px;
      height: 100%;
      background: #f7f7f7;
      font-size: 28px;
      color: #333333;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .validation-code {
      width: 243px;
      background: #3060ff;
      color: #fff;
    }
    span.bg-gray {
      background: #f7f7f7;
      color: #333;
    }
    .captcha {
      width: 243px;
      border-left: 1px solid #d9d9d9;
    }
    .eye {
      width: 80px;
      background: none;
    }
  }
  > .input-error-messages {
    width: 668px;
    min-height: 32px;
    margin: 5px auto;
    position: relative;
    > .messages {
      position: absolute;
      top: 0;
      width: 668px;
      font-size: 24px;
      color: #ff3030;
    }
    > .strength-tips {
      width: 668px;
      font-size: 24px;
      color: #ff3030;
      padding: 14px 0;
      > .pwd-strength {
        display: flex;
        justify-content: space-between;
        align-items: center;
        > .strength-progress {
          width: 500px;
          transform: translateY(-25%);
          > span {
            display: inline-block;
            width: 155px;
            height: 6px;
            margin-left: 5px;
            &:first-child {
              background: #ff3030;
            }
            &:nth-child(2) {
              background: #ff791a;
            }
            &:last-child {
              background: #3060ff;
            }
          }
        }
      }

      > .tips {
        margin-top: 10px;
        font-size: 22px;
        line-height: 32px;
        color: #a8a8a8;
        width: 670px;
        padding: 12px 8px;
        background: #f8f8f8;
        border-radius: 12px;
      }
    }
  }
}
</style>
