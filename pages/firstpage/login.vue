<template>
  <div id="app4" class="mydiv">
    <div v-show="dialog_visible" class="text-center mb-4">
      <img class="mb-4" src="../../static/img/k8s-logo.png" alt="">
      <h1 class="h3 mb-3 font-weight-normal">
        登录
      </h1>
      <p>Be agile</p>
    </div>

    <el-form
      ref="ruleForm"
      status-icon
      :model="ruleForm"
      label-width="100px"
      :rules="rules"
      class="demo-ruleForm"
      style="margin-left: -30px"
    >
      <el-form-item label="账号" prop="account">
        <el-input v-model="ruleForm.account" style="width: 400px" placeholder="admin" />
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input v-model="ruleForm.pass" type="password" style="width: 400px" placeholder="password" />
      </el-form-item>
      <el-form-item label="验证码" prop="checkcode">
        <el-input id="codeinput" v-model="ruleForm.checkcode" style="width: 300px" placeholder="Verification code" @keyup.enter.native="jump()" />
      </el-form-item>
      <div style="position:absolute;right:30px;bottom:237px;">
        <el-button type="primary" round @click="creatCode">
          {{ code }}
        </el-button>
      </div>
      <div style="position:absolute;right:37px;bottom:187px;">
        <el-link type="info" @click="toRegister">
          没有账号？前去注册
        </el-link>
      </div>
    </el-form>

    <div v-show="dialog_visible" class="checkbox mb-3">
      <label style="margin-left: 20px">
        <input type="checkbox" value="remember-me"> 记住我
      </label>
    </div>

    <button v-show="dialog_visible" class="btn btn-lg btn-primary btn-block" type="submit" @click="jump">
      登录
    </button>
  </div>
</template>

<script>
import Vue from 'vue'
import ElementUI from 'element-ui'
import { request } from '../../network/request'
Vue.use(ElementUI)

export default {
  name: 'Login',
  data () {
    return {
      dialog_visible: true,
      data: [],
      code: '',
      ruleForm: {
        account: '',
        pass: '',
        checkcode: ''
      },
      rules: {
        account: [
          { required: true, message: '请输入账户', trigger: 'blur' }
        ],
        pass: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        checkcode: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () { // 账户信息必须提前加载进来
    request({
      url: '/users'
    })
      .then((res) => {
        this.data = res.data
      })
      .catch((err) => {
        console.log(err)
      })
  },
  created () { // 页面出来的时候就要有验证码
    this.creatCode()
  },
  methods: {
    judgeLogin (account, pass) {
      let judge = false
      for (let i = 0; i < this.data.length; i++) {
        if (account === this.data[i].account && pass === this.data[i].password) {
          judge = true
        }
      }
      return judge
    },
    jump () { // 判断输入的对不对啥的，balabala
      const cinput = document.getElementById('codeinput')
      cinput.blur()
      if (this.judgeLogin(this.ruleForm.account, this.ruleForm.pass)) {
        if (this.code === this.ruleForm.checkcode) {
          this.$alert('登陆成功', '恭喜你', {
            confirmButtonText: '确定'
          })
          this.$store.commit('login/llllogin') // 修改vuex中的状态
          this.$emit('transfer', true) // 给父组件传值
          this.$emit('transfer2', this.ruleForm.account)
          this.$router.push('/')
        } else {
          console.log('wrong password')
          this.$alert('请重新输入', '验证码错误', {
            confirmButtonText: '确定'
          })
          this.creatCode()
        }
      } else {
        console.log('wrong password')
        this.$alert('请重新输入', '账号/密码错误', {
          confirmButtonText: '确定'
        })
        this.creatCode()
      }
    },
    toRegister () {
      this.$router.push('/firstpage/register')
    },
    creatCode () { // 生成随机验证码的方法
      // 先清空验证码的输入
      this.code = ''
      this.checkCode = ''
      // 验证码的长度
      const codeLength = 4
      // 随机数
      const random = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G',
        'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
      for (let i = 0; i < codeLength; i++) {
        // 取得随机数的索引（0~35）
        const index = Math.floor(Math.random() * 36)
        // 根据索引取得随机数加到code上
        this.code += random[index]
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
