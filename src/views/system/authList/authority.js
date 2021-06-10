const authorityList = {
  total: 3,
  List: [
    {
      id: '123',
      userName: 'xixi',
      duty: '管理员'
    },
    {
      id: '234',
      userName: 'hehe',
      duty: '组长'
    },
    {
      id: '345',
      userName: 'xiaoxiao',
      duty: '员工'
    }
  ]
}
const List = [
  {
    id: '1',
    label: '财务设置',
    PID: '0',
    isParent: true
  },
  {
    id: '2',
    label: '消息中心',
    PID: '0',
    isParent: true
  },
  {
    id: '3',
    label: '程序监控',
    PID: '0',
    isParent: true
  },
  {
    id: '4',
    label: '充值记录列表',
    PID: '1',
    isParent: false
  },
  {
    id: '5',
    label: '提现记录列表',
    PID: '1',
    isParent: false
  },
  {
    id: '6',
    label: 'OTC订单列表',
    PID: '1',
    isParent: false
  },
  {
    id: '7',
    label: 'OTC挂单列表',
    PID: '1',
    isParent: false
  },
  {
    id: '8',
    label: '申诉列表',
    PID: '1',
    isParent: false
  },
  {
    id: '9',
    label: '兑换记录列表',
    PID: '1',
    isParent: false
  },
  {
    id: '10',
    label: '用户反馈列表',
    PID: '2',
    isParent: false
  },
  {
    id: '11',
    label: '平台公告列表',
    PID: '2',
    isParent: false
  },
  {
    id: '12',
    label: '操作日志列表',
    PID: '3',
    isParent: false
  }
]
export function getAuthorityList() {
  return {
    authorityList
  }
}
export function getList() {
  return {
    List
  }
}
