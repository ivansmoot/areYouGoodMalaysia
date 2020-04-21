<template>
  <div class="mydiv">
    <div v-show="dialog_visible" class="text-center mb-4">
      <img class="mb-4" src="../../static/img/k8s-logo.png" alt="">
      <h1 class="h3 mb-3 font-weight-normal">
        注册
      </h1>
      <p>
        Be agile
      </p>
    </div>

    <el-form
      ref="ruleForm"
      status-icon
      :rules="rules"
      :model="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
      style="margin-left: -30px"
    >
      <el-form-item label="账号" prop="account">
        <el-input v-model="ruleForm.account" style="width: 400px" placeholder="account" />
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input v-model="ruleForm.pass" type="password" style="width: 400px" placeholder="input password" />
      </el-form-item>
      <el-form-item label="确认密码" prop="pass2">
        <el-input v-model="ruleForm.pass2" type="password" style="width: 400px" placeholder="confirm password" @keyup.enter.native="regi()" />
      </el-form-item>
    </el-form>
    <br></br>
    <button v-show="dialog_visible" class="btn btn-lg btn-primary btn-block" type="submit" @click="regi">
      注册
    </button>
  </div>
</template>

<script>
import Vue from 'vue'
import qs from 'qs'
import { request } from '../../network/request'
Vue.prototype.$qs = qs
export default {
  name: 'Register',
  data () {
    return {
      dialog_visible: true,
      code: '',
      data: [], // 存放从后端获取的已注册的账号密码信息
      ruleForm: {
        account: '',
        pass: '',
        pass2: ''
      },
      rules: {
        account: [
          { required: true, message: '请输入账户', trigger: 'blur' }
        ],
        pass: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        pass2: [
          { required: true, message: '请输入确认密码', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    request({
      url: '/users'
    }).then((res) => {
      this.data = res.data
    }).catch((err) => {
      console.log(err)
    })
  },
  methods: {
    judgeAccount (regiAccount) {
      let con = 1
      if (regiAccount === '') {
        return -1
      } else {
        for (let i = 0; i < this.data.length; i++) {
          if (this.data[i].account === regiAccount) {
            con = -2
          }
        }
        return con
      }
    },
    judgePass (pass1, pass2) {
      if (pass1 !== pass2) {
        return -1
      } else if (pass1 === '') {
        return -2
      } else {
        return 1
      }
    },
    randomString (len) { // 同样的方法生成流水号
      len = len || 32
      const $chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
      const maxPos = $chars.length
      let pwd = ''
      for (let i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * (maxPos + 1)))
      }
      return pwd
    },
    regi () {
      if (this.judgeAccount(this.ruleForm.account) === 1 && this.judgePass(this.ruleForm.pass, this.ruleForm.pass2) === 1) {
        // 发送注册账号的信息
        // 跳转至登陆页
        console.log('可以注册')
        const postData = this.$qs.stringify({
          id: this.randomString(32), // 仍然是32位的流水号
          account: this.ruleForm.account,
          password: this.ruleForm.pass
        })
        request({
          method: 'post',
          url: '/users',
          data: postData
        }).then((res) => {
          console.log(res)
        })
        this.$alert('将跳转至登陆页', '注册成功', {
          confirmButtonText: '确定',
          callback: (action) => {
            this.$router.push('/login')
          }
        })
      } else if (this.judgeAccount(this.ruleForm.account) === -1) {
        this.$message({
          message: '账号不能为空',
          type: 'warning'
        })
      } else if (this.judgeAccount(this.ruleForm.account) === -2) {
        this.$message({
          message: '账号已存在',
          type: 'warning'
        })
      } else if (this.judgePass(this.ruleForm.pass, this.ruleForm.pass2) === -1) {
        this.$message({
          message: '两次密码不一致',
          type: 'warning'
        })
      } else if (this.judgePass(this.ruleForm.pass, this.ruleForm.pass2) === -2) {
        this.$message({
          message: '密码不能为空',
          type: 'warning'
        })
      }
    }
  }
}
</script>

<style scoped src="../../static/css/floating-labels.css" >
.mydiv{
  position: absolute;
  top: 20%;
  left: 20%;
  right: 20%;
  width: 500px;
  height: 700px;
  margin: 0 auto;
}
</style>
