/*
 * @Author: wangshengxian
 * @Date: 2020-12-30 09:45:53
 * @LastEditors: wangshengxian
 * @LastEditTime: 2021-02-04 10:16:42
 * @Desc: 程序监控 - router
 */
import Layout from '@/views/layout'

// banner列表
const LogList = () => import(/* webpackChunkName: 'logList' */ '@/views/monitoring/logList')
// const OnLineUsers = () => import(/* webpackChunkName: 'onLineUsers' */ '@/views/monitoring/onLineUsers')

const monitoringRouter = {
  path: '/monitoring',
  name: 'Monitoring',
  component: Layout,
  redirect: '/monitoring/logList',
  alwaysShow: true,
  meta: {
    title: '程序监控',
    icon: 'monitor'
  },
  children: [
    {
      path: 'logList',
      name: 'LogList',
      component: LogList,
      meta: {
        title: '操作日志列表',
        icon: 'menu'
      }
    }
    // {
    //   path: 'onLineUsers',
    //   name: 'OnLineUsers',
    //   component: OnLineUsers,
    //   meta: {
    //     title: '在线用户信息',
    //     icon: 'menu'
    //   }
    // }
  ]
}

export default monitoringRouter
