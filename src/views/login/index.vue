<template>
  <el-form ref="form" :model="form" :rules="rules" class="ruleForm" status-icon>
    <h2 class="title">Wuther</h2>
    <el-form-item label="用户名" prop="username">
      <el-input v-model="form.username"/>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="form.password" type="password" autocomplete="new-password"/>
    </el-form-item>
    <el-form-item label="验证码" prop="verifycode">
      <el-input v-model="form.verifycode" type="text"/>
    </el-form-item>
    <el-button type="primary" style="margin-left: 38%" @click="submitForm('form')">登陆</el-button>
  </el-form>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'Login',
  data() {
    return {
      form: {
        username: '',
        password: '',
        verifycode: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        verifycode: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.$nextTick(function() {
      var lett = this
      document.onkeydown = function(e) {
        var key = window.event.keyCode
        if (key === 13) {
          lett.submitForm('form')
        }
      }
    })
  },
  mounted() {
    this.$nextTick(function() {})
  },
  methods: {
    ...mapActions({
      login: 'auth/loginByUserName',
      loadLang: 'loadLang'
    }),
    submitForm(formName) {
      var lett = this
      this.$refs[formName].validate(valid => {
        if (valid) {
          const loading = lett.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          })
          lett.form.username = lett.common.removeSpace(lett.form.username)
          lett.form.password = lett.common.removeSpace(lett.form.password.trim())
          lett.form.verifycode = lett.common.removeSpace(lett.form.verifycode.trim())
          this.login({
            username: lett.form.username,
            password: lett.form.password,
            verifycode: lett.form.verifycode
          }).then(res => {
            if (res.code === 200) {
              loading.close()
              lett.$router.push({ path: '/home', query: {}})
            } else {
              console.warn(res.message)
              loading.close()
            }
          }).catch(err => {
            //console.warn(`获取数据失败。${err}`)
            loading.close()
          })
        } else {
          lett.$message.error('请按照要求输入登陆信息！')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
        body {
            height: 100%;
            width: 100%;
            margin: 0px;
            padding: 0px;
            line-height: 24px;
            font: 14px Helvetica Neue,Helvetica,PingFang SC,\5FAE\8F6F\96C5\9ED1,Tahoma,Arial,sans-serif;
            background: #D5D8E1;
        }

        #app {
            width: 100%;
            height: 100%;
        }
        .ruleForm {
            -webkit-border-radius: 5px;
            border-radius: 30px;
            margin: 130px auto;
            width: 350px;
            padding: 35px 35px 15px;
            background: #fff;
            border: 1px solid #eaeaea;
            box-shadow: 0 0 25px #cac6c6;
        }
        .title{
            text-align: center
        }
    </style>
