<!--
 * @Author: wangshengxian
 * @Date: 2020-11-30 15:38:46
 * @LastEditors: wangshengxian
 * @LastEditTime: 2021-01-22 11:06:53
 * @Desc: 提现记录列表 - page
-->
<template>
  <div class="recharge-list-page">
    <searchForm :formOptions="formOptions" @onSearch="onSearch"> </searchForm>
    <div class="main">
      <div class="listBox">
        <div class="tableBox">
          <el-table :data="tableList" tooltip-effect="dark" style="width: 100%">
            <el-table-column prop="userId" label="用户ID" min-width="160"></el-table-column>
            <el-table-column prop="userName" label="用户名" min-width="100"></el-table-column>
            <el-table-column prop="withdrawId" label="提现Id" min-width="160"></el-table-column>
            <el-table-column prop="txId" label="提现地址" min-width="200"></el-table-column>
            <el-table-column prop="coin" label="币种" min-width="100"></el-table-column>
            <el-table-column prop="price" label="价格" min-width="100"></el-table-column>
            <el-table-column prop="fee" label="手续费" :formatter="feeFormatter" min-width="100"></el-table-column>
            <el-table-column prop="link" label="跳转url" min-width="180"></el-table-column>

            <el-table-column prop="createTime" label="创建时间" min-width="160"></el-table-column>
            <el-table-column prop="updateTime" label="修改时间" min-width="160"></el-table-column>
          </el-table>
        </div>
        <pagination
          :currentPage.sync="pagination.currentPage"
          :pageSize.sync="pagination.pageSize"
          :total="pagination.total"
          @currentChange="currentChange"
          @sizeChange="sizeChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
import searchForm from '@/components/searchForm'
import pagination from '@/components/pagination'
import { getWithdrawList } from '@/api/financeSet'
import coinMixins from '@/mixins/getCoinList'
export default {
  name: '',
  mixins: [coinMixins],
  data() {
    return {
      searchData: {
        user: '',
        coin: '',
        startDate: '',
        endDate: ''
      },
      pagination: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      tableList: []
    }
  },
  computed: {
    formOptions() {
      let result = [
        {
          element: 'el-input',
          label: '用户ID/用户名',
          prop: 'user',
          initValue: '',
          placeholder: '请输入用户ID/用户名'
        },
        {
          element: 'el-select',
          label: '币种',
          prop: 'coin',
          options: this.coinList,
          initValue: '',
          placeholder: '全部'
        },
        {
          label: '日期',
          prop: 'times',
          element: 'el-date-picker',
          initValue: '',
          placeholder: ''
        }
      ]
      return result
    }
  },
  created() {
    this.getData()
  },
  mounted() {},
  methods: {
    feeFormatter(row) {
      return row.fee || '无'
    },
    getInitData(pageNum = 1, pageSize = 10) {
      this.pagination.currentPage = pageNum
      this.pagination.pageSize = pageSize
      this.getData()
    },
    onSearch(data) {
      const { times, coin, ...otherObj } = data
      this.searchData = { ...otherObj }
      this.searchData.startDate = times ? times[0] : ''
      this.searchData.endDate = times ? times[1] : ''
      this.searchData.coin = coin ? this.coinList[coin].label : ''
      this.getInitData()
    },
    currentChange(pageNum) {
      this.getInitData(pageNum, this.pagination.pageSize)
    },
    sizeChange(pageSize) {
      this.getInitData(1, pageSize)
    },

    getData() {
      const params = { pageNum: this.pagination.currentPage, pageSize: this.pagination.pageSize, ...this.searchData }
      // console.log('-params-', params)
      getWithdrawList(params).then(res => {
        const { count, list } = res.data
        this.pagination.total = count
        this.tableList = list
        // console.log('-list-', this.tableList)
      })
    }
  },
  components: { searchForm, pagination }
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
</style>
