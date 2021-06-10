/**
 * 全局路由导航守卫 (登录跳转、页面权限校验)
 */
import router from '@/router'
import store from '@/store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import glg from './globalGuards'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

// no redirect whitelist ==> 白名单list
const whiteList = ['/login']

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title ==> 设置标题
  glg.setDocumentTitle(to, from)

  // determine whether the user has logged in ==> 确定用户是否已经登录
  const hasToken = getToken()

  if (!hasToken) {
    // has no token ==> 没有 token
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly ==> 在免登录白名单中，直接进入
      next()
      return
    }
    // other pages that do not have permission to access are redirected to the login page. ==> 其它没有访问权限的页面将重定向到登录页面
    next(`/login?redirect=${to.path}`)
    NProgress.done()
    return
  }

  if (to.path === '/login') {
    // if is logged in, redirect to the home page ==> 如果已经登录重定向到主页
    next({ path: '/' })
    NProgress.done()
    return
  }
  // determine whether the user has obtained his permission roles through getInfo ==> 确定用户是否已通过getInfo获得其权限角色
  const hasRoles = store.getters.roles && store.getters.roles.length > 0
  if (hasRoles) {
    next()
    return
  }
  try {
    // get user info ==> 获取用户信息
    // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
    const { roles } = await store.dispatch('user/getInfo')

    console.log('-roles-', roles)

    // generate accessible routes map based on roles ==> 根据角色生成可访问的路由
    const accessRoutes = await store.dispatch('permission/generateRoutes', roles)

    console.log('-dynamic-route-', accessRoutes)

    // dynamically add accessible routes ==> 动态添加路由
    router.addRoutes(accessRoutes)

    // hack method to ensure that addRoutes is complete
    // set the replace: true, so the navigation will not leave a history record
    next({ ...to, replace: true })
  } catch (error) {
    // remove token and go to login page to re-login ==> 删除 token 并前往登录页
    await store.dispatch('user/resetToken')
    Message.error(error || 'Has Error')
    next(`/login?redirect=${to.path}`)
    NProgress.done()
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
