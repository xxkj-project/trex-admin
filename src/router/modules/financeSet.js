/*
 * @Author: wangshengxian
 * @Date: 2020-12-30 09:45:53
 * @LastEditors: wangshengxian
 * @LastEditTime: 2021-01-21 17:37:49
 * @Desc: 财务设置 - router
 */
import Layout from '@/views/layout'

// banner列表
const RechargeList = () => import(/* webpackChunkName: 'rechargeList' */ '@/views/financeSet/rechargeList')
const WithdrawList = () => import(/* webpackChunkName: 'withdrawList' */ '@/views/financeSet/withdrawList')
const OrderList = () => import(/* webpackChunkName: 'orderList' */ '@/views/financeSet/orderList')
const PendingOrderList = () => import(/* webpackChunkName: 'pendingOrderList' */ '@/views/financeSet/pendingOrderList')
const AppealList = () => import(/* webpackChunkName: 'appealList' */ '@/views/financeSet/appealList')
const ExchangeList = () => import(/* webpackChunkName: 'exchangeList' */ '@/views/financeSet/exchangeList')

const financeSetRouter = {
  path: '/financeSet',
  name: 'FinanceSet',
  component: Layout,
  redirect: '/financeSet/rechargeList',
  alwaysShow: true,
  meta: {
    title: '财务设置',
    icon: 'finance'
  },
  children: [
    {
      path: 'rechargeList',
      name: 'RechargeList',
      component: RechargeList,
      meta: {
        title: '充值记录列表',
        icon: 'menu'
      }
    },
    {
      path: 'withdrawList',
      name: 'WithdrawList',
      component: WithdrawList,
      meta: {
        title: '提现记录列表',
        icon: 'menu'
      }
    },
    {
      path: 'orderList',
      name: 'OrderList',
      component: OrderList,
      meta: {
        title: 'OTC订单列表',
        icon: 'menu'
      }
    },
    {
      path: 'pendingOrderList',
      name: 'PendingOrderList',
      component: PendingOrderList,
      meta: {
        title: 'OTC挂单列表',
        icon: 'menu'
      }
    },
    {
      path: 'appealList',
      name: 'AppealList',
      component: AppealList,
      meta: {
        title: '申诉列表',
        icon: 'menu'
      }
    },
    {
      path: 'exchangeList',
      name: 'ExchangeList',
      component: ExchangeList,
      meta: {
        title: '兑换记录列表',
        icon: 'menu'
      }
    }
  ]
}

export default financeSetRouter
