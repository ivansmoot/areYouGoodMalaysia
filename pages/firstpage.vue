<template>
  <div id="index">
    <div class="header d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
      <h5 class="my-0 mr-md-auto font-weight-normal" @click="tohome">
        Powered by Webpack
      </h5>
      <nav class="my-2 my-md-0 mr-md-3">
        <a class="p-2 text-dark" href="#" @click="abug">Features</a>
        <a class="p-2 text-dark" href="#">Enterprise</a>
        <a class="p-2 text-dark" href="#">{{ amilogin }}</a>
        <a class="p-2 text-dark" @click="tochat">Chat</a>
      </nav>
      <a v-show="!login" class="btn btn-outline-primary" @click="tologin">log in</a>
      <a v-show="login" class="btn btn-outline-primary" @click="logout">log out</a>
    </div>

    <!-- <router-view @transfer="islogin" @transfer2="username" /> -->
    <nuxt-child @transfer="islogin" @transfer2="username" />

    <footer class="footer py-5">
      <div class="row">
        <div class="col-12 col-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            class="d-block mb-2"
            role="img"
            viewBox="0 0 24 24"
            focusable="false"
          >
            <title>Product</title>
            <circle cx="12" cy="12" r="10" />
            <path d="M14.31 8l5.74 9.94M9.69 8h11.48M7.38 12l5.74-9.94M9.69 16L3.95 6.06M14.31 16H2.83m13.79-4l-5.74 9.94" />
          </svg>
          <small class="d-block mb-3 text-muted">&copy; 2017-2019</small>
        </div>
        <div class="col-6 col-md">
          <h5>Features</h5>
          <ul class="list-unstyled text-small">
            <li><a class="text-muted" href="#">Cool stuff</a></li>
            <li><a class="text-muted" href="#">Random feature</a></li>
            <li><a class="text-muted" href="#">Team feature</a></li>
            <li><a class="text-muted" href="#">Stuff for developers</a></li>
            <li><a class="text-muted" href="#">Another one</a></li>
            <li><a class="text-muted" href="#">Last time</a></li>
          </ul>
        </div>
        <div class="col-6 col-md">
          <h5>Resources</h5>
          <ul class="list-unstyled text-small">
            <li><a class="text-muted" href="#">Resource</a></li>
            <li><a class="text-muted" href="#">Resource name</a></li>
            <li><a class="text-muted" href="#">Another resource</a></li>
            <li><a class="text-muted" href="#">Final resource</a></li>
          </ul>
        </div>
        <div class="col-6 col-md">
          <h5>Resources</h5>
          <ul class="list-unstyled text-small">
            <li><a class="text-muted" href="#">Business</a></li>
            <li><a class="text-muted" href="#">Education</a></li>
            <li><a class="text-muted" href="#">Government</a></li>
            <li><a class="text-muted" href="#">Gaming</a></li>
          </ul>
        </div>
        <div class="col-6 col-md">
          <h5>About</h5>
          <ul class="list-unstyled text-small">
            <li><a class="text-muted" href="#">Team</a></li>
            <li><a class="text-muted" href="#">Locations</a></li>
            <li><a class="text-muted" href="#">Privacy</a></li>
            <li><a class="text-muted" href="#">Terms</a></li>
          </ul>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Index',
  data () {
    return {
      login: false,
      uname: ''
    }
  },
  computed: mapState({
    amilogin: state => state.login.islogin0 // 获取vuex中的状态
  }),
  methods: {
    tohome () {
      this.$router.push('/')
    },
    islogin (info) {
      this.login = info
    },
    username (uname) {
      this.uname = uname
    },
    logout () {
      this.$confirm('确认退出账号吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '成功退出账号'
        })
        this.login = false
        this.$store.commit('login/nnnlogin') // 修改vuex中的状态
        // this.$router.login.commit('nnnlogin')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      })
    },
    tologin () {
      this.$router.push('/firstpage/login')
    },
    tochat () {
      this.$router.push('/firstpage/chat')
    },
    abug () {
      this.$router.commit('wrongcommit')
    }
  }
}
</script>

<!-- 这个css覆盖了bootstrap里的样式，就是为了改一下login和logout按钮hover时的颜色，
    原来的颜色实在是太丑了，这里用了Element的主题颜色 -->
<style>
html,
body,#__nuxt,#__layout,#__layout{
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  background-color: white;
}
.btn-outline-primary:hover {
  color: #fff;
  background-color: #409EFF;
  border-color: #409EFF;
}
.header {
  width: 100%;
}
.footer {
  position:relative;
  bottom: 0;
}
</style>

<!-- Index.vue组件为页面上部导航条和页脚的显示，中间用一个router-view的标签展示内容，也就是说，
    所有其他组件的内容都会被替换进这个router-view中，所以每个页面的页头和页脚都是一致的
    @transfer="islogin"绑定一个参数用来进行父子组件的传值，Login.vue把这个值传过来，
    让Index.vue判断登陆情况。具体的router规则在router文件夹下的index.js中 -->
