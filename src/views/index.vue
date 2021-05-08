<template>
  <div class="box">
    <el-tabs value="config">
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
        <div @click="query">查询</div>
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
      json:
        'flag=true&type=knowledge&dataJson=%7B%22cTitle%22%3A%22%E7%AE%80%E8%BF%B0%E4%B8%80%E4%B8%8Bsrc%E4%B8%8Ehref%E7%9A%84%E5%8C%BA%E5%88%AB%22%2C%22cType%22%3A%2241%22%2C%22cCategory%22%3A%229%22%2C%22cBusinessSystemId%22%3A%22202012301426431227276934%22%2C%22cBusinessSystemName%22%3A%22HUNDSUN%E5%BC%80%E5%8F%91%E8%80%85%E7%A4%BE%E5%8C%BA%E6%9C%8D%E5%8A%A1V1.0%22%2C%22cAuthor%22%3A%22%E5%94%90%E7%9B%9B%E5%85%B4%22%2C%22cKeyword%22%3A%22%E5%9F%BA%E6%9C%AC%E7%9F%A5%E8%AF%86++%E5%9F%BA%E7%A1%80++HUNDSUN%E5%BC%80%E5%8F%91%E8%80%85%E7%A4%BE%E5%8C%BA%E6%9C%8D%E5%8A%A1V1.0%22%2C%22cContent%22%3A%22%3Cp+style%3D%5C%22box-sizing%3A+border-box%3B+margin-top%3A+0px%3B+margin-bottom%3A+0px%3B+padding%3A+8px+0px%3B+list-style%3A+none%3B+border%3A+none%3B+outline%3A+none%3B+line-height%3A+1.8%3B+color%3A+rgb(51%2C+51%2C+51)%3B+font-family%3A+%26quot%3BMicrosoft+YaHei%26quot%3B%2C+Verdana%2C+Arial%2C+Helvetica%2C+sans-serif%3B+white-space%3A+normal%3B+background-color%3A+rgb(255%2C+255%2C+255)%3B%5C%22%3Ehref+%E6%98%AF%E6%8C%87%E5%90%91%E7%BD%91%E7%BB%9C%E8%B5%84%E6%BA%90%E6%89%80%E5%9C%A8%E4%BD%8D%E7%BD%AE%EF%BC%8C%E5%BB%BA%E7%AB%8B%E5%92%8C%E5%BD%93%E5%89%8D%E5%85%83%E7%B4%A0(%E9%94%9A%E7%82%B9)%E6%88%96%E5%BD%93%E5%89%8D%E6%96%87%E6%A1%A3(%E9%93%BE%E6%8E%A5)%E4%B9%8B%E9%97%B4%E7%9A%84%E9%93%BE%E6%8E%A5%EF%BC%8C%E7%94%A8%E4%BA%8E%E8%B6%85%E9%93%BE%E6%8E%A5%E3%80%82%3C%2Fp%3E%3Cp+style%3D%5C%22box-sizing%3A+border-box%3B+margin-top%3A+0px%3B+margin-bottom%3A+0px%3B+padding%3A+8px+0px%3B+list-style%3A+none%3B+border%3A+none%3B+outline%3A+none%3B+line-height%3A+1.8%3B+color%3A+rgb(51%2C+51%2C+51)%3B+font-family%3A+%26quot%3BMicrosoft+YaHei%26quot%3B%2C+Verdana%2C+Arial%2C+Helvetica%2C+sans-serif%3B+white-space%3A+normal%3B+background-color%3A+rgb(255%2C+255%2C+255)%3B%5C%22%3Esrc%E6%98%AF%E6%8C%87%E5%90%91%E5%A4%96%E9%83%A8%E8%B5%84%E6%BA%90%E7%9A%84%E4%BD%8D%E7%BD%AE%EF%BC%8C%E6%8C%87%E5%90%91%E7%9A%84%E5%86%85%E5%AE%B9%E5%B0%86%E4%BC%9A%E5%B5%8C%E5%85%A5%E5%88%B0%E6%96%87%E6%A1%A3%E4%B8%AD%E5%BD%93%E5%89%8D%E6%A0%87%E7%AD%BE%E6%89%80%E5%9C%A8%E4%BD%8D%E7%BD%AE%3B%E5%9C%A8%E8%AF%B7%E6%B1%82src%E8%B5%84%E6%BA%90%E6%97%B6%E4%BC%9A%E5%B0%86%E5%85%B6%E6%8C%87%E5%90%91%E7%9A%84%E8%B5%84%E6%BA%90%E4%B8%8B%E8%BD%BD%E5%B9%B6%E5%BA%94%E7%94%A8%E5%88%B0%E6%96%87%E6%A1%A3%E5%86%85%EF%BC%8C%E4%BE%8B%E5%A6%82js%E8%84%9A%E6%9C%AC%EF%BC%8Cimg%E5%9B%BE%E7%89%87%E5%92%8Cframe%E7%AD%89%E5%85%83%E7%B4%A0%E3%80%82%E5%BD%93%E6%B5%8F%E8%A7%88%E5%99%A8%E8%A7%A3%E6%9E%90%E5%88%B0%E8%AF%A5%E5%85%83%E7%B4%A0%E6%97%B6%EF%BC%8C%E4%BC%9A%E6%9A%82%E5%81%9C%E5%85%B6%E4%BB%96%E8%B5%84%E6%BA%90%E7%9A%84%E4%B8%8B%E8%BD%BD%E5%92%8C%E5%A4%84%E7%90%86%EF%BC%8C%E7%9B%B4%E5%88%B0%E5%B0%86%E8%AF%A5%E8%B5%84%E6%BA%90%E5%8A%A0%E8%BD%BD%E3%80%81%E7%BC%96%E8%AF%91%E3%80%81%E6%89%A7%E8%A1%8C%E5%AE%8C%E6%AF%95%EF%BC%8C%E5%9B%BE%E7%89%87%E5%92%8C%E6%A1%86%E6%9E%B6%E7%AD%89%E5%85%83%E7%B4%A0%E4%B9%9F%E5%A6%82%E6%AD%A4%EF%BC%8C%E7%B1%BB%E4%BC%BC%E4%BA%8E%E5%B0%86%E6%89%80%E6%8C%87%E5%90%91%E8%B5%84%E6%BA%90%E5%B5%8C%E5%85%A5%E5%BD%93%E5%89%8D%E6%A0%87%E7%AD%BE%E5%86%85%E3%80%82%E8%BF%99%E4%B9%9F%E6%98%AF%E4%B8%BA%E4%BB%80%E4%B9%88%E5%B0%86js%E8%84%9A%E6%9C%AC%E6%94%BE%E5%9C%A8%E5%BA%95%E9%83%A8%E8%80%8C%E4%B8%8D%E6%98%AF%E5%A4%B4%E9%83%A8%E3%80%82%3C%2Fp%3E%3Cp%3E%3Cbr%2F%3E%3C%2Fp%3E%22%2C%22attachIds%22%3A%22%22%2C%22cDomainId%22%3A%22202007201712424741195503%22%7D&extJson=%7B%22savebtn%22%3A%22transition+1%22%2C%22hsBpmActionName%22%3A%22%E6%8F%90%E4%BA%A4%22%2C%22type%22%3A%22knowledge%22%7D&submitWorkflow=1&hsBpmKey=KNOWLEDGE_GTN&actionValue=transition+1&starts=1&associateFlag=0&domainId=202007201712424741195503',
      json2:
        'processInstanceId=202105081657553924243515&starts=true&pageIndex=0&limit=5',
      arr: [],
      current: 0,
      timer: null,
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
  created() {
    let count = 0
    let a = {
      get() {
        return count++
      },
    }
  },
  beforeDistroy() {
    clearInterval(this.timer)
  },
  methods: {
    query() {
      let data = `start=0&limit=999&pageIndex=0&cDomainId=&businessSystemId=&businessBelong=&createUser=&status=&type=&title=&cCreateUserDepartment=&cCreateUserDepartmentName=&cKnowledgeNo=&author=%E6%B1%AA%E5%9C%A3%E7%8F%8D&createSelect=customize&createDatetimeStart=&createDatetimeEnd=`
      this.$axios({
        method: 'post',
        url: '/zsk/knowledgeAction/getKnowledgeList.json',
        withCredentials: true,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
        data,
      }).then((res) => {
        let arr = res.data.rows
        this.arr = arr.slice(arr.length - 227, arr.length - 127)
        this.current = 0
        this.recursionSubmit()
      })
    },
    //递归提交
    recursionSubmit() {
      let item = this.arr[this.current]
      if (!item) {
        alert('ok')
        return
      }
      this.current++
      this.$axios({
        method: 'post',
        url: '/zsk/knowledgeAction/getKnowledgeById.json',
        withCredentials: true,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
        data: qs.stringify({ knowledgeId: item.id }),
      }).then((res) => {
        let { ctitle, ccontent, ckeyword } = res.data.Knowledge
        this.cKeyword = ckeyword
        this.submit(ctitle, ccontent)
        let s = (Math.random() * (20 - 10) + 10) * 1000
        setTimeout(() => {
          this.recursionSubmit()
        }, s)
      })
    },
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
