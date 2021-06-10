/*
 * @Author: wangshengxian
 * @Date: 2020-12-28 13:06:33
 * @LastEditors: wangshengxian
 * @LastEditTime: 2020-12-28 13:24:57
 * @Desc: 页面内权限校验函数
 */
import store from '@/store'

/**
 * @param {Array} value
 * @returns {Boolean}
 * @example see @/views/permission/directive.vue
 */
export default function checkPermission(value) {
  if (value && value instanceof Array && value.length > 0) {
    const roles = store.getters && store.getters.roles
    const permissionRoles = value

    const hasPermission = roles.some(role => {
      return permissionRoles.includes(role)
    })

    if (!hasPermission) {
      return false
    }
    return true
  } else {
    return false
  }
}
