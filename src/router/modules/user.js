/*
 * @Author: wangshengxian
 * @Date: 2020-12-30 09:45:53
 * @LastEditors: wangshengxian
 * @LastEditTime: 2021-02-04 09:37:15
 * @Desc: 用户管理 - router
 */
import Layout from '@/views/layout'

const UserList = () => import(/* webpackChunkName: 'userList' */ '@/views/user/userList')
const AssetsList = () => import(/* webpackChunkName: 'AssetsList' */ '@/views/user/assetsList')
const CertificationList = () => import(/* webpackChunkName: 'certificationList' */ '@/views/user/certificationList')
const CoinList = () => import(/* webpackChunkName: 'coinList' */ '@/views/user/coinList')
const LoginList = () => import(/* webpackChunkName: 'loginList' */ '@/views/user/loginList')
const IntegralList = () => import(/* webpackChunkName: 'integral' */ '@/views/user/integral')
const IntegralQuery = () => import(/* webpackChunkName: 'integralQuery' */ '@/views/user/integralQuery')

const userRouter = {
  path: '/user',
  name: 'User',
  component: Layout,
  redirect: '/user/assetsList',
  alwaysShow: true,
  meta: {
    title: '用户管理',
    icon: 'user'
  },
  children: [
    {
      path: 'userList',
      name: 'UserList',
      component: UserList,
      meta: {
        title: '会员列表',
        icon: 'menu'
      }
    },
    {
      path: 'assetsList',
      name: 'AssetsList',
      component: AssetsList,
      meta: {
        title: '用户资产列表',
        icon: 'menu'
      }
    },
    {
      path: 'certificationList',
      name: 'CertificationList',
      component: CertificationList,
      meta: {
        title: '实名认证列表',
        icon: 'menu'
      }
    },
    {
      path: 'coinList',
      name: 'CoinList',
      component: CoinList,
      meta: {
        title: '币种列表',
        icon: 'menu'
      }
    },
    {
      path: 'loginList',
      name: 'LoginList',
      component: LoginList,
      meta: {
        title: '登录日志',
        icon: 'menu'
      }
    },
    {
      path: 'integralList',
      name: 'IntegralList',
      component: IntegralList,
      meta: {
        title: '积分日志',
        icon: 'menu'
      }
    },
    {
      path: 'integralQuery',
      name: 'IntegralQuery',
      component: IntegralQuery,
      meta: {
        title: '积分查询',
        icon: 'menu'
      }
    }
  ]
}

export default userRouter
