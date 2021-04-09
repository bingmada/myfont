import Vue from 'vue'
import VueRouter from 'vue-router'
import { stringifyQuery, parseQuery } from '../utils/query'
import Layout from '@/views/layout/layout'

Vue.use(VueRouter)

export const constantRouterMap = [
  { path: '/login', component: resolve => require(['@/views/login/login'], resolve), hidden: true },
  {
    path: '/',
    component: Layout,
    name: '首页',
    hidden: true,
    children: [{
      path: '',
      component: resolve => require(['@/views/dashboard/dashboard'], resolve),
      meta: {
        title: '首页'
      }
    }]
  }, {
    path: '/system',
    component: Layout,
    name: 'system',
    children: [{
      path: 'user',
      component: resolve => require(['@/views/system/user'], resolve),
      meta: {
        title: '用户管理'
      }
    }]
  },
  { path: '*', ignore: true, redirect: '/404' }
]

const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  base: 'wksidhcuekksj',
  routes: constantRouterMap,
  stringifyQuery: stringifyQuery, // 序列化query参数
  parseQuery: parseQuery, // 反序列化query参数
  scrollBehavior (to, from, savedPosition) {
    // 如果你的連結是帶 # 這種
    // to.hash 就會有值(值就是連結)
    // 例如 #3
    if (to.hash) {
      return {
        // 這個是透過 to.hash 的值來找到對應的元素
        // 照你的 html 來看是不用多加處理這樣就可以了
        // 例如你按下 #3 的連結，就會變成 querySelector('#3')，自然會找到 id = 3 的元素
        selector: to.hash
      }
    }
  }
})
// 异步加载的路由表
export const asyncRouterMap = [
  { path: '*', redirect: '/404', hidden: true }
]

export default router
