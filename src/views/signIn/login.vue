<template>
  <div class="login">
    <el-form
      style="width: 400px;margin: 200px auto 0"
      :model="form"
      status-icon
      :rules="rules"
      ref="form"
      label-width="100px"
    >
      <el-form-item
        label="用户名"
        prop="account"
        placeholder="用户名或邮箱"
        required
      >
        <el-input :maxlength="10" v-model="form.account"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password" required>
        <el-input
          :maxlength="16"
          type="password"
          v-model="form.password"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">提交</el-button>
        <el-button @click="resetForm('form')">重置</el-button>
      </el-form-item>
      <div
        style="display: flex;justify-content: space-between;align-items: center"
      >
        <p>
          没有账号？<a href="javascript:" @click="$jump('register')">去注册</a>
        </p>
        <a href="javascript:" @click="$jump('forgetPassword')">忘记密码</a>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      form: {
        account: '', //用户名
        password: '' //密码，
      },
      rules: {
        account: [{ min: 3, trigger: 'blur' }],
        password: [{ min: 6, trigger: 'blur' }]
      }
    }
  },
  methods: {
    //提交
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$xhr('', 'post', this.form).then(res => {
            this.$message.success(res.message || '登录成功')
            this.$jump('home')
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
