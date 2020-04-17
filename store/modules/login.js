const state = {
  islogin0: false
}

const getters = {}

const actions = {}

const mutations = {
  llllogin (state) {
    state.islogin0 = true
  },
  nnnlogin (state) {
    state.islogin0 = false
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

// 这边就简单设置了一个state，代表是否登陆，初始就是未登陆，登陆了就在登陆组件里改成true
// 退出登陆时就在退出组件里改成false
// 然后设置了两个mutations，一个是改为true的，一个是改为false的
// 在其他组件里使用mutation就行了，所以state也就是一些简单的修改，太复杂的还是在组件的逻辑里做比较好
// 这边加了一个namespaced，不加的话，mutations仍然是公共的，就是这么奇葩，明明在单独的文件里，却和公共的一样访问
// 加了namespace后，就在路径里加上文件名咯
// 参考这个https://www.cnblogs.com/Free-Thinker/p/10718574.html
