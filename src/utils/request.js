/**
 * http 请求配置
 */
import axios from 'axios'
import store from '@/store'
import router from '@/router'
import { removeToken, getToken } from '@/utils/auth' // 验权

import { Message } from 'element-ui'

// 超时时间
// axios.defaults.baseURL = process.env.BASE_API

axios.defaults.timeout = 60000
// axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.withCredentials = true

// http请求拦截器
axios.interceptors.request.use(config => {
  // if (config.headers['Content-Type'] === 'application/x-www-form-urlencoded' && config.method === 'post') config.data = qs.stringify(config.data, {arrayFormat: 'brackets'})
  if (getToken()) {
    config.headers['X-CSRF-TOKEN'] = getToken()
  }
  return config
}, error => {
  Message.error('网络错误，请检查后重试')
  return Promise.reject(error)
})

// http响应拦截器
axios.interceptors.response.use(data => {
  if (typeof (data.data) === 'string') {
    if (data.data.indexOf('授权过期') !== -1) {
      store.commit('SET_OVERTIME', data.data)
      store.commit('SET_TOKEN', '')
      store.commit('SET_ROLES', [])
      removeToken()
      router.push('/login')
      return
    }
  }
  store.commit('SET_OVERTIME', '')
  if (data.data.status !== undefined && !data.data.status) {
    Message.error({
      message: data.data.msg,
      duration: 5000
    })
    return Promise.reject(data)
  }
  return data
}, error => {
  // 401 未认证通过
  if (!error.response) {
    Message.error('请求超时')
  }
  if (error.response.status === 401) {
    store.dispatch('FedLogOut').then(() => {
      Message.error('登录状态失效，请重新登录')
      // location.href = '/login'
      router.push('/login')
    })
  }
  Message.error('请求异常，服务器好像出现了点问题:(')
  return Promise.reject(error)
})

export default axios
