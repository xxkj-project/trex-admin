/*
 * @Author: wangshengxian
 * @Date: 2021-01-03 01:33:54
 * @LastEditors: wangshengxian
 * @LastEditTime: 2021-01-03 02:05:11
 * @Desc: 财务设置 - api
 */
import request from '@/utils/request'

const root = '/admin'

/**
 * 充值记录列表
 */
export function getRechargeList(data) {
  return request({
    url: root + '/finance/rechargeList',
    method: 'get',
    data
  })
}

/**
 * 提现记录列表
 */
export function getWithdrawList(data) {
  return request({
    url: root + '/finance/withdrawList',
    method: 'get',
    data
  })
}

/**
 * OTC订单列表
 */
export function getOrderList(data) {
  return request({
    url: root + '/finance/ordersList',
    method: 'get',
    data
  })
}

/**
 * OTC订单状态列表
 */
export function getOrderStatusList(data = {}) {
  return request({
    url: root + '/finance/ordersStatusList',
    method: 'get',
    data
  })
}
/**
 * OTC挂单列表
 */
export function getPendingOrderList(data) {
  return request({
    url: root + '/finance/advertisingList',
    method: 'get',
    data
  })
}

/**
 * OTC挂单状态列表
 */
export function getPendingOrderStatusList(data = {}) {
  return request({
    url: root + '/finance/advertisingStatusList',
    method: 'get',
    data
  })
}

/**
 * 申诉列表
 */
export function getAppealList(data) {
  return request({
    url: root + '/finance/appealsList',
    method: 'get',
    data
  })
}

/**
 * 申诉状态列表
 */
export function getAppealStatusList(data = {}) {
  return request({
    url: root + '/finance/appealsStatusList',
    method: 'get',
    data
  })
}

/**
 * 处理申诉
 */
export function appealSubmit(data) {
  return request({
    url: root + '/finance/appealsSubmit',
    method: 'put',
    data
  })
}

/**
 * 兑换记录列表
 */
export function getExchangeRecordList(data) {
  return request({
    url: root + '/finance/exchangesList',
    method: 'get',
    data
  })
}
