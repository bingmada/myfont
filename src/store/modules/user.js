import { login, getInfo, logout } from '@/api/user'
import { getToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    username: '',
    token: getToken(),
    role: '',
    overtime: ''
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, username) => {
      state.username = username
    },
    SET_ROLE: (state, role) => {
      state.role = role
    },
    SET_OVERTIME: (state, data) => {
      state.overtime = data
      window.localStorage.setItem('OVERTIME', data)
    }
  },

  actions: {
    // 登录的流程
    Login ({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          // setToken(response.data.data)
          console.log(response)
          commit('SET_TOKEN', 'asjdka@$#!@')
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 根据token获取用户信息
    GetInfo ({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token).then(response => {
          const data = response.data
          const role = data.data.role
          commit('SET_NAME', data.data.username)
          commit('SET_ROLE', role)
          resolve(role)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出流程
    LogOut ({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLE', '')
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut ({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
