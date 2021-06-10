let role1 = [
  { id: 1, title: '财务设置', perms: 'FinanceSet', parentId: 0 },
  { id: 2, title: '充值记录列表', perms: 'RechargeList', parentId: 1 },
  { id: 7, title: '提现记录列表', perms: 'WithdrawList', parentId: 1 },
  { id: 8, title: 'OTC订单列表', perms: 'OrderList', parentId: 1 }
  // { id: 9, title: 'OTC挂单列表', perms: 'PendingOrderList', parentId: 1 },
  // { id: 10, title: '申诉列表', perms: 'AppealList', parentId: 1 },
  // { id: 11, title: '兑换记录列表', perms: 'ExchangeList', parentId: 1 }
]

let role2 = [
  { id: 3, perms: 'Message', parentId: 0 },
  { id: 5, perms: 'FeedbackList', parentId: 3 },
  { id: 12, perms: 'NoticeList', parentId: 3 },
  { id: 6, perms: 'Monitoring', parentId: 0 },
  { id: 4, perms: 'LogList', parentId: 6 }
]

let admin = [
  { id: 1, title: '财务设置', perms: 'FinanceSet', parentId: 0 },
  { id: 2, title: '充值记录列表', perms: 'RechargeList', parentId: 1 },
  { id: 7, title: '提现记录列表', perms: 'WithdrawList', parentId: 1 },
  { id: 8, title: 'OTC订单列表', perms: 'OrderList', parentId: 1 },
  { id: 9, title: 'OTC挂单列表', perms: 'PendingOrderList', parentId: 1 },
  { id: 10, title: '申诉列表', perms: 'AppealList', parentId: 1 },
  { id: 11, title: '兑换记录列表', perms: 'ExchangeList', parentId: 1 },

  { id: 3, title: '消息中心', perms: 'Message', parentId: 0 },
  { id: 5, title: '用户反馈列表', perms: 'FeedbackList', parentId: 3 },
  { id: 12, title: '平台公告列表', perms: 'NoticeList', parentId: 3 },

  { id: 6, title: '程序监控', perms: 'Monitoring', parentId: 0 },
  { id: 4, title: '操作日志列表', perms: 'LogList', parentId: 6 },

  { id: 13, title: '运营管理', perms: 'Operations', parentId: 0 },
  { id: 14, title: 'banner列表', perms: 'BannerList', parentId: 13 },
  { id: 15, title: '提现费率列表', perms: 'WithdrawRateList', parentId: 13 },
  { id: 33, title: '货币兑换费率列表', perms: 'CurrencyRateList', parentId: 13 },

  { id: 16, title: '用户统计', perms: 'Statistic', parentId: 0 },
  { id: 17, title: '注册量', perms: 'RegisterList', parentId: 16 },
  { id: 18, title: '在线用户', perms: 'OnlineList', parentId: 16 },

  { id: 19, title: '用户财富统计', perms: 'Treasure', parentId: 0 },
  { id: 20, title: '用户余额排行榜', perms: 'BalanceList', parentId: 19 },
  { id: 21, title: '系统内沉淀得资金', perms: 'CapitalList', parentId: 19 },

  { id: 22, title: '系统设置', perms: 'System', parentId: 0 },
  { id: 23, title: '管理员列表', perms: 'AdminsList', parentId: 22 },
  { id: 24, title: '角色列表', perms: 'RolesList', parentId: 22 },
  { id: 34, title: '菜单列表', perms: 'MenusList', parentId: 22 },
  { id: 34, title: '二级菜单列表', perms: 'SubMenusList', parentId: 22 },

  { id: 25, title: '用户管理', perms: 'User', parentId: 0 },
  { id: 26, title: '会员列表', perms: 'UserList', parentId: 25 },
  { id: 27, title: '用户资产列表', perms: 'AssetsList', parentId: 25 },
  { id: 28, title: '实名认证列表', perms: 'CertificationList', parentId: 25 },
  { id: 29, title: '币种列表', perms: 'CoinList', parentId: 25 },
  { id: 31, title: '登录日志', perms: 'LoginList', parentId: 25 },
  { id: 33, title: '积分日志', perms: 'IntegralList', parentId: 25 }
]

export default {
  admin,
  role1,
  role2
}
