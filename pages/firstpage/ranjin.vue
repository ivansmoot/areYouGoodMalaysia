<template>
  <div class="ranjin">
    <v-chart ref="chart1" :options="orgOptions" :auto-resize="true" />
    <div style="position: relative; height: 200px">
      <div style="position: absolute; width: 400px; left: 250px; top: 50px">
        <span style="position: absolute; left: 100px; top: -30px">
          请选择项目起止时间
        </span>
        <el-date-picker
          v-model="value1"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
          style="width: 380px"
        />
        <el-button
          type="primary"
          round
          style="position: absolute; left: 100px; top: 50px"
          @click="showdate"
        >
          绘制理想燃尽图
        </el-button>
      </div>
      <div style="position: absolute; width: 200px; left: 750px; top: 50px">
        <span style="position: absolute; left: 155px; top: -30px; width: 200px">
          请输入当前进度
        </span>
        <el-input
          v-model="input1"
          placeholder="请输入日期(格式:2020-03-20)"
          suffix-icon="el-icon-date"
          style="position: absolute; width:240px; left: -40px"
        />
        <el-input
          v-model="input2"
          placeholder="请输入剩余进度"
          prefix-icon="el-icon-search"
          style="position: absolute; left: 230px"
          @keyup.enter.native="showdate2()"
        />
        <el-button
          type="primary"
          round
          style="position: absolute; left: 140px; top: 50px"
          @click="showdate2"
        >
          绘制当前燃尽图
        </el-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.echarts {
  width: 1200px;
  height: 500px;
  margin: 0 auto;
}
</style>

<script>
export default {
  name: 'RanJin',
  data () {
    return {
      orgOptions: {},
      value1: '',
      xData: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      yData: [820, 932, 901, 934, 1290, 1330, 1320],
      yData2: [],
      input1: '',
      input2: ''
    }
  },
  mounted () {
    this.drawIt()
  },
  methods: {
    drawIt () {
      this.orgOptions = {
        xAxis: {
          type: 'category',
          data: this.xData
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: this.yData,
          type: 'line',
          smooth: true
        },
        {
          data: this.yData2,
          type: 'line',
          smooth: true
        }]
      }
    },
    showdate () {
      this.xData = []
      this.yData = []
      const fday = parseInt(this.value1[0].substr(8, 2))
      const lday = parseInt(this.value1[1].substr(8, 2))
      for (let i = fday; i <= lday; i++) {
        this.xData.push(i)
      }
      this.yData.push('100')
      let ydata = 100
      const stride = 100 / (lday - fday)
      for (let j = fday + 1; j < lday; j++) {
        ydata -= stride
        this.yData.push(ydata)
      }
      this.yData.push('0')
      this.drawIt()
    },
    judgedate () {
      const reg = /^[0-9]{4}-[0-9]{2}-[0-9]{2}/
      if (reg.test()) {
        return true
      } else {
        let flag = false
        const nday = parseInt(this.input1.substr(8, 2)) // 右边手动填的
        const nyear = parseInt(this.input1.substr(0, 4))
        const nmonth = parseInt(this.input1.substr(5, 2))

        const fday = parseInt(this.value1[0].substr(8, 2)) // 左边表格的
        const lday = parseInt(this.value1[1].substr(8, 2))
        const fyear = parseInt(this.value1[0].substr(0, 4)) // 左边表格的
        const lyear = parseInt(this.value1[1].substr(0, 4))
        const fmonth = parseInt(this.value1[0].substr(5, 2)) // 左边表格的
        const lmonth = parseInt(this.value1[1].substr(5, 2))

        const date1 = []
        const date2 = []
        const date3 = []
        date1.push(fyear)
        date1.push(fmonth)
        date1.push(fday)
        date2.push(lyear)
        date2.push(lmonth)
        date2.push(lday)
        date3.push(nyear)
        date3.push(nmonth)
        date3.push(nday)

        if (date3[0] >= date1[0] && date3[1] >= date1[1] && date3[2] >= date1[2]) {
          if (date3[0] <= date2[0] && date3[1] <= date2[1] && date3[2] <= date2[2]) {
            flag = true
          }
        }
        return flag
      }
    },
    showdate2 () {
      const nday = parseInt(this.input1.substr(8, 2))
      const nwork = parseInt(this.input2)
      const daynum = nday - this.xData[0]
      if (this.judgedate()) {
        // if (daynum < this.yData2.length) {
        //   this.yData2[daynum] = nwork
        //   this.drawIt()
        // } else {
        //   this.yData2[daynum] = nwork
        // }
        this.yData2[daynum] = nwork
        this.drawIt()
      } else {
        this.$message({
          message: '你这日期输得有问题啊',
          type: 'warning'
        })
      }
    }
  }
}
</script>

<!-- Echarts真的好难用，还是Vue-echatrs好用，感谢鱿鱼丝 -->
