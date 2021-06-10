/**
 * 消息相关 - api
 */

import request from '@/utils/request'

const root = '/admin'

/**
 * 消息相关接口 -- 用户反馈列表
 */
export function getFeedbackList(data) {
  return request({
    url: root + '/message/feedBackList',
    method: 'get',
    data
  })
}

/**
 * 消息相关接口 -- 平台公告列表
 */
export function getNoticeList(data) {
  return request({
    url: root + '/message/noticeList',
    method: 'get',
    data
  })
}

/**
 * 消息相关接口 -- 新增公告
 */
export function addNotice(data) {
  return request({
    url: root + '/message/noticeAdd',
    method: 'post',
    data
  })
}

/**
 * 消息相关接口 -- 修改公告
 */
export function editNotice(data) {
  return request({
    url: root + '/message/noticeUpdate',
    method: 'put',
    data
  })
}
