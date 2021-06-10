/*
 * @Author: wangshengxian
 * @Date: 2021-01-03 00:14:32
 * @LastEditors: wangshengxian
 * @LastEditTime: 2021-01-03 00:59:14
 * @Desc: 运营管理 - api
 */

import request from '@/utils/request'

const root = '/admin'

/**
 * banner列表
 */
export function getBannerList() {
  return request({
    url: root + '/operate/bannerList',
    method: 'get',
    data: {}
  })
}

/**
 * 添加 -- banner
 */
export function addBanner(data) {
  return request({
    url: root + '/operate/bannerAdd',
    method: 'post',
    data
  })
}

/**
 * 修改 -- banner
 */
export function editBanner(data) {
  return request({
    url: root + '/operate/bannerUpdate',
    method: 'put',
    data
  })
}

// =================================
/**
 * 提现费率列表
 */
export function getWithdrawRateList() {
  return request({
    url: root + '/operate/outFeeList',
    method: 'get',
    data: {}
  })
}

/**
 * 添加 -- 提现费率
 */
export function addWithdrawRate(data) {
  return request({
    url: root + '/operate/feeAdd',
    method: 'post',
    data
  })
}

/**
 * 修改 -- 提现费率
 */
export function editWithdrawRate(data) {
  return request({
    url: root + '/operate/feeUpdate',
    method: 'put',
    data
  })
}

/**
 * 货币兑换费率列表
 */
export function getCurrencyRateList(data) {
  return request({
    url: root + '/operate/coinRateList',
    method: 'get',
    data
  })
}
