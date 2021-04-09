import request from '@/utils/request'

/**
 * 获取用户列表信息
 * @export
 * @param {any} page 页面
 * @param {any} pageSize 每页多少条
 * @returns json
 */
export function getUserListApi (data) {
  return request({
    url: '/api/user/list',
    params: data
  })
}

/**
 * 修改用户操作
 * @export
 * @param {any} data 数据
 * @returns json
 */
export function editUserApi (data) {
  return request({
    url: '/api/user/list',
    method: 'put',
    data: data
  })
}

/**
 * 检查用户名是否存在
 * @export
 * @param {any} page 页面
 * @param {any} pageSize 每页多少条
 * @returns json
 */
export function postUserListApi (data) {
  return request({
    url: '/api/user/list',
    method: 'post',
    data: data
  })
}

/**
 * 删除用户操作
 * @export
 * @param {any} id 用户的id号
 * @returns json
 */
export function deleteUserApi (id) {
  return request({
    url: '/api/user/list',
    method: 'delete',
    params: {
      id
    }
  })
}

export function login (username, password) {
  return request({
    url: '/api/user/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getInfo (token) {
  return request({
    url: '/api/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout () {
  return request({
    url: '/api/user/logout',
    method: 'post'
  })
}

/**
 * 修改权限
 * @export
 * @param {any} content 分组名称
 * @returns json
 */
export function changeVerifyApi (content) {
  return request({
    url: '/api/change/verify',
    params: {
      content
    }
  })
}
