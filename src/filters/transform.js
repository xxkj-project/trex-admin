/*
 * @Author: wangshengxian
 * @Date: 2020-08-17 15:34:15
 * @LastEditors: wangshengxian
 * @LastEditTime: 2021-01-04 14:51:27
 * @Desc:
 */
/**
 * 字段转中文
 */
// 传v时返回匹配的label(用于转换中文)，不传v时返回data数组(用于el-select等数据)
const getData = (data, v) => {
  if (v === undefined) {
    return data
  } else {
    for (let i = 0; i < data.length; i++) {
      if (data[i].value === v) {
        return data[i].label
      }
    }
  }
}

/**
 * 显示状态
 */
export function displayStatus(v) {
  const data = [
    { value: 1, label: '显示' },
    { value: 2, label: '不显示' }
  ]
  return getData(data, v)
}

/**
 * 用户管理 - 实名认证列表 - 审核状态
 */
export function getCheckStatus(v) {
  const data = [
    { value: '', label: '全部' },
    { value: 0, label: '待审核' },
    { value: 1, label: '审核通过' },
    { value: 2, label: '审核失败' }
  ]
  return getData(data, v)
}
