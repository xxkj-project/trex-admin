<!--
 * @Author: wangshengxian
 * @Date: 2020-11-30 15:38:46
 * @LastEditors: wangshengxian
 * @LastEditTime: 2021-01-22 10:13:27
 * @Desc: 兑换记录列表 - page
-->
<template>
  <div class="exchange-list-page">
    <searchForm :formOptions="formOptions" @onSearch="onSearch"> </searchForm>
    <div class="main">
      <div class="listBox">
        <div class="tableBox">
          <el-table :data="tableList" tooltip-effect="dark" style="width: 100%">
            <el-table-column prop="userId" label="用户ID" min-width="160"></el-table-column>
            <el-table-column prop="userName" label="用户名" min-width="140"></el-table-column>
            <el-table-column prop="coin" label="交易币种" min-width="100"></el-table-column>
            <el-table-column prop="quoteUnit" label="报价币种" min-width="100"></el-table-column>
            <el-table-column prop="price" label="委托价格" min-width="100"></el-table-column>
            <el-table-column prop="fee" label="费率" min-width="100"></el-table-column>
            <el-table-column prop="status" label="状态" min-width="100"></el-table-column>
            <el-table-column prop="createdAt" label="创建时间" min-width="160"></el-table-column>
            <el-table-column prop="updatedAt" label="修改时间" min-width="160"></el-table-column>
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
import { getExchangeRecordList } from '@/api/financeSet'
export default {
  name: '',
  data() {
    return {
      searchData: {
        user: '',
        coin: '',
        quoteUnit: '',
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
    getInitData(pageNum = 1, pageSize = 10) {
      this.pagination.currentPage = pageNum
      this.pagination.pageSize = pageSize
      this.getData()
    },
    onSearch(data) {
      // console.log('-search-', data)
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
    getData() {
      const params = { pageNum: this.pagination.currentPage, pageSize: this.pagination.pageSize, ...this.searchData }
      getExchangeRecordList(params).then(res => {
        const { count, list } = res.data
        this.pagination.total = count
        this.tableList = list
      })
    }
  },
  components: { searchForm, pagination }
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
</style>
