/*
 * @Author: wangshengxian
 * @Date: 2021-01-07 15:43:41
 * @LastEditors: wangshengxian
 * @LastEditTime: 2021-01-07 16:01:05
 * @Desc:
 */
import { getCoinList } from '@/api/user'
export default {
  data() {
    return {
      coinList: []
    }
  },
  mounted() {
    this.getMixinsCoinList()
  },
  methods: {
    getMixinsCoinList() {
      getCoinList().then(res => {
        const list = res.data
        list && (this.coinList = this.setStatusData(list))
        // console.log('-coin-list-', this.coinList)
      })
    },
    setStatusData(list) {
      let result = list.map((val, index) => ({ value: index + 1, label: val.coin }))
      // result.unshift({ value: '', label: '全部' })
      return [{ value: '', label: '全部' }, ...result]
    }
  }
}
