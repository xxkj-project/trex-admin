<!--
 * @Author: wangshengxian
 * @Date: 2021-02-03 20:30:57
 * @LastEditors: wangshengxian
 * @LastEditTime: 2021-02-03 20:31:35
 * @Desc: 用户余额排行榜
-->
<template>
  <div class="balance-list-page">
    <searchForm :formOptions="formOptions" @onSearch="onSearch"> </searchForm>
    <div class="main">
      <div class="listBox">
        <div class="tableBox">
          <el-table :data="tableList" tooltip-effect="dark" style="width: 100%">
            <el-table-column prop="userId" label="用户ID" min-width="120"></el-table-column>
            <el-table-column prop="userName" label="用户名" min-width="120"></el-table-column>
            <el-table-column prop="coin" label="币种" min-width="100"></el-table-column>
            <el-table-column prop="sum" label="余额" min-width="160" sortable></el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import searchForm from '@/components/searchForm'
import { getUserCoinRank } from '@/api/user'
import coinMixins from '@/mixins/getCoinList'
export default {
  components: {
    searchForm
  },
  mixins: [coinMixins],
  data() {
    return {
      searchData: {
        coin: ''
      },
      tableList: []
    }
  },
  computed: {
    formOptions() {
      let result = [
        {
          element: 'el-select',
          label: '币种',
          prop: 'coin',
          options: this.coinList,
          initValue: '',
          placeholder: '请输入币种'
        }
      ]
      return result
    }
  },
  created() {
    // TODO: 注意：资金排行榜默认显示各币种前十位
    this.getData()
  },
  mounted() {},

  methods: {
    onSearch(data) {
      console.log('-search-', data)
      const { coin } = data
      if (!coin) {
        this.$message({
          message: '请选择币种',
          type: 'warning'
        })
        return
      }
      this.searchData.coin = this.coinList[coin].label
      this.getData()
    },
    getData() {
      const params = { ...this.searchData }
      console.log('-params-', params)
      getUserCoinRank(params).then(res => {
        this.tableList = res.data
      })
    }
  }
}
</script>

<style lang="less" scoped>
//@import url(); 引入公共css类
</style>
