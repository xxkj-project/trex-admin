/*
 * @Author: wangshengxian
 * @Date: 2020-12-30 09:57:17
 * @LastEditors: wangshengxian
 * @LastEditTime: 2021-01-04 14:30:22
 * @Desc: 用户管理 - api
 */

import request from '@/utils/request'
import Qs from 'qs'

const root = '/admin'

/**
 * 用户列表
 */
export function getUserList(data) {
  return request({
    url: root + '/users/list',
    method: 'get',
    data
  })
}

/**
 * 封禁用户
 */
export function updateBanned(data) {
  return request({
    url: root + `/users/ban?${Qs.stringify(data)}`,
    method: 'put',
    data
  })
}

/**
 * 删除用户
 */
export function removeUser(data) {
  return request({
    url: root + '/users/remove',
    method: 'delete',
    data
  })
}

/**
 * 币种列表
 */
export function getCoinList(data) {
  return request({
    url: root + '/users/coinList',
    method: 'get',
    data
  })
}

/**
 * 用户资产列表
 */
export function getUserAssetsList(data) {
  return request({
    url: root + '/users/assetList',
    method: 'get',
    data
  })
}

/**
 * 加币
 */
export function addCoin(data) {
  return request({
    url: root + '/users/addCoin',
    method: 'post',
    data
  })
}

/**
 * 当前在线人数
 */
export function getCurrentNumber(data = {}) {
  return request({
    url: root + '/users/onlines',
    method: 'get',
    data
  })
}

/**
 * 实名认证列表
 */
export function getAuthList(data) {
  return request({
    url: root + '/users/authList',
    method: 'get',
    data
  })
}

/**
 * 实名认证审核
 */
export function updateAuth(data) {
  return request({
    url: root + '/users/authUpdate',
    method: 'put',
    data
  })
}

/**
 * 用户注册量
 **/
export function getRegists() {
  return request({
    url: root + '/users/regists',
    method: 'get'
  })
}

/**
 * 系统沉淀资金
 **/
export function getSystemCoin() {
  return request({
    url: root + '/users/systemCoin',
    method: 'get'
  })
}

/**
 * 获取用户资金排行
 **/
export function getUserCoinRank(data) {
  return request({
    url: root + '/users/userCoinRank',
    method: 'get',
    data
  })
}

/**
 * 获取用户登录日志
 **/
export function getUserLoginLog(data) {
  return request({
    url: root + '/users/userLoginLog',
    method: 'get',
    data
  })
}

/**
 * 获取用户积分
 **/
export function getUserIntegral(data) {
  return request({
    url: root + '/users/userIntegral',
    method: 'get',
    data
  })
}

/**
 * 修改用户积分
 **/
export function editUserIntegral(data) {
  return request({
    url: root + '/users/userIntegralUpdate',
    method: 'post',
    data: data
  })
}

/**
 * 获取用户积分操作日志
 **/
export function getUserIntegralLog(data) {
  return request({
    url: root + '/users/userIntegralLog',
    method: 'get',
    data
  })
}
