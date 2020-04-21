<template>
  <div id="chat">
    <div style="position:relative; width:1000px; height: auto;min-height:440px; box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1); margin: 0 auto">
      <el-table
        :data="tableData"
        stripe
        style="width: 100%"
      >
        <el-table-column
          prop="username"
          label="ID"
          width="180"
        />
        <el-table-column
          prop="date"
          label="日期"
          width="180"
        />
        <el-table-column
          prop="content"
          label="内容"
        />
        <el-table-column
          fixed="right"
          label="操作"
          width="100"
        >
          <template slot-scope="scope">
            <el-popover
              :ref="scope.row.id"
              placement="top"
              width="160"
            >
              <el-input
                v-model="textarea2"
                type="textarea2"
                :autosize="{ minRows: 2, maxRows: 4}"
                placeholder="请输入内容"
                style="position:absolute; left: 0; top: -45px"
                @keyup.enter.native="reply(scope)"
              />
              <div style="text-align: right; margin: 0">
                <!-- element的popover控件和teble控件配合有问题，一起用的时候必须要这样才能关掉 -->
                <el-button size="mini" type="text" @click="scope._self.$refs[scope.row.id].doClose()">
                  取消
                </el-button>
                <el-button type="primary" size="mini" @click="reply(scope)">
                  确定
                </el-button>
              </div>
              <el-button slot="reference" type="text" size="small" style="position:absolute; top: 10px; right: 76px;">
                回复
              </el-button>
            </el-popover>
            <el-popover
              :ref="scope.row.date"
              placement="right"
              width="400"
              trigger="click"
            >
              <el-card class="box-card" style="position: absolute; top: -50px; left: -50px">
                <div slot="header" class="clearfix">
                  <span>
                    全部回复
                  </span>
                  <el-button style="float: right; padding: 3px 0" type="text" @click="scope._self.$refs[scope.row.date].doClose()">
                    取消
                  </el-button>
                </div>
                <div v-for="o in getReplys" :key="o" class="text item">
                  {{ o }}
                </div>
              </el-card>
              <el-button slot="reference" type="text" size="small" style="position:absolute; top: 5px; right: 20px;" @click="lookReply(scope)">
                查看
                <el-badge class="mark" :value="replynum(scope, filterInfs)" style="background-color: white" size="mini" />
              </el-button>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
      <div style="height:50px" />
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="pagesize"
        :total="filterInfs.length + 1"
        :current-page.sync="currentPage"
        style="position:absolute; bottom:10px; left: 400px"
        @current-change="handleCurrentChange"
      />
    </div>
    <p />
    <div style="margin: 0 auto; width:600px">
      <el-tag style="left:100px" type="info">
        发表评论
      </el-tag>
      <p />
      <el-input
        v-model="textarea"
        type="textarea"
        placeholder="请输入内容"
        maxlength="140"
        show-word-limit
        style="width: 600px;"
        @keyup.enter.native="pushContent()"
      />
      <div style="position:relative; left:520px; top:15px">
        <el-button type="primary" round @click="pushContent">
          发表
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import qs from 'qs'
import { request } from '../../network/request'
Vue.prototype.$qs = qs
export default {
  name: 'Chat',
  data () {
    return {
      textarea: '', // 最下面的评论框
      textarea2: '', // 回复评论框
      pagesize: 6, // 每页最多显示6条数据
      currentPage: 1, // 当前页
      filterInfs: [], // 切片前的全部数据
      uname: '', // 当前登陆用户
      getReplys: [] // 全部回复的评论
    }
  },
  computed: {
    tableData () { // 表格内容就是绑定的这个叫tableData的计算属性的返回值，这个值根据filterInfs切片得到
      return this.filterInfs.slice( // slice方法两个参数start和end，很显然应该这么写
        (this.currentPage - 1) * this.pagesize,
        this.currentPage * this.pagesize
      )
    },
    replynum () {
      return function (scope, filterInfs) {
        let replyNum
        for (let i = 0; i < filterInfs.length; i++) {
          if (scope.row.id === filterInfs[i].id) {
            replyNum = filterInfs[i].reply.length - filterInfs[i].alreadyReadNum - 2
          }
        }
        return replyNum
      }
    }
  },
  mounted () {
    if (this.$parent.login === false) { // 获取父组件里的登陆信息
      this.$confirm('该功能需要先登陆', '提示', { // 没登陆就要么登陆，要么返回首页
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$router.push('/firstpage/login')
      }).catch(() => {
        this.$router.push('/')
      })
    }
    this.uname = this.$parent.uname
    request({ // mounted提前把数据刷出来
      url: '/content'
    })
      .then((res) => {
        this.filterInfs = res.data // 把从db.json获取到的res.data数据赋值给filterInfs
      })
      .catch((err) => {
        console.log(err)
      })
  },
  methods: {
    reply (scope) { // 回复评论的方法
      scope._self.$refs[scope.row.id].doClose() // 先把回复窗口关掉
      request({
        url: '/content'
      })
        .then((res) => {
          for (let i = 0; i < res.data.length; i++) {
            if (res.data[i].id === scope.row.id) {
              const thisId = res.data[i].id
              const thisRowReply = []
              for (let j = 0; j < res.data[i].reply.length; j++) { // 先拿到已有的评论
                thisRowReply.push(res.data[i].reply[j])
              }
              thisRowReply.push(this.textarea2) // 再把已有的评论加上本次的评论
              const postData = this.$qs.stringify({ // 然后把合并的评论发过去
                reply: thisRowReply
              }, { arrayFormat: 'repeat' })
              request({
                method: 'patch',
                url: '/content/' + thisId,
                data: postData
              }).then((res) => {
                console.log(res)
              })
              this.textarea2 = ''
              request({
                url: '/content'
              })
                .then((res) => {
                  this.filterInfs = res.data
                })
                .catch((err) => {
                  console.log(err)
                })
            }
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    lookReply (scope) { // 查看所有评论的方法
      this.getReplys = []
      request({
        url: '/content'
      })
        .then((res) => { // 找到id一样的评论
          for (let i = 0; i < res.data.length; i++) {
            if (res.data[i].id === scope.row.id) {
              for (let j = 2; j < res.data[i].reply.length; j++) {
                this.getReplys.push(res.data[i].reply[j])
              }
            }
          }
          for (let k = 0; k < this.filterInfs.length; k++) {
            if (this.filterInfs[k].id === scope.row.id) {
              this.filterInfs[k].alreadyReadNum = this.filterInfs[k].reply.length - 2
              const postData = this.$qs.stringify({
                alreadyReadNum: this.filterInfs[k].alreadyReadNum
              })
              request({
                method: 'patch',
                url: '/content/' + this.filterInfs[k].id,
                data: postData
              }).then((res) => {
                console.log(res)
              })
            }
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    handleCurrentChange (currentPage) {
      this.currentPage = currentPage
    },
    randomString (len) { // 创建流水号方法
      len = len || 32
      const $chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
      const maxPos = $chars.length
      let pwd = ''
      for (let i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * (maxPos + 1)))
      }
      return pwd
    },
    getdate () { // 格式化日期
      const date = new Date()
      const year = date.getFullYear()
      let month = date.getMonth()
      let day = date.getDate()
      let hour = date.getHours()
      let minutes = date.getMinutes()
      let seconds = date.getSeconds()
      if (month < 10) {
        month = '0' + month
      }
      if (day < 10) {
        day = '0' + day
      }
      if (hour < 10) {
        hour = '0' + hour
      }
      if (minutes < 10) {
        minutes = '0' + minutes
      }
      if (day < 10) {
        seconds = '0' + seconds
      }
      const contentDate = year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds
      return contentDate
    },
    pushContent () { // 准备发送的内容
      const postData = this.$qs.stringify({
        id: this.randomString(32), // 生成一个32位流水号(是不是有点长啊？)
        username: this.uname, // username根据当前登陆用户来
        date: this.getdate(), // 时间就是当前时间
        content: this.textarea, // 获取评论框中的内容
        reply: ['', ''],
        alreadyReadNum: 0
      }, { arrayFormat: 'repeat' }) // fix axios传递数组过去有问题
      request({ // 把文本框的内容发送给db.json
        method: 'post',
        url: '/content',
        data: postData
      }).then((res) => {
        console.log(res)
      })
      request({ // 发给db.json后要重新接受一下db.json的文件，让刚刚写的评论马上在上面刷出来
        url: '/content'
      }).then((res) => {
        this.filterInfs = res.data
      }).catch((err) => {
        console.log(err)
      })
      this.textarea = '' // 重置文本框的内容为空，不然显得很傻逼
      this.currentPage = Math.ceil((this.filterInfs.length + 1) / this.pagesize)
    }
  }
}
</script>

<style scoped>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}

.box-card {
  width: 480px;
}

.itembadge {
  margin-top: 10px;
  margin-right: 40px;
}
</style>
