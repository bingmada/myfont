/* 权限控制页面 路由钩子 */
import router from './router'
import store from './store'
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth' // 验权
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
NProgress.configure({ showSpinner: false })// NProgress Configuration
const whiteList = ['/login', '/'] // 不需要重定向的白名单
router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  if (getToken()) { // 已经存在token
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done() // if current page is dashboard will not trigger afterEach hook, so manually handle it
    } else {
      if (store.getters.role === '') { // 判断是否已经拉取了用户信息
        store.dispatch('GetInfo').then(res => { // 去拉取对应的用户信息
          store.dispatch('GenerateRouters', { res }).then(() => { // 生成可访问的路由表
            router.addRoutes(store.getters.addRouters) // 动态添加进去可以访问的路由表
            next({ ...to, replace: true })
          })
          next()
        }).catch(err => {
          store.dispatch('FedLogOut').then(() => {
            Message.error(err || '登录状态失效，请重新登录')
            next({ path: '/' })
          })
        })
      } else {
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
      NProgress.done()
    } else {
      next('/login')
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
