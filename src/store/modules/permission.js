import { asyncRouterMap, constantRouterMap } from '@/router'

/**
 * 通过meta.roles判断是否与当前用户的权限匹配
 * @param {any} roles 权限角色
 * @param {any} route 路由对象信息
 */
function hasPermission (role, route) {
  if (route.meta && route.meta.roles) {
    return route.meta.roles.indexOf(role) >= 0
  } else {
    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param {any} asyncRouterMap 异步加载的路由表
 * @param {any} roles 权限
 */
function filterAsyncRouter (asyncRouterMap, role) {
  const accessRouters = asyncRouterMap.filter(route => {
    if (hasPermission(role, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, role)
      }
      return true
    }
    return false
  })
  return accessRouters
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      const telArray = []
      constantRouterMap.forEach(element => {
        if (!element.hidden && element.children) {
          telArray.push(element)
        }
      })
      routers.forEach(element => {
        if (!element.hidden && element.children) {
          telArray.push(element)
        }
      })
      state.routers = telArray
    }
  },
  actions: {
    GenerateRouters ({ commit }, data) {
      return new Promise(resolve => {
        const role = data.res
        let accessRouters
        if (role === 0) { // admin的话全部路由都可以访问
          accessRouters = asyncRouterMap
        } else {
          accessRouters = filterAsyncRouter(asyncRouterMap, role)
        }
        commit('SET_ROUTERS', accessRouters)
        resolve()
      })
    }
  }
}

export default permission
