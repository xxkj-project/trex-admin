/*
 * @Author: wangshengxian
 * @Date: 2021-02-03 20:39:22
 * @LastEditors: wangshengxian
 * @LastEditTime: 2021-02-04 09:49:30
 * @Desc: 用户财富统计
 */
import Layout from '@/views/layout'

const BalanceList = () => import(/* webpackChunkName: 'bannerList' */ '@/views/treasure/balance')
const CapitalList = () => import(/* webpackChunkName: 'capitalList' */ '@/views/treasure/capital')

const treasureRouter = {
  path: '/treasure',
  name: 'Treasure',
  component: Layout,
  redirect: '/treasure/balanceList',
  alwaysShow: true,
  meta: {
    title: '用户财富统计',
    icon: 'wealth'
  },
  children: [
    {
      path: 'balanceList',
      name: 'BalanceList',
      component: BalanceList,
      meta: {
        title: '用户余额排行榜',
        icon: 'menu'
      }
    },
    {
      path: 'capitalList',
      name: 'CapitalList',
      component: CapitalList,
      meta: {
        title: '系统内沉淀的资金',
        icon: 'menu'
      }
    }
  ]
}
export default treasureRouter
