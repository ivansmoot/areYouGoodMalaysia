import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _b2051f1a = () => interopDefault(import('../pages/firstpage.vue' /* webpackChunkName: "pages/firstpage" */))
const _466294b6 = () => interopDefault(import('../pages/firstpage/index.vue' /* webpackChunkName: "pages/firstpage/index" */))
const _40a8ee24 = () => interopDefault(import('../pages/firstpage/chat.vue' /* webpackChunkName: "pages/firstpage/chat" */))
const _33480583 = () => interopDefault(import('../pages/firstpage/kanban.vue' /* webpackChunkName: "pages/firstpage/kanban" */))
const _100a37cd = () => interopDefault(import('../pages/firstpage/login.vue' /* webpackChunkName: "pages/firstpage/login" */))
const _d3ba8748 = () => interopDefault(import('../pages/firstpage/ranjin.vue' /* webpackChunkName: "pages/firstpage/ranjin" */))
const _5364b1ef = () => interopDefault(import('../pages/firstpage/register.vue' /* webpackChunkName: "pages/firstpage/register" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/firstpage",
    component: _b2051f1a,
    children: [{
      path: "",
      component: _466294b6,
      name: "firstpage"
    }, {
      path: "chat",
      component: _40a8ee24,
      name: "firstpage-chat"
    }, {
      path: "kanban",
      component: _33480583,
      name: "firstpage-kanban"
    }, {
      path: "login",
      component: _100a37cd,
      name: "firstpage-login"
    }, {
      path: "ranjin",
      component: _d3ba8748,
      name: "firstpage-ranjin"
    }, {
      path: "register",
      component: _5364b1ef,
      name: "firstpage-register"
    }]
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
