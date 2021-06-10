// import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'
import { getAuthMenusList } from '@/api/system'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: [],
  routerList: [] // 路由表
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_ROUTER: (state, routerList) => {
    state.routerList = routerList
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    console.log('-actions-', userInfo)
    const { key, auth } = userInfo
    console.log('-key-', key, '-auth-list-', auth)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        commit('SET_TOKEN', key)
        commit('SET_ROUTER', auth)
        setToken(key)
        resolve()
      }, 100)
    })
  },
  // get user info ==> 获取用户信息，包括用户的权限路由表
  getInfo({ commit, state }) {
    // const authList = auth.admin
    return new Promise((resolve, reject) => {
      getAuthMenusList().then(res => {
        // console.log('-auth-res-', res)
        const authList = res.data
        // console.log('-menus-list-', authList)
        const data = {
          roles: ['admin'],
          introduction: 'I am a super administrator',
          avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
          name: 'Super Admin',
          auth: authList
        }
        // console.log('-data-', data)

        if (!data) {
          // 验证失败，请再次登录
          reject(new Error('Verification failed, please Login again.'))
        }

        const { auth, roles, name, avatar, introduction } = data

        // roles must be a non-empty array 角色必须为非空数组
        if (!roles || roles.length <= 0) {
          reject(new Error('getInfo: roles must be a non-null array!'))
        }

        commit('SET_ROLES', roles)
        commit('SET_ROUTER', auth)
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        commit('SET_INTRODUCTION', introduction)
        resolve(data)
      })
    })
  },

  // user logout
  logout({ commit, state, dispatch }) {
    console.log('-------111-------')
    commit('SET_TOKEN', '')
    commit('SET_ROLES', [])
    commit('SET_ROUTER', [])
    removeToken()
    resetRouter()
    dispatch('tagsView/delAllViews', null, { root: true })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      commit('SET_ROUTER', [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  changeRoles({ commit, dispatch }, role) {
    return new Promise(async resolve => {
      const token = role + '-token'

      commit('SET_TOKEN', token)
      setToken(token)

      const { roles } = await dispatch('getInfo')

      resetRouter()

      // generate accessible routes map based on roles
      const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })

      // dynamically add accessible routes
      router.addRoutes(accessRoutes)

      // reset visited views and cached views
      dispatch('tagsView/delAllViews', null, { root: true })

      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
