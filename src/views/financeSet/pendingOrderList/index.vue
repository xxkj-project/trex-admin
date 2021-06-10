<!--
 * @Author: wangshengxian
 * @Date: 2020-11-30 15:38:46
 * @LastEditors: wangshengxian
 * @LastEditTime: 2021-01-22 12:48:32
 * @Desc: OTC挂单列表 - page
-->
<template>
  <div class="pending-order-list-page">
    <searchForm :formOptions="formOptions" @onSearch="onSearch"> </searchForm>
    <div class="main">
      <div class="listBox">
        <div class="tableBox">
          <el-table :data="tableList" tooltip-effect="dark" style="width: 100%">
            <el-table-column prop="userId" label="用户ID" min-width="160"></el-table-column>
            <el-table-column prop="userName" label="用户名" min-width="120"></el-table-column>
            <el-table-column prop="bankName" label="开户行" min-width="100"></el-table-column>
            <el-table-column prop="bankNo" label="银行卡账号" min-width="100"></el-table-column>
            <el-table-column prop="coin" label="交易币种" min-width="100"></el-table-column>
            <el-table-column prop="quoteUnit" label="报价币种" min-width="100"></el-table-column>
            <el-table-column prop="status" label="状态" min-width="100"></el-table-column>
            <el-table-column prop="price" label="委托价格" min-width="120"></el-table-column>
            <el-table-column prop="createTime" label="创建时间" min-width="160"></el-table-column>
            <el-table-column prop="upadteTime" label="修改时间" min-width="160"></el-table-column>
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
import { getPendingOrderList, getPendingOrderStatusList } from '@/api/financeSet'
export default {
  name: '',
  data() {
    return {
      searchData: {
        user: '',
        // coin: '',
        // quoteUnit: '',
        status: '',
        startDate: '',
        endDate: ''
      },
      pagination: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      tableList: [],
      statusList: []
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
        // {
        //   element: 'el-input',
        //   label: '交易币种',
        //   prop: 'coin',
        //   initValue: '',
        //   placeholder: '请输入币种'
        // },
        // {
        //   element: 'el-input',
        //   label: '报价币种',
        //   prop: 'quoteUnit',
        //   initValue: '',
        //   placeholder: '请输入币种'
        // },
        {
          element: 'el-select',
          label: '状态',
          prop: 'status',
          options: this.statusList,
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
    this.getStatusList()
    this.getData()
  },
  mounted() {},
  methods: {
    getInitData(pageNum = 1, pageSize = 10) {
      this.pagination.currentPage = pageNum
      this.pagination.pageSize = pageSize
      this.getData()
    },
    onSearch(data) {
      const { times, status, ...otherObj } = data
      this.searchData = { ...otherObj }
      this.searchData.startDate = times ? times[0] : ''
      this.searchData.endDate = times ? times[1] : ''
      this.searchData.status = status ? this.statusList[status].label : ''
      this.getInitData()
    },
    currentChange(pageNum) {
      this.getInitData(pageNum, this.pagination.pageSize)
    },
    sizeChange(pageSize) {
      this.getInitData(1, pageSize)
    },
    // 获取挂单状态list
    getStatusList() {
      getPendingOrderStatusList().then(res => {
        // console.log('-status-res-', res)
        const list = res.data
        list && (this.statusList = this.setStatusData(list))
        console.log('-status-list-', this.statusList)
      })
    },
    setStatusData(list) {
      let result = list.map((val, index) => ({ value: index + 1, label: val }))
      result.unshift({ value: '', label: '全部' })
      return result
    },
    getData() {
      const params = { pageNum: this.pagination.currentPage, pageSize: this.pagination.pageSize, ...this.searchData }
      // console.log('-params-', params)
      getPendingOrderList(params).then(res => {
        const { count, list } = res.data
        this.pagination.total = count
        this.tableList = list
        // console.log('-table-list-', this.tableList)
      })
    }
  },
  components: { searchForm, pagination }
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
</style>
