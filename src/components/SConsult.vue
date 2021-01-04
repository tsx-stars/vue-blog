<template>
  <div class="gn_fixed" @mouseleave="hoverStart">
    <div id="viewsWrapper">
      <div
        id="view1"
        :class="[
          'pt-page',
          { 'pt-page-current pt-page-moveFromRightFade': inervalIndex == 1 },
          { 'pt-page-current pt-page-moveToLeftFade': inervalIndex == 2 },
        ]"
      >
        <img src="../assets/top1.png" />
      </div>
      <div
        id="view2"
        :class="[
          'pt-page',
          { 'pt-page-current pt-page-moveFromRightFade': inervalIndex == 2 },
          { 'pt-page-current pt-page-moveToLeftFade': inervalIndex == 3 },
        ]"
      >
        <img src="../assets/top2.png" />
      </div>
      <div
        id="view3"
        :class="[
          'pt-page',
          { 'pt-page-current pt-page-moveFromRightFade': inervalIndex == 3 },
          { 'pt-page-current pt-page-moveToLeftFade': inervalIndex == 1 },
        ]"
      >
        <img src="../assets/top3.png" />
      </div>
    </div>
    <div class="kefu_box" @mouseenter="hoverStop">
      <a class="xuni">咨<br />询<br />.<br />反<br />馈</a>
      <div class="tab_tips" ref="sideLeft">
        <a
          href="https://www.hs.net/doc/200505_200506.html"
          eid="19"
          target="_blank"
        >
          <i class="contact-tel"></i>
          <div class="text-wrapper">
            <p class="title">咨询电话</p>
            <p class="des orange">0571-26695555-7</p>
          </div>
        </a>
        <a
          href="https://cschat.antcloud.com.cn/index.htm?tntInstId=INDIMECN&scene=SCE00004367"
          eid="20"
          target="_blank"
        >
          <i class="chat"></i>
          <div class="text-wrapper">
            <p class="title">在线客服</p>
            <p class="des">即时咨询，工作日 9：00~18：00</p>
          </div>
        </a>
        <!--<a eid="21">
          <i class="contact"></i>
          <div class="text-wrapper">
            <p id="submitWorkOrder" class="title" @click="gongdanBox = true">
              提交工单
            </p>
            <p class="des">这里可以反馈您的问题/建议/需求</p>
          </div>
        </a>-->
      </div>
    </div>
    <!--    <a class="totop" id="to_top" @click="backTop()"></a>-->
    <h-msgBox
      v-model="gongdanBox"
      title="提交工单"
      :mask-closable="false"
      @on-close="cancel"
    >
      <h-form :model="formItem" :label-width="80" ref="formItem">
        <h-form-item label="类型" required prop="feedback_type">
          <h-select v-model="formItem.feedback_type" filterable>
            <h-option value="3">需求</h-option>
            <h-option value="2">建议</h-option>
            <h-option value="1">问题</h-option>
          </h-select>
        </h-form-item>
        <h-form-item label="联系人" prop="contact_name">
          <h-input
            v-model="formItem.contact_name"
            placeholder="请输入"
          ></h-input>
        </h-form-item>
        <h-form-item label="联系电话" prop="contact_phone">
          <h-input
            v-model="formItem.contact_phone"
            placeholder="请输入"
          ></h-input>
        </h-form-item>
        <h-form-item label="具体描述" required prop="content">
          <h-input
            v-model="formItem.content"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 5 }"
            placeholder="请输入具体的问题描述，如涉及产品，使用场景等"
          ></h-input>
        </h-form-item>
        <h-form-item label="提交人手机" prop="phone" required>
          <h-input v-model="formItem.phone" placeholder="请输入"></h-input>
        </h-form-item>
        <h-form-item label="验证码" required>
          <h-row>
            <h-col span="17">
              <h-form-item prop="checkcode">
                <h-input
                  v-model="formItem.checkcode"
                  placeholder="请输入"
                ></h-input>
              </h-form-item>
            </h-col>
            <h-col span="7">
              <h-button
                v-if="sendAuthCode"
                type="text"
                style="color: #00adf4"
                @click="getCode"
                >获取验证码</h-button
              >
              <span
                v-if="!sendAuthCode"
                style="color: #c3cbd6; padding-left: 5px"
              >
                <span>{{ auth_time }}</span> 秒后可再次获取
              </span>
            </h-col>
          </h-row>
        </h-form-item>
      </h-form>
      <div slot="footer">
        <h-button type="ghost" @click="cancel">取消</h-button>
        <h-button type="primary" @click="ok">确定</h-button>
      </div>
    </h-msgBox>
  </div>
</template>
<script>
export default {
  name: 'SConsult',
  data() {
    return {
      slideShow: false,
      inervalIndex: 1,
      outClass: 'pt-page-moveToLeftFade',
      inClass: 'pt-page-moveFromRightFade',
      intervalItem: '',

      seen: false,
      gongdanBox: false,
      formItem: {
        content: '', //具体描述
        contact_name: '', //联系人
        contact_phone: '', //联系电话
        feedback_type: '', //类型
        phone: '', //提交人手机
        checkcode: '', //验证码
      },
      sendAuthCode: true, // 显示按钮还是倒计时
      auth_time: '', // 倒计时时间
    }
  },
  props: {
    itemList: {
      type: Array,
      default() {
        return []
      }, //用于接受父组件传递的值
    },
  },
  mounted() {
    this.inerval()
  },
  methods: {
    hoverStart() {
      clearInterval(this.intervalItem)
      this.inerval()
    },
    hoverStop() {
      clearInterval(this.intervalItem)
    },
    inerval() {
      let that = this
      this.intervalItem = setInterval(function () {
        //that.changeView('#view' + that.inervalIndex)
        if (that.inervalIndex == 3) {
          that.inervalIndex = 1
        } else {
          that.inervalIndex++
        }
      }, 2000)
    },

    ok() {
      this.gongdanBox = true
      this.$refs['formItem'].validate((valid) => {
        if (valid) {
          let data = this.formItem
          this.$xhr(
            window.App.gongdan + '/cloud/open/feedback/addFeedbackInfo.json',
            'post',
            data,
            { formDate: true }
          ).then((res) => {
            if (res.success) {
              this.$hMessage.success('表单提交成功!')
              this.gongdanBox = false
              this.$refs['formItem'].resetFields()
            } else {
              this.$hMessage.error(res.data.errorMessage)
            }
          })
        } else {
          this.$hMessage.error('表单验证失败!')
        }
      })
    },
    cancel() {
      this.gongdanBox = false
      this.$refs['formItem'].resetFields()
    },
    // 获取验证码
    getCode() {
      let data = {
        phone: this.formItem.phone,
      }
      if (/^1[3456789]\d{9}$/.test(data.phone)) {
        this.sendAuthCode = false
        this.auth_time = 60
        let auth_timetimer = setInterval(() => {
          this.auth_time--
          if (this.auth_time <= 0) {
            this.sendAuthCode = true
            clearInterval(auth_timetimer)
          }
        }, 1000)
        this.$xhr(
          window.App.gongdan + '/cloud/open/getCheckCode.json',
          'post',
          data,
          { formDate: true }
        ).then((res) => {
          if (res.success) {
            this.$hMessage.success('验证码发送成功')
          } else {
            this.$hMessage.error(res.error_info)
          }
        })
      } else {
        this.$hMessage.error('请输入正确的手机号!')
      }
    },
    /*submitWorkShow() {
      this.$refs.workOrder.formItem = Object.assign({}, {})
      this.$refs.workOrder.$refs.formItem.resetFields()
      this.$refs.workOrder.formItem.feedback_type = '3'
      this.$refs.workOrder.workOrderShow = true
    },*/
    /*leftDisplay() {
      this.$refs.sideLeft.className = 'animate__slideInRight'
      this.slideShow = true
      this.$refs.sideLeft.style.display = 'block'
      this.$refs.sideLeft.style.opacity = 1
      this.$refs.sideLeft.style.width = '314px'
      this.$refs.sideLeft.style.left = '-288px'
    },
    leftNone() {
      this.$refs.sideLeft.className = ''
      this.slideShow = false
      this.$refs.sideLeft.style.display = 'none'
      this.$refs.sideLeft.style.opacity = 0
      this.$refs.sideLeft.style.width = 0
      this.$refs.sideLeft.style.left = 0
    },
    changeView(newView) {
      currPage = document.querySelector('.pt-page-current')[0]
      nextPage = document.querySelector(newView)
      currPage.className = 'pt-page pt-page-current'
      nextPage.className = 'pt-page pt-page-current'
    },*/
  },
}
</script>
<style lang="scss" scoped>
.gn_fixed {
  position: fixed;
  bottom: 200px;
  right: 30px;
  z-index: 111;
}

.kefu_box .xuni {
  width: 40px;
  height: 125px;
  cursor: pointer;
  display: block;
  background-image: linear-gradient(152deg, #d190ff 0%, #a457ff 100%);
  box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.08);
  border-radius: 5px;
  font-size: 16px;
  color: #ffffff;
  line-height: 19px;
  text-align: center;
  padding-top: 19px;
}

.contentCloudMarket .api_list li.hoverli,
.contentCloudMarket .api_tjfw li.hoverli {
  -webkit-box-shadow: 0 0 15px rgba(165, 225, 252, 0.9);
  -moz-box-shadow: 0 0 15px rgba(165, 225, 252, 0.9);
}

.kefu_box {
  position: relative;
  padding: 0 0 0 30px;
  &:hover {
    .tab_tips {
      width: 314px;
      left: -288px;
    }
  }
}

.gn_fixed .tab_tips {
  position: absolute;
  top: -10px;
  border: none;
  width: 0;
  opacity: 1;
  left: -270px;
  overflow: hidden;
  background: url(../assets/bg.png) center center no-repeat;
  transition: left 0.15s linear;
}

.gn_fixed .tab_tips a {
  position: relative;
  display: block;
  height: 68px;
  //color: #51b0f3
}

.gn_fixed .tab_tips a:hover > .text-wrapper > .title {
  color: #0ae;
}

.gn_fixed .tab_tips a i {
  height: 68px;
  width: 24px;
  display: inline-block;
  margin: 0 10px 0 20px;
}

.gn_fixed .tab_tips a i.contact-tel {
  background: url(../assets/tel.png) center center no-repeat;
}

.gn_fixed .tab_tips a i.chat {
  background: url(../assets/hh.png) center center no-repeat;
}

.gn_fixed .tab_tips a i.contact {
  background: url(../assets/fk.png) center center no-repeat;
}

.gn_fixed .tab_tips a .text-wrapper {
  margin: 17px auto 10px 0;
  vertical-align: top;
  display: inline-block;
  height: 48px;
}

.gn_fixed .tab_tips a .text-wrapper .title {
  font-family: MicrosoftYaHei;
  font-size: 14px;
  color: #333;
  letter-spacing: 0;
  line-height: 14px;
  text-align: left;
  height: 20px;
}

.gn_fixed .tab_tips a .text-wrapper .des {
  font-family: MicrosoftYaHei;
  font-size: 12px;
  color: #999;
  letter-spacing: 0;
  line-height: 12px;
  text-align: left;
}

.gn_fixed .tab_tips a .text-wrapper .orange {
  color: #f77238;
}

.gn_fixed > a.totop {
  display: none;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 0;
  //background: url(../../../images/backTop/toTop.png) no-repeat;
  position: fixed;
  bottom: 30px;
  right: 28px;
}
#viewsWrapper {
  width: 50px;
  height: 43px;
  overflow: hidden;
  text-align: center;
  padding: 0 10px;
  position: absolute;
  left: 23px;
  top: -15px;
  z-index: 55;
}

#view1 {
  background: transparent;
}

#view2 {
  background: transparent;
}

#view3 {
  background: transparent;
}

.pt-page {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  visibility: hidden;
  overflow: hidden;
  -webkit-backface-visibility: hidden;
  -moz-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-transform: translate3d(0, 0, 0);
  -moz-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
  -webkit-transform-style: preserve-3d;
  -moz-transform-style: preserve-3d;
  transform-style: preserve-3d;
}

.pt-page-current,
.no-js .pt-page {
  visibility: visible;
  z-index: 1;
}
.pt-page-moveToLeftFade {
  -webkit-animation: moveToLeftFade 1.5s ease both;
  -moz-animation: moveToLeftFade 1.5s ease both;
  animation: moveToLeftFade 1.5s ease both;
}

.pt-page-moveFromLeftFade {
  -webkit-animation: moveFromLeftFade 0.7s ease both;
  -moz-animation: moveFromLeftFade 0.7s ease both;
  animation: moveFromLeftFade 0.7s ease both;
}

.pt-page-moveToRightFade {
  -webkit-animation: moveToRightFade 0.7s ease both;
  -moz-animation: moveToRightFade 0.7s ease both;
  animation: moveToRightFade 0.7s ease both;
}

.pt-page-moveFromRightFade {
  -webkit-animation: moveFromRightFade 1.5s ease both;
  -moz-animation: moveFromRightFade 1.5s ease both;
  animation: moveFromRightFade 1.5s ease both;
}

@-webkit-keyframes moveToLeftFade {
  0% {
    opacity: 1;
    -webkit-transform: translateX(0%);
  }
  70% {
    opacity: 0;
    -webkit-transform: translateX(-30%);
  }
  100% {
    opacity: 0;
    -webkit-transform: translateX(-100%);
  }
}
@-moz-keyframes moveToLeftFade {
  0% {
    opacity: 1;
    -webkit-transform: translateX(0%);
  }
  70% {
    opacity: 0;
    -webkit-transform: translateX(-30%);
  }
  100% {
    opacity: 0;
    -webkit-transform: translateX(-100%);
  }
}
@keyframes moveToLeftFade {
  0% {
    opacity: 1;
    -webkit-transform: translateX(0%);
  }
  70% {
    opacity: 0;
    -webkit-transform: translateX(-30%);
  }
  100% {
    opacity: 0;
    -webkit-transform: translateX(-100%);
  }
}

@-webkit-keyframes moveFromLeftFade {
  from {
    opacity: 0.3;
    -webkit-transform: translateX(-100%);
  }
}
@-moz-keyframes moveFromLeftFade {
  from {
    opacity: 0.3;
    -moz-transform: translateX(-100%);
  }
}
@keyframes moveFromLeftFade {
  from {
    opacity: 0.3;
    transform: translateX(-100%);
  }
}

@-webkit-keyframes moveToRightFade {
  to {
    opacity: 0.3;
    -webkit-transform: translateX(100%);
  }
}
@-moz-keyframes moveToRightFade {
  to {
    opacity: 0.3;
    -moz-transform: translateX(100%);
  }
}
@keyframes moveToRightFade {
  to {
    opacity: 0.3;
    transform: translateX(100%);
  }
}

@-webkit-keyframes moveFromRightFade {
  /*from { opacity: 0; -webkit-transform: translateX(100%); }*/
  0% {
    opacity: 0;
    -webkit-transform: translateX(100%);
  }
  30% {
    opacity: 0;
    -webkit-transform: translateX(30%);
  }
  100% {
    opacity: 1;
    -webkit-transform: translateX(0%);
  }
}
@-moz-keyframes moveFromRightFade {
  /*from { opacity: 0; -moz-transform: translateX(100%); }*/
  0% {
    opacity: 0;
    -webkit-transform: translateX(100%);
  }
  30% {
    opacity: 0;
    -webkit-transform: translateX(30%);
  }
  100% {
    opacity: 1;
    -webkit-transform: translateX(0%);
  }
}
@keyframes moveFromRightFade {
  /*from { opacity: 0; transform: translateX(100%); }*/
  0% {
    opacity: 0;
    -webkit-transform: translateX(100%);
  }
  30% {
    opacity: 0;
    -webkit-transform: translateX(30%);
  }
  100% {
    opacity: 1;
    -webkit-transform: translateX(0%);
  }
}
</style>
