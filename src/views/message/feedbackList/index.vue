<!--
 * @Author: wangshengxian
 * @Date: 2020-11-30 15:38:46
 * @LastEditors: wangshengxian
 * @LastEditTime: 2021-01-16 17:17:28
 * @Desc: 用户反馈列表 - page
-->
<template>
  <div class="feedback-list-page">
    <searchForm :formOptions="formOptions" @onSearch="onSearch"> </searchForm>
    <div class="main">
      <div class="listBox">
        <div class="tableBox">
          <el-table :data="tableList" tooltip-effect="dark" style="width: 100%">
            <el-table-column prop="userId" label="用户ID" min-width="150"></el-table-column>
            <el-table-column prop="userName" label="用户名" min-width="140"></el-table-column>
            <el-table-column prop="feedBack" label="反馈信息" min-width="140"></el-table-column>
            <el-table-column prop="createTime" label="创建时间" min-width="160"></el-table-column>
            <el-table-column prop="updateTime" label="修改时间" min-width="160"></el-table-column>
            <el-table-column
              prop="dataStatus"
              label="是否有效"
              :formatter="statusFormatter"
              min-width="140"
            ></el-table-column>

            <!-- <el-table-column label="操作" min-width="160">

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
import { getFeedbackList } from '@/api/message'
export default {
  name: '',
  data() {
    return {
      searchData: {
        user: '',
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
    statusFormatter(row) {
      return row.dataStatus ? '是' : '否'
    },
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
      getFeedbackList(params).then(res => {
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
