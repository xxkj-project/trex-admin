<!--
 * @Author: wangshengxian
 * @Date: 2020-11-30 15:38:46
 * @LastEditors: wangshengxian
 * @LastEditTime: 2021-01-21 17:23:16
 * @Desc: 用户列表 - page
-->
<template>
  <div class="appeal-list-page">
    <searchForm :formOptions="formOptions" @onSearch="onSearch"> </searchForm>
    <div class="main">
      <div class="listBox">
        <div class="tableBox">
          <el-table :data="tableList" tooltip-effect="dark" style="width: 100%">
            <el-table-column prop="id" label="ID" min-width="150"></el-table-column>
            <el-table-column prop="userName" label="用户名" min-width="140"></el-table-column>
            <el-table-column prop="nickName" label="昵称" min-width="140"></el-table-column>
            <el-table-column prop="mobile" label="手机号" min-width="140"></el-table-column>
            <el-table-column prop="createTime" label="创建时间" min-width="160"></el-table-column>
            <el-table-column prop="upadteTime" label="修改时间" min-width="160"></el-table-column>
            <el-table-column
              prop="banStatus"
              label="是否封禁"
              :formatter="banFormatter"
              min-width="100"
            ></el-table-column>

            <el-table-column label="操作" fixed="right" min-width="160">
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  size="mini"
                  icon="el-icon-remove-outline"
                  @click="onBanned(scope.row, scope.$index)"
                  >{{ scope.row.banStatus | filterBtnTxt }}</el-button
                >
                <el-button type="danger" size="mini" icon="el-icon-delete" @click="onRemove(scope.row, scope.$index)"
                  >删除</el-button
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
    </div>
  </div>
</template>

<script>
import searchForm from '@/components/searchForm'
import pagination from '@/components/pagination'
import { getUserList, removeUser, updateBanned } from '@/api/user'
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
  filters: {
    filterBtnTxt(val) {
      return val ? '解除封禁' : '封禁'
    }
  },
  created() {
    this.getData()
  },
  mounted() {},
  methods: {
    banFormatter(row) {
      return row.banStatus ? '是' : '否'
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
    // 封禁用户
    onBanned(row, idx) {
      console.log('-封禁-', row, idx)
      let msg = row.banStatus ? '确认解除封禁！' : '确认封禁！'
      this.confirmFunc(msg, () => {
        let banStatus = row.banStatus ? 0 : 1
        const params = { banStatus, tbId: row.tbId }
        // console.log('-params-', params)
        updateBanned(params).then(res => {
          console.log(res)
          this.msgFunc('操作成功！')
          this.getData()
        })
      })
    },
    // 删除用户
    onRemove(row, idx) {
      console.log('-删除-', row, idx)
      this.confirmFunc('确认删除！', () => {
        const params = { tbId: row.tbId }
        // console.log('-params-', params)
        removeUser(params).then(res => {
          this.msgFunc('删除成功！')
          this.getData()
        })
      })
    },
    getData() {
      const params = { pageNum: this.pagination.currentPage, pageSize: this.pagination.pageSize, ...this.searchData }
      getUserList(params).then(res => {
        const data = res.data
        this.tableList = data.list
        this.pagination.total = data.count
        // console.log('-table-list-', this.tableList)
      })
    },
    confirmFunc(msg, callback) {
      this.$confirm(msg, '提示', {
        type: 'warning',
        center: true
      })
        .then(() => {
          callback()
        })
        .catch(() => {})
    },
    msgFunc(message, type = 'success') {
      this.$message({
        message,
        type
      })
    }
  },
  components: { searchForm, pagination }
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
</style>
