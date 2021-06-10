/*
 * @Author: wangshengxian
 * @Date: 2020-12-30 09:45:53
 * @LastEditors: wangshengxian
 * @LastEditTime: 2021-01-21 17:37:28
 * @Desc: 运营管理 - router
 */
import Layout from '@/views/layout'

// banner列表
const FeedbackList = () => import(/* webpackChunkName: 'feedbackList' */ '@/views/message/feedbackList')
const NoticeList = () => import(/* webpackChunkName: 'noticeList' */ '@/views/message/noticeList')

const messageRouter = {
  path: '/message',
  name: 'Message',
  component: Layout,
  redirect: '/message/feedbackList',
  alwaysShow: true,
  meta: {
    title: '消息中心',
    icon: 'message-1'
  },
  children: [
    {
      path: 'feedbackList',
      name: 'FeedbackList',
      component: FeedbackList,
      meta: {
        title: '用户反馈列表',
        icon: 'menu'
      }
    },
    {
      path: 'noticeList',
      name: 'NoticeList',
      component: NoticeList,
      meta: {
        title: '平台公告列表',
        icon: 'menu'
      }
    }
  ]
}

export default messageRouter
