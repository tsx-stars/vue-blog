<template>
  <div class="box">
    <el-tabs value="enter">
      <el-tab-pane label="录入" name="enter">
        <el-form
          class="form"
          ref="form"
          :model="form"
          label-width="80px"
          @submit.native.prevent
        >
          <el-form-item label="标题" prop="cTitle">
            <el-input
              @keyup.enter.native="enter"
              @blur="enter"
              v-model="form.cTitle"
              placeholder="失去焦点即提交，建议先写内容"
            ></el-input>
          </el-form-item>
          <el-form-item label="内容" prop="cContent">
            <tinymce
              ref="tinymce"
              v-model="form.cContent"
              :height="300"
              style="padding-right: 2px"
            />
          </el-form-item>
          <div style="text-align: center">
            <el-button type="primary" @click="enter" style="margin-left: 20px"
              >提交</el-button
            >
          </div>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="配置" name="config">
        <el-form label-width="110px">
          <el-form-item label="Cookies">
            <el-input
              style="width: 200px"
              v-model="JSESSIONID"
              placeholder="设置 JSESSIONID"
            ></el-input>
            <el-button type="primary" @click="submit2" style="margin-left: 20px"
              >设置</el-button
            >
          </el-form-item>
          <el-form-item label="关键字">
            <el-input v-model="cKeyword"></el-input>
          </el-form-item>
          <el-form-item label="编码入参1">
            <el-input
              type="textarea"
              v-model="json"
              placeholder="autoSaveForm接口的原始入参"
            ></el-input>
          </el-form-item>
          <el-form-item label="编码入参2">
            <el-input
              type="textarea"
              v-model="json2"
              placeholder="findNextTodoTasks接口的原始入参"
            ></el-input>
          </el-form-item>
          <el-form-item label="解码后的入参" style="width: 49%">
            <div style="display: flex">
              <pre>{{ jsonShow }}</pre>
              <pre>{{ jsonShow2 }}</pre>
            </div>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import qs from 'qs'
import Cookies from 'js-cookie'
export default {
  name: 'index',
  components: {
    tinymce: () => import('@/components/Tinymce'),
    // JsonEditor: () => import('@/components/JsonEditor'),
  },
  data() {
    return {
      count: 1,
      form: {
        cTitle: '',
        cContent: '',
      },
      cKeyword: '',
      JSESSIONID: '',
      json: null,
      json2: null,
    }
  },
  computed: {
    currentJson() {
      let { json } = this
      let data
      if (json) {
        data = qs.parse(json)
        data.dataJson = JSON.parse(data.dataJson)
        data.extJson = JSON.parse(data.extJson)
        data.dataJson.cKeyword = this.cKeyword
        data.dataJson.cTitle = ''
        data.dataJson.cContent = ''
      }
      return data
    },
    jsonShow() {
      let { currentJson } = this
      return currentJson && JSON.stringify(currentJson, null, 4)
    },
    jsonShow2() {
      let { json2 } = this
      let v
      if (json2) {
        v = JSON.stringify(qs.parse(json2), null, 4)
      }
      return v
    },
  },
  created() {},
  methods: {
    enter(v) {
      if (v && this.form.cContent) {
        let cTitle = this.form.cTitle
        let cContent = this.form.cContent

        this.form.cTitle = ''
        this.form.cContent = ''
        this.$refs.tinymce.setContent('')

        this.submit(cTitle, cContent)
      } else {
        this.$message.error('请输入')
      }
    },
    submit(cTitle, cContent) {
      if (!cTitle || !cContent) {
        this.$message.error('题目(cTitle)和内容(cContent)都不能为空')
        return
      }
      if (!this.cKeyword) {
        this.$message.error('请输入关键字')
        return
      }
      if (!this.json || !this.json2) {
        this.$message.error('请输入入参1和2')
        return
      }
      let data = JSON.parse(JSON.stringify(this.currentJson))
      data.dataJson.cTitle = cTitle
      data.dataJson.cContent = cContent
      data.dataJson = JSON.stringify(data.dataJson)
      data.extJson = JSON.stringify(data.extJson)
      this.$axios({
        method: 'post',
        url: '/zsk/workFlowFormAction/autoSaveForm.json',
        withCredentials: true,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },

        data: qs.stringify(data),
      }).then((res) => {
        if (res.status === 200 && res.data && !res.data.flag) {
          this.findNextTodoTasks(res.data.processInstanceId, cTitle)
        }
      })
    },
    //确认
    findNextTodoTasks(processInstanceId, cTitle) {
      let data = qs.parse(this.json2)
      data.processInstanceId = processInstanceId
      this.$axios({
        method: 'post',
        url: '/zsk/pubWorkFlowAction/findNextTodoTasks.json',
        withCredentials: true,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
        data: qs.stringify(data),
      }).then((res) => {
        if (res.status === 200 && res.data && !res.data.flag) {
          this.$notify({
            title: `成功${this.count}`,
            message: cTitle,
            type: 'success',
          })
          this.count++
        }
      })
    },
    submit2() {
      Cookies.set('JSESSIONID', this.JSESSIONID)
      this.$message.success('设置成功')
    },
  },
}
</script>

<style scoped lang="scss">
.box {
  font-size: 14px;
  width: 1200px;
  margin: 60px auto;
  padding: 20px;
  border: 1px solid #ebebeb;
  border-radius: 3px;
  transition: 0.2s;
  &:hover {
    box-shadow: 0 0 8px 0 rgb(232 237 250 / 60%),
      0 2px 4px 0 rgb(232 237 250 / 50%);
  }
}
</style>
