/**
 * 系统设置 - api
 */
import request from '@/utils/request'

const root = '/admin'

/**
 * 管理员相关接口 -- 获取管理员列表
 */
export function getAdminsList() {
  return request({
    url: root + '/adminUsers/adminList',
    method: 'get',
    data: {}
  })
}

/**
 * 管理员相关接口 -- 修改管理员角色
 */
export function editAdminRole(data) {
  return request({
    url: root + '/adminUsers/adminRoleUpdate',
    method: 'post',
    data
  })
}

// ====================角色相关=====================

/**
 * 管理员相关接口 -- 获取角色列表
 */
export function getRolesList() {
  return request({
    url: root + '/adminUsers/roleList',
    method: 'get',
    data: {}
  })
}

const roleApi = {
  add: '/adminUsers/roleAdd',
  edit: '/adminUsers/roleUpdate'
}

/**
 * 管理员相关接口 -- 新增/编辑角色
 * @param {string} type add or edit
 */
export function addOrEditRole(type, data) {
  return request({
    url: root + roleApi[type],
    method: 'post',
    data
  })
}

/**
 * 管理员相关接口 -- 删除角色
 */
export function deleteRole(data) {
  return request({
    url: root + '/adminUsers/roleDelete',
    method: 'delete',
    data
  })
}

/**
 * 管理员相关接口 -- 获取权限菜单列表
 */
export function getAuthMenusList() {
  return request({
    url: root + '/adminUsers/menuAllList',
    method: 'get',
    data: {}
  })
}

/**
 * 管理员相关接口 -- 获取菜单列表
 */
export function getMenusList(data) {
  return request({
    url: root + '/adminUsers/menuList',
    method: 'get',
    data
  })
}

const menuApi = {
  add: '/adminUsers/menuAdd',
  edit: '/adminUsers/menuUpdate'
}

/**
 * 管理员相关接口 -- 新增/编辑菜单
 * @param {string} type add or edit
 */
export function addOrEditMenu(type, data) {
  return request({
    url: root + menuApi[type],
    method: 'post',
    data
  })
}

/**
 * 管理员相关接口 -- 删除菜单
 */
export function deleteMenu(data) {
  return request({
    url: root + '/adminUsers/menuDelete',
    method: 'delete',
    data
  })
}

/**
 * 管理员相关接口 -- 修改角色菜单
 */
export function editRoleMenu(data) {
  return request({
    url: root + '/adminUsers/roleMenuUpdate',
    method: 'post',
    data
  })
}
