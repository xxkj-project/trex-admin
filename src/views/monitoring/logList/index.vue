<!--
 * @Author: wangshengxian
 * @Date: 2020-11-30 15:38:46
 * @LastEditors: wangshengxian
 * @LastEditTime: 2021-01-08 10:18:57
 * @Desc: 管理员操作日志列表 - page
-->
<template>
  <div class="log-list-page">
    <searchForm :formOptions="formOptions" @onSearch="onSearch"> </searchForm>
    <div class="main">
      <div class="listBox">
        <div class="tableBox">
          <el-table :data="tableList" tooltip-effect="dark" style="width: 100%">
            <el-table-column prop="adminId" label="管理员ID" min-width="100"></el-table-column>
            <el-table-column prop="adminName" label="管理员名" min-width="140"></el-table-column>
            <el-table-column prop="action" label="功能" min-width="140"></el-table-column>
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
import { getLogList } from '@/api/monitoring'
export default {
  name: '',
  data() {
    return {
      searchData: {
        admin: '',
        action: '',
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
          label: '管理员ID/管理员名称',
          prop: 'admin',
          initValue: '',
          placeholder: '请输入管理员ID/管理员名称'
        },
        {
          element: 'el-input',
          label: '功能',
          prop: 'action',
          initValue: '',
          placeholder: '请输入功能'
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
    getInitData(pageNum = 1, pageSize = 10) {
      this.pagination.currentPage = pageNum
      this.pagination.pageSize = pageSize
      this.getData()
    },
    onSearch(data) {
      console.log('-search-', data)
      const { times, ...otherObj } = data
      this.searchData = { ...otherObj }
      this.searchData.startDate = times ? times[0] : ''
      this.searchData.endDate = times ? times[1] : ''
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
      console.log('-params-', params)
      getLogList(params).then(res => {
        // console.log('-res-', res)
        let { count, list } = res.data
        this.pagination.total = count
        this.tableList = list
        console.log('-table-list-', this.tableList)
      })
    }
  },
  components: { searchForm, pagination }
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
</style>
