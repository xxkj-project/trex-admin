/**
 * 登录 - api
 */
import request from '@/utils/request'

const root = '/admin'

/**
 * 管理员相关接口 -- 登录
 * @param {object} data {account: '账号',pwd: '密码'}
 */
export function login(data) {
  return request({
    url: root + '/adminUsers/login',
    method: 'put',
    data
  })
}
