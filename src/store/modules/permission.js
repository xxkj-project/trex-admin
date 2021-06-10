import { asyncRoutes, constantRoutes } from '@/router'

/**
 * Use meta.role to determine if the current user has permission
 * 验证当前用户是否具有权限
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * 通过递归过滤异步路由表
 * @param routes asyncRoutes
 * @param {array} authList 权限列表
 */
export function filterAsyncRoutes(routes, authList) {
  // console.log('-auth-list-', authList)
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    // console.log('222', tmp)
    authList.map(val => {
      if (val.perms === tmp.name) {
        // console.log('-配置成功-', tmp.children, val.children)
        if (tmp.children) {
          tmp.children = filterAsyncRoutes(tmp.children, val.children)
        }
        res.push(tmp)
      }
    })
  })
  return res
}

/**
 * Filter asynchronous routing tables by recursion
 * 通过递归过滤异步路由表
 * @param routes asyncRoutes
 * @param {array} authList 权限列表
 */
export function filterRolesAsyncRoutes(routes, authList) {
  // console.log('-auth-list-', authList)
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    // console.log('222', tmp)

    if (hasPermission(authList, tmp)) {
      if (tmp.children) {
        tmp.children = filterRolesAsyncRoutes(tmp.children, authList)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, auth) {
    return new Promise(resolve => {
      // console.log('-auth-', auth)
      let accessedRoutes = filterAsyncRoutes(asyncRoutes, auth)
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  },
  generateRolesRoutes({ commit }, roles) {
    return new Promise(resolve => {
      let accessedRoutes
      if (roles.includes('admin')) {
        accessedRoutes = asyncRoutes || []
      } else {
        accessedRoutes = filterRolesAsyncRoutes(asyncRoutes, roles)
      }
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
