/**
 * 程序监控 - api
 */

import request from '@/utils/request'

const root = '/admin'

/**
 * 管理员相关接口 -- 获取管理员操作日志列表
 */
export function getLogList(data) {
  return request({
    url: root + '/adminUsers/operateLog',
    method: 'get',
    data
  })
}
