<!--
 * @Author: wangshengxian
 * @Date: 2020-11-30 15:38:46
 * @LastEditors: wangshengxian
 * @LastEditTime: 2021-01-22 10:53:20
 * @Desc: OTC订单列表 - page
-->
<template>
  <div class="recharge-list-page">
    <searchForm :formOptions="formOptions" @onSearch="onSearch"> </searchForm>
    <div class="main">
      <div class="listBox">
        <div class="tableBox">
          <el-table :data="tableList" tooltip-effect="dark" style="width: 100%">
            <el-table-column prop="buyerId" label="买家id" min-width="160"></el-table-column>
            <!-- <el-table-column prop="adId" label="挂单id" min-width="100"></el-table-column> -->
            <el-table-column prop="bankName" label="开户行" min-width="120"></el-table-column>
            <el-table-column prop="bankNo" label="银行卡号" min-width="120"></el-table-column>
            <el-table-column prop="coin" label="交易币种" min-width="100"></el-table-column>
            <el-table-column prop="quoteUnit" label="报价币种" min-width="100"></el-table-column>
            <!-- <el-table-column prop="currencyCode" label="法币货币" min-width="100"></el-table-column> -->
            <el-table-column prop="amount" label="金额(法币)" min-width="120"></el-table-column>
            <el-table-column prop="price" label="价格(法币)" min-width="120"></el-table-column>
            <!-- <el-table-column prop="quantity" label="数量(数字币)" min-width="120"></el-table-column> -->

            <el-table-column prop="buyerRemark" label="买家备注" min-width="120"></el-table-column>
            <el-table-column prop="makerFee" label="挂单续费(数字币)" min-width="140"></el-table-column>
            <!-- <el-table-column prop="takerFee" label="吃单手续费(数字币)" min-width="140"></el-table-column> -->
            <el-table-column prop="status" label="状态" min-width="100"></el-table-column>
            <el-table-column prop="createdAt" label="创建时间" min-width="160"></el-table-column>
            <el-table-column prop="expiresAt" label="过期时间" min-width="160"></el-table-column>

            <!-- <el-table-column label="操作" min-width="160">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="onAppeal(scope.row, scope.$index)">申诉</el-button>
              </template>
            </el-table-column> -->
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
import { getOrderList, getOrderStatusList } from '@/api/financeSet'
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
      console.log('-search-', data)
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
    // 申诉
    // onAppeal(row, idx) {
    //   console.log('申诉', row, idx)
    //   this.$message({
    //     message: '申诉功能暂未开通！',
    //     type: 'warning'
    //   })
    // },
    getStatusList() {
      getOrderStatusList().then(res => {
        // console.log('-order-status-res-', res)
        const list = res.data
        list && (this.statusList = this.setStatusData(list))
        console.log('-order-status-list-', this.statusList)
      })
    },
    setStatusData(list) {
      let result = list.map((val, index) => {
        return { value: index + 1, label: val }
      })
      result.unshift({ value: '', label: '全部' })
      return result
    },
    getData() {
      const params = { pageNum: this.pagination.currentPage, pageSize: this.pagination.pageSize, ...this.searchData }
      // console.log('-params-', params)
      getOrderList(params).then(res => {
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
