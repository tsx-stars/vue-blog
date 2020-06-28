<template>
  <div class="register">
    <el-form
      style="width: 400px;margin: 200px auto 0"
      :model="form"
      status-icon
      :rules="rules"
      ref="form"
      label-width="100px"
    >
      <el-form-item label="用户名" prop="account" required>
        <el-input :maxlength="10" v-model="form.account"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password" required>
        <el-input
          :maxlength="16"
          type="password"
          v-model="form.password"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="confirm_password" required>
        <el-input
          :maxlength="16"
          type="password"
          v-model="form.confirm_password"
        ></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email" required>
        <el-input :maxlength="20" v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="verify_code" required>
        <el-input
          style="width: 60%;margin-right: 8px"
          v-model="form.verify_code"
        ></el-input>
        <el-button
          @click.prevent="get_verify_code"
          style="width: 110px"
          type="primary"
          >{{ verify_text }}</el-button
        >
      </el-form-item>
      <el-form-item label="性别" prop="sex" required>
        <el-radio-group v-model="form.sex">
          <el-radio label="1">男</el-radio>
          <el-radio label="0">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input v-model.number="form.age"></el-input>
      </el-form-item>
      <el-form-item prop="contact_content">
        <template slot="label">
          <el-select v-model="form.contact_type">
            <el-option label="微信" value="0"></el-option>
            <el-option label="QQ" value="1"></el-option>
            <el-option label="手机号" value="2"></el-option>
          </el-select>
        </template>
        <el-input v-model.number="form.contact_content"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">提交</el-button>
        <el-button @click="resetForm('form')">重置</el-button>
      </el-form-item>
      <div>
        <a style="float: right" href="javascript:" @click="$jump('login')"
          >返回登录</a
        >
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'register',
  data() {
    let validate_age = (rule, value, callback) => {
      if (value && !Number.isInteger(value)) {
        callback(new Error('请输入数字值'))
      } else if (value && value <= 0) {
        callback(new Error('必须大于0岁'))
      } else {
        callback()
      }
    }
    let validate_confirm_password = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      verify_text: '获取验证码',
      form: {
        account: '', //用户名
        password: '', //密码，
        confirm_password: '', //确认密码，
        email: '', //邮箱
        verify_code: '', //验证码
        sex: '1', //性别
        age: '', //年龄
        contact_type: '0', //联系类型
        contact_content: '' //联系内容
      },
      rules: {
        account: [{ min: 3, trigger: 'blur' }],
        password: [{ min: 6, trigger: 'blur' }],
        confirm_password: [
          { validator: validate_confirm_password, trigger: 'blur' }
        ],
        email: [{ type: 'email', trigger: 'blur' }],
        verify_code: [{ min: 4, max: 6, trigger: 'blur' }],
        age: [{ validator: validate_age, trigger: 'blur' }]
        // contact_content: [{ required: true, trigger: 'blur' }]
      }
    }
  },
  mounted() {
    if (process.env.NODE_ENV === 'development') {
      let str = '001'
      let form = {
        account: str, //用户名
        password: '123456', //密码，
        confirm_password: '123456', //确认密码，
        email: `${str}@qq.com`, //邮箱
        verify_code: '123456', //验证码
        age: 18, //年龄
        contact_content: '联系内容' //联系内容
      }
      Object.assign(this.form, form)
    }
  },
  methods: {
    //获取验证码
    get_verify_code() {
      if (this.verify_text !== '获取验证码') return
      let count = 10
      this.$xhr('fsyzm', 'post', { email: this.form.email }).then(res => {
        let time = setInterval(() => {
          if (this.verify_text <= 0) {
            this.verify_text = '获取验证码'
            clearInterval(time)
          } else {
            this.verify_text = count--
          }
        }, 1000)
      })
    },
    //提交
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$xhr('user/register', 'post', this.form).then(res => {
            this.$message.success(res.message || '注册成功')
            this.$jump('login')
          })
        }
      })
    },
    //重置
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style scoped lang="scss"></style>
