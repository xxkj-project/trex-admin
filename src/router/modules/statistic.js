/*
 * @Author: wangshengxian
 * @Date: 2021-02-03 18:19:50
 * @LastEditors: wangshengxian
 * @LastEditTime: 2021-02-04 09:49:23
 * @Desc: 用户统计 - router
 */
import Layout from '@/views/layout'

const RegisterList = () => import(/* webpackChunkName: 'registerLIst' */ '@/views/statistic/registerList')
const OnlineList = () => import(/* webpackChunkName: 'onlineList' */ '@/views/statistic/onlineList')

const statisticRouter = {
  path: '/statistic',
  name: 'Statistic',
  component: Layout,
  redirect: '/statistic/registerList',
  alwaysShow: true,
  meta: {
    title: '用户统计',
    icon: 'userstatistics'
  },
  children: [
    {
      path: 'registerList',
      name: 'RegisterList',
      component: RegisterList,
      meta: {
        title: '注册量',
        icon: 'menu'
      }
    },
    {
      path: 'onlineList',
      name: 'OnlineList',
      component: OnlineList,
      meta: {
        title: '在线用户',
        icon: 'menu'
      }
    }
  ]
}
export default statisticRouter
