/**
 * 系统设置 - router
 */
import Layout from '@/views/layout'

const hidden = process.env.NODE_ENV === 'production'

// 管理员列表
const AdminsList = () => import(/* webpackChunkName: 'adminsList' */ '@/views/system/adminsList')
// 角色列表
const RolesList = () => import(/* webpackChunkName: 'rolesList' */ '@/views/system/rolesList')
// 菜单列表
const MenusList = () => import(/* webpackChunkName: 'menusList' */ '@/views/system/menusList')
// 二级菜单列表
const SubMenusList = () => import(/* webpackChunkName: 'subMenusList' */ '@/views/system/menusList/subMenusList')
// 角色菜单
const RoleMenu = () => import(/* webpackChunkName: 'roleMenu' */ '@/views/system/rolesList/roleMenu')

const systemRouter = {
  path: '/system',
  name: 'System',
  component: Layout,
  redirect: '/system/managePersonList',
  alwaysShow: true,
  meta: {
    title: '系统设置',
    icon: 'system'
  },
  children: [
    {
      // TODO: 此处的 /system/adminsList 路径 和 nginx的某些项目配置的正则匹配有冲突，改名 adminsList => managePersonList，否则点击浏览器刷新按钮报错 404
      path: 'managePersonList',
      name: 'AdminsList',
      component: AdminsList,
      meta: {
        title: '管理员列表',
        icon: 'menu'
      }
    },
    {
      path: 'rolesList',
      name: 'RolesList',
      component: RolesList,
      meta: {
        title: '角色列表',
        icon: 'menu'
      }
    },
    {
      path: 'menusList',
      name: 'MenusList',
      component: MenusList,
      hidden: hidden,
      meta: {
        title: '菜单列表',
        icon: 'menu'
      }
    },
    {
      path: 'subMenusList',
      name: 'SubMenusList',
      component: SubMenusList,
      hidden: true,
      meta: {
        title: '二级菜单列表',
        icon: 'menu'
      }
    },
    {
      path: 'roleMenu',
      name: 'RoleMenu',
      component: RoleMenu,
      hidden: true,
      meta: {
        title: '角色菜单',
        icon: 'menu'
      }
    }
  ]
}
export default systemRouter
