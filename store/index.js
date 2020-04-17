import Vue from 'vue'
import Vuex from 'vuex'
import login from './modules/login'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const store = () => {
  return new Vuex.Store({
    modules: {
      login
    },
    strict: debug
  })
}

export default store
// 此文件为vuex状态管理文件，感觉状态管理就类似于全局变量，各个组件都可以用，比组件传值方便点，
// 然后各个状态的变化都能被追踪到，方便debug
// 虽然只有一个状态被获取和修改，但是仍然把它放在了一个文件里，因为这样显得比较厉害
// 就先引入vuex，然后把modules下的login.js给引进来，在modules下注册，如果有其他js的话，也是一样的引用注册
