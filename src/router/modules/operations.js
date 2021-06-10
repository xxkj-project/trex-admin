/*
 * @Author: wangshengxian
 * @Date: 2020-12-30 09:45:53
 * @LastEditors: wangshengxian
 * @LastEditTime: 2021-01-21 17:38:27
 * @Desc: 运营管理 - router
 */
import Layout from '@/views/layout'

// banner列表
const BannerList = () => import(/* webpackChunkName: 'bannerList' */ '@/views/operations/bannerList')
const WithdrawRateList = () => import(/* webpackChunkName: 'withdrawRateList' */ '@/views/operations/withdrawRateList')
const CurrencyRateList = () => import(/* webpackChunkName: 'currencyRateList' */ '@/views/operations/currencyRateList')

const operationsRouter = {
  path: '/operations',
  name: 'Operations',
  component: Layout,
  redirect: '/operations/bannerList',
  alwaysShow: true,
  meta: {
    title: '运营管理',
    icon: 'operate'
  },
  children: [
    {
      path: 'bannerList',
      name: 'BannerList',
      component: BannerList,
      meta: {
        title: 'banner列表',
        icon: 'menu'
      }
    },
    {
      path: 'withdrawRateList',
      name: 'WithdrawRateList',
      component: WithdrawRateList,
      meta: {
        title: '提现费率列表',
        icon: 'menu'
      }
    },
    {
      path: 'currencyRateList',
      name: 'CurrencyRateList',
      component: CurrencyRateList,
      meta: {
        title: '货币兑换汇率列表',
        icon: 'menu'
      }
    }
  ]
}

export default operationsRouter
