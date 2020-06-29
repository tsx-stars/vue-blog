<template>
  <div class="userInfo">
    <el-form :inline="true" :model="form" class="demo-form-inline">
      <el-form-item label="账号">
        <el-input v-model="form.account" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="form.email" placeholder="邮箱"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getUserList">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table border :data="tableData" style="width: 100%;">
      <el-table-column prop="account" label="用户名"> </el-table-column>
      <el-table-column prop="password" label="密码"> </el-table-column>
      <el-table-column prop="email" label="邮箱"> </el-table-column>
      <el-table-column prop="sex" label="性别"> </el-table-column>
      <el-table-column prop="age" label="年龄"> </el-table-column>
      <el-table-column prop="contact_type" label="联系类型"> </el-table-column>
      <el-table-column prop="contact_content" label="联系内容">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small">编辑</el-button>
          <el-button @click="open(scope.row)" type="text" size="small"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="form.pageSize"
      @current-change="currentChange"
      style="float: right;margin-top: 20px"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'userInfo',
  data() {
    return {
      total: 0,
      form: {
        account: '', //用户名
        password: '', //密码，
        confirm_password: '', //确认密码，
        email: '', //邮箱
        verify_code: '', //验证码
        sex: '', //性别
        age: '', //年龄
        contact_type: '', //联系类型
        contact_content: '', //联系内容
        pageNum: 1,
        pageSize: 10
      },
      tableData: []
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    open(data) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          console.log(1)
          this.delUser(data)
        })
        .catch(() => {})
    },
    currentChange(page) {
      this.form.pageNum = page
      this.getUserList()
    },
    getUserList() {
      this.$xhr('user/userList', 'post', this.form).then(res => {
        this.total = res.data.total
        this.tableData = res.data.list.map(item => {
          return {
            ...item,
            sex: item.sex == 0 ? '女' : '男',
            contact_type:
              item.contact_type == 0
                ? '微信'
                : item.contact_type == 1
                ? 'QQ'
                : '手机号'
          }
        })
      })
    },
    delUser(data) {
      this.$xhr('user/deleteUser', 'post', { id: data.id }).then(res => {
        this.$message.success(res.message)
        this.getUserList()
      })
    }
  }
}
</script>

<style scoped lang="scss"></style>
