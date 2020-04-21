<template>
  <div id="kanban">
    <p style="text-align: center; margin: 0 0 20px; height: 50px">
      A simple KanBan
    </p>
    <div style="text-align: center">
      <el-transfer
        v-model="value"
        style="text-align: left; display: inline-block; height: 500px;"
        filterable
        target-order="original"
        :render-content="renderFunc"
        :titles="['BugList', '待测试']"
        :button-texts="['到左边', '到右边']"
        :data="data"
        :format="{
          noChecked: '${total}',
          hasChecked: '${checked}/${total}'
        }"
        @change="handleChange"
        @left-check-change="leftCheckChange"
        @right-check-change="rightCheckChange"
      >
        <el-popover
          slot="left-footer"
          v-model="visible"
          placement="top"
          width="160"
          cclass="transfer-footer"
        >
          <el-input
            v-model="textarea"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入内容"
            style="position:absolute; left: 0; top: -45px"
            @keyup.enter.native="pushdata()"
          />

          <div style="text-align: right; margin: 0">
            <el-button size="mini" type="text" @click="visible = false">
              取消
            </el-button>
            <el-button type="primary" size="mini" @click="pushdata">
              确定
            </el-button>
          </div>
          <el-button slot="reference">
            +
          </el-button>
        </el-popover>
        <!-- <el-button class="transfer-footer" slot="right-footer" size="small">-</el-button> -->
        <el-popover
          slot="right-footer"
          v-model="visible1"
          placement="top"
          width="160"
          cclass="transfer-footer"
        >
          <p>确认删除选中的项吗？</p>
          <div style="text-align: right; margin: 0">
            <el-button size="mini" type="text" @click="visible1 = false">
              取消
            </el-button>
            <el-button type="primary" size="mini" @click="deleteItems">
              确定
            </el-button>
          </div>
          <el-button slot="reference">
            -
          </el-button>
        </el-popover>
      </el-transfer>
    </div>
  </div>
</template>

<style>
.transfer-footer {
    margin-left: 20px;
    padding: 6px 5px;
  }

.el-transfer-panel {
    width: 300px;
}

.el-transfer-panel__body {
    height: 400px;
}

.el-transfer-panel__list.is-filterable{
    height: 328px;
}
</style>

<script>
import Vue from 'vue'
import qs from 'qs'
import { request } from '../../network/request'
Vue.prototype.$qs = qs
export default {
  name: 'KanBan',
  data () {
    return {
      data: [], // 这是全部的数据，包括右边的
      value: [], // 这玩意是保存哪些在右边的
      renderFunc (h, option) {
        return <span>{ option.key } - { option.label }</span>
      }, // 就是把key和label连起来
      visible: false,
      visible1: false, // 这俩是弹出是否显示的参数
      textarea: '',
      keynum: 1, // 存放key，这个值很重要，要算好新加的到底应该是第几个
      leftchoosen: [], // 存放左边哪几个key被选中了
      rightchoosen: [] // 存放右边哪几个key被选中了
    }
  },
  mounted () {
    request({
      url: '/kanban'
    })
      .then((res) => {
        this.data = res.data
        for (let i = 0; i < res.data.length; i++) { // 判断获取的数据哪些是左边哪些是右边
          if (res.data[i].location === 'right') {
            this.value.push(res.data[i].key)
          }
        }
        // this.data = res.data
        this.keynum = this.findMaxKey(this.data) + 1 // 算一下新加的key应该是多少
      })
      .catch((err) => {
        console.log(err)
      })
  },
  methods: {
    handleChange (value, direction, movedKeys) {
      if (direction === 'right') { // 点击‘到右边’按钮时的事件
        for (let i = 0; i < movedKeys.length; i++) { // 把被移到右边的数据的location全部改为right，意思是这些应该是在右边的
          for (let j = 0; j < this.data.length; j++) {
            if (this.data[j].key === movedKeys[i]) {
              const postData3 = this.$qs.stringify({
                location: 'right'
              })
              request({ // patch方法修改数据，把db.json中的数据更新一下
                method: 'patch',
                url: '/kanban/' + this.data[j].id,
                data: postData3
              }).then((res) => {
                console.log(res)
              })
            }
          }
        }
      }
      if (direction === 'left') { // 点击‘到左边’按钮时的事件
        for (let i = 0; i < movedKeys.length; i++) { // 把被移到左边的数据的location全部改为left，意思是这些应该是在左边的
          for (let j = 0; j < this.data.length; j++) {
            if (this.data[j].key === movedKeys[i]) {
              const postData4 = this.$qs.stringify({
                location: 'left'
              })
              request({ // patch方法修改数据，把db.json中的数据更新一下
                method: 'patch',
                url: '/kanban/' + this.data[j].id,
                data: postData4
              }).then((res) => {
                console.log(res)
              })
            }
          }
        }
      }
    },
    handleCurrentChange (currentPage) {
      this.currentPage = currentPage
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
    findMaxKey (data) { // 找到获取的数据中，最大的key是多少，以便判断新加的key应该是多少
      let max = 0
      for (let i = 0; i < data.length; i++) {
        if (max < parseInt(data[i].key)) {
          max = parseInt(data[i].key)
        }
      }
      return max
    },
    leftCheckChange (key) { // 当左边有数据被选中时，更新leftchoosen，实时为所有左边的key
      for (let i = 0; i < key.length; i++) { // 如果leftchoosen中没有这个key，就加进去(防止key被重复加入)
        if (!this.leftchoosen.includes(key[i])) {
          this.leftchoosen.push(key[i])
        }
      }
      for (let j = 0; j < this.leftchoosen.length; j++) { // 如果leftchoosen中有这个key，但是被选中的没有，说明选中后又取消了，要删除
        if (!key.includes(this.leftchoosen[j])) {
          this.leftchoosen.splice(j, 1)
        }
      }
    },
    rightCheckChange (key) { // 当右边有数据被选中时，更新rightchoosen，实时为所有右边的key
      for (let i = 0; i < key.length; i++) { // 如果rightchoosen中没有这个key，就加进去(防止key被重复加入)
        if (!this.rightchoosen.includes(key[i])) {
          this.rightchoosen.push(key[i])
        }
      }
      for (let j = 0; j < this.rightchoosen.length; j++) { // 如果rightchoosen中有这个key，但是被选中的没有，说明选中后又取消了，要删除
        if (!key.includes(this.rightchoosen[j])) {
          this.rightchoosen.splice(j, 1)
        }
      }
    },
    pushdata () {
      this.visible = false
      const postData = this.$qs.stringify({ // 需要被上传的数据
        id: this.randomString(32), // 仍然是32位的流水号
        key: this.keynum, // 应该是第几个
        label: this.textarea, // 文本框的数据
        location: 'left' // 默认就是在左边的
      })
      request({ // 上传
        method: 'post',
        url: '/kanban',
        data: postData
      }).then((res) => {
        console.log(res)
      })
      request({ // 重新获取数据，让上面刷新出来刚刚加的
        url: '/kanban'
      }).then((res) => {
        this.data = res.data
        this.keynum = this.findMaxKey(this.data) + 1
      }).catch((err) => {
        console.log(err)
      })
      this.textarea = null
    },
    deleteItems () { // 数据删除方法
      const shouldBeDeleted = this.leftchoosen.concat(this.rightchoosen) // 被删除的就是左边和右边所有被选中的项
      for (let i = 0; i < shouldBeDeleted.length; i++) {
        for (let j = 0; j < this.data.length; j++) {
          if (this.data[j].key === shouldBeDeleted[i]) { // 根据被选中的key找到被选中项的id，为每一个项发送delete请求
            request({
              method: 'delete',
              url: '/kanban/' + this.data[j].id
            }).then((res) => {
              console.log(res)
            })
          }
        }
      }
      request({ // 删除后也要重新刷一下数据
        url: '/kanban'
      }).then((res) => {
        this.data = res.data
        this.keynum = this.findMaxKey(this.data) + 1
      }).catch((err) => {
        console.log(err)
      })
      this.leftchoosen = []
      this.rightchoosen = []
      this.visible1 = false
    }
  }
}
</script>
