<template>
  <div id="index">
    <div class="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light">
      <div class="col-md-5 p-lg-5 mx-auto my-5">
        <h1 class="display-4 font-weight-normal">
          Devops
        </h1>
        <p class="lead font-weight-normal">
          DevOps is a set of practices that combines software
          development (Dev) and information-technology operations (Ops) which aims to shorten the systems
          development life cycle and provide continuous delivery with high software quality.
        </p>
        <el-popover
          placement="top-start"
          title="页面跳转"
          width="300"
          trigger="hover"
          content="将会跳转至我的github地址，由于github服务器在国外，打开稍慢"
        >
          <el-button slot="reference" class="thisbtn" @click="tomygithub">
            My github
          </el-button>
        </el-popover>
      </div>
      <div class="product-device shadow-sm d-none d-md-block" />
      <div class="product-device product-device-2 shadow-sm d-none d-md-block" />
    </div>
    <div class="d-md-flex flex-md-equal w-100 my-md-3 pl-md-3">
      <div class="bg-dark mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center text-white overflow-hidden">
        <div class="my-3 py-3">
          <h2 class="display-5">
            燃尽图
          </h2>
          <el-link style="color: grey" @click="toRanJin">
            点此打开燃尽图
            <i class="el-icon-view el-icon--right" />
          </el-link>
        </div>
        <div class="demo-image__preview">
          <el-image
            style="width: 400px; height: 200px"
            :src="url"
            :preview-src-list="srcList"
          />
        </div>
      </div>
      <div class="bg-light mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden">
        <div class="my-3 p-3">
          <h2 class="display-5">
            Kanban
          </h2>
          <el-link @click="toKanBan">
            click here to use a simple Kanban
            <i class="el-icon-view el-icon--right" />
          </el-link>
        </div>
        <div class="demo-image__preview">
          <el-image
            style="width: 400px; height: 200px"
            :src="url2"
            :preview-src-list="srcList2"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
      url: require('../../static/img/燃尽图-按时完成.png'),
      srcList: [
        require('../../static/img/燃尽图-按时完成.png'),
        require('../../static/img/燃尽图-提前完成.png'),
        require('../../static/img/燃尽图-未完成.png'),
        require('../../static/img/燃尽图-落后赶上.png')
      ],
      url2: require('../../static/img/看板.jpg'),
      srcList2: [
        require('../../static/img/看板.jpg'),
        require('../../static/img/看板2.png'),
        require('../../static/img/看板3.png')
      ]
    }
  },
  methods: {
    tomygithub () {
      window.location.href = 'https://github.com/ivansmoot'
    },
    toKanBan () {
      this.$router.push('/firstpage/kanban')
    },
    toRanJin () {
      this.$router.push('/firstpage/ranjin')
    }
  }
}
</script>

<style scoped>
.bd-placeholder-img {
  font-size: 1.125rem;
  text-anchor: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

@media (min-width: 768px) {
  .bd-placeholder-img-lg {
    font-size: 3.5rem;
  }
}
.container {
  max-width: 960px;
}

.site-header {
  background-color: rgba(0, 0, 0, .85);
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  backdrop-filter: saturate(180%) blur(20px);
}
.site-header a {
  color: #999;
  transition: ease-in-out color .15s;
}
.site-header a:hover {
  color: #fff;
  text-decoration: none;
}

.product-device {
  position: absolute;
  right: 10%;
  bottom: -30%;
  width: 300px;
  height: 540px;
  background-color: #333;
  border-radius: 21px;
  -webkit-transform: rotate(30deg);
  transform: rotate(30deg);
}

.product-device::before {
  position: absolute;
  top: 10%;
  right: 10px;
  bottom: 10%;
  left: 10px;
  content: "";
  background-color: rgba(255, 255, 255, .1);
  border-radius: 5px;
}

.product-device-2 {
  top: -25%;
  right: auto;
  bottom: 0;
  left: 5%;
  background-color: #e5e5e5;
}

.flex-equal > * {
  -ms-flex: 1;
  flex: 1;
}
@media (min-width: 768px) {
  .flex-md-equal > * {
    -ms-flex: 1;
    flex: 1;
  }
}

.overflow-hidden {
  overflow: hidden;
}

.thisbtn{
  display: inline-block;
  font-weight: 400;
  color: #212529;
  border-color: #6c757d;
  text-align: center;
  vertical-align: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background-color: transparent;
  border: 1px solid;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.thisbtn:hover {
  background-color: rgba(108, 117, 125);
  color: white;
}
</style>
