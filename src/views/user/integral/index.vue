<!--
 * @Author: wangshengxian
 * @Date: 2021-02-03 20:30:57
 * @LastEditors: wangshengxian
 * @LastEditTime: 2021-02-03 20:31:35
 * @Desc: 用户积分日志
-->
<template>
  <div class="integral-list-page">
    <searchForm :formOptions="formOptions" @onSearch="handleSearch"> </searchForm>

    <div class="main">
      <div class="listBox">
        <div class="tableBox">
          <el-table :data="tableList" tooltip-effect="dark" style="width: 100%">
            <el-table-column prop="id" label="ID" min-width="100"></el-table-column>
            <el-table-column prop="userId" label="用户名ID" min-width="140"></el-table-column>
            <el-table-column prop="nickName" label="昵称" min-width="120"></el-table-column>
            <el-table-column prop="adminId" label="管理员ID" min-width="100"></el-table-column>
            <el-table-column prop="adminName" label="管理员名" min-width="120"></el-table-column>
            <el-table-column prop="beforeIntegral" label="积分前" min-width="100"></el-table-column>
            <el-table-column prop="afterIntegral" label="积分后" min-width="100"></el-table-column>
            <el-table-column prop="changeIntegral" label="积分变化" min-width="100"></el-table-column>
            <el-table-column prop="createTime" label="创建时间" min-width="160"></el-table-column>
            <el-table-column prop="createTime" label="修改时间" min-width="160"></el-table-column>
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
import { getUserIntegralLog } from '@/api/user'
import tools from '@/utils/tools'
export default {
  components: { searchForm, pagination },
  data() {
    return {
      searchData: {
        user: '',
        admin: '',
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
  created() {},
  mounted() {
    this.getData()
  },
  computed: {
    formOptions() {
      let result = [
        {
          element: 'el-input',
          label: '用户ID/昵称',
          prop: 'user',
          initValue: '',
          placeholder: '请输入ID/昵称'
        },
        {
          element: 'el-input',
          label: '管理员ID/管理员名',
          prop: 'admin',
          initValue: '',
          placeholder: '请输入管理员ID/管理员名'
        },
        {
          element: 'el-date-picker',
          label: '时间',
          prop: 'times',
          initValue: ''
        }
      ]
      return result
    }
  },
  methods: {
    getInitData(pageNum = 1, pageSize = 10) {
      this.pagination.currentPage = pageNum
      this.pagination.pageSize = pageSize
      this.getData()
    },
    handleSearch(data) {
      // console.log('-search-', data)
      const { times, ...otherObj } = data
      this.searchData = { ...otherObj }
      this.searchData.startDate = times ? tools.formatDate(times[0], '{y}-{m}-{d}') : ''
      this.searchData.endDate = times ? tools.formatDate(times[1], '{y}-{m}-{d}') : ''
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
      getUserIntegralLog(params).then(res => {
        // console.log('-res-', res)
        const { count, list } = res.data
        this.tableList = list
        this.pagination.total = count
      })
    }
  }
}
</script>

<style lang="less" scoped>
//@import url(); 引入公共css类
</style>
