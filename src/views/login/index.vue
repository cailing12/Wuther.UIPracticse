<template>
  <el-form ref="form" :model="form" :rules="rules" class="ruleForm" status-icon>
    <h2 class="title">Wuther</h2>
    <el-form-item label="用户名" prop="username">
      <el-input v-model="form.username"/>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="form.password" type="password" autocomplete="new-password"/>
    </el-form-item>
    <el-form-item label="唯一识别码" prop="webid">
      <el-input v-model="form.webid" type="text"/>
    </el-form-item>
    <el-button type="primary" style="margin-left: 38%" @click="login('form')">登陆</el-button>
  </el-form>
</template>
<script>
import Cookies from 'js-cookie'
export default {
  name: 'Login',
  data() {
    return {
      form: {
        username: '',
        password: '',
        webid: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        webid: [
          { required: true, message: '请输入唯一识别码', trigger: 'blur' }
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
          lett.login('form')
        }
      }
    })
  },
  mounted() {
    this.$nextTick(function() {})
  },
  methods: {
    login(formName) {
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
          lett.form.webid = lett.common.removeSpace(lett.form.webid.trim())
          // lett.form.password = b64_md5(lett.form.password)
          this.$axios({
            url: 'https://localhost:44306/api/login',
            method: 'get'
          }).then(res => {
            if (res.code === 200) {
              Cookies.set('username', 'lett.form.username')
              Cookies.set('isLogin', true)
              loading.close()
              this.$router.push({ path: '/home', query: {}})
            }
          }).catch(err => {
            console.warn(`获取数据失败。${err}`)
            loading.close()
          })
          // lett.$http
          //   .post('/Login/login', { user: lett.form }, { emulateJSON: true })
          //   .then(
          //     function(res) {
          //       if (res.body.code === 200) {
          //         // window.location.href = '/Home/Index'
          //         // this.$router.push({ path: '/home', query: {}})
          //       } else {
          //         alert(res.body.msg)
          //       }
          //       loading.close()
          //     },
          //     function(res) {
          //       console.log(res.status)
          //     }
          //   )
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
