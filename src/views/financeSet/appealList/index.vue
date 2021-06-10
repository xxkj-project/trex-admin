<!--
 * @Author: wangshengxian
 * @Date: 2020-11-30 15:38:46
 * @LastEditors: wangshengxian
 * @LastEditTime: 2021-01-22 10:14:28
 * @Desc: 申诉列表 - page
-->
<template>
  <div class="appeal-list-page">
    <searchForm :formOptions="formOptions" @onSearch="onSearch"> </searchForm>
    <div class="main">
      <div class="listBox">
        <div class="tableBox">
          <el-table :data="tableList" tooltip-effect="dark" style="width: 100%">
            <el-table-column prop="userId" label="用户ID" min-width="160"></el-table-column>
            <el-table-column prop="userName" label="用户名" min-width="140"></el-table-column>
            <el-table-column prop="orderId" label="订单ID" min-width="100"></el-table-column>
            <el-table-column prop="reason" label="备注" :formatter="reasonFormatter" min-width="100"></el-table-column>
            <el-table-column prop="status" label="状态" min-width="100"></el-table-column>
            <el-table-column prop="createdAt" label="创建时间" min-width="160"></el-table-column>
            <el-table-column prop="updatedAt" label="修改时间" min-width="160"></el-table-column>

            <el-table-column label="操作" min-width="90">
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  size="mini"
                  icon="el-icon-warning-outline"
                  :disabled="scope.row.status != 'Pending'"
                  @click="onAppeal(scope.row, scope.$index)"
                  >申诉</el-button
                >
              </template>
            </el-table-column>
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

      <appealDialog :formData="formData" :visible.sync="isAppeal" @success="handleAppealSuccess" />
    </div>
  </div>
</template>

<script>
import searchForm from '@/components/searchForm'
import pagination from '@/components/pagination'
import appealDialog from '@/views/financeSet/components/appeal/handleAppeal'
import { getAppealList, getAppealStatusList } from '@/api/financeSet'
export default {
  name: '',
  data() {
    return {
      isAppeal: false,
      formData: {},
      searchData: {
        user: '',
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
    reasonFormatter(row) {
      return row.reason || '无'
    },
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
    // 申诉
    onAppeal(row, index) {
      console.log('-row-', row)
      this.isAppeal = true
      this.formData = { id: row.id }
    },
    handleAppealSuccess() {
      this.getData()
    },
    // 获取挂单状态list
    getStatusList() {
      getAppealStatusList().then(res => {
        const list = res.data
        list && (this.statusList = this.setStatusData(list))
        // console.log('-status-list-', this.statusList)
      })
    },
    setStatusData(list) {
      let result = list.map((val, index) => ({ value: index + 1, label: val }))
      result.unshift({ value: '', label: '全部' })
      return result
    },
    getData() {
      const params = { pageNum: this.pagination.currentPage, pageSize: this.pagination.pageSize, ...this.searchData }
      getAppealList(params).then(res => {
        let { count, list } = res.data
        this.pagination.total = count
        this.tableList = list
      })
    }
  },
  components: { searchForm, pagination, appealDialog }
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
</style>
