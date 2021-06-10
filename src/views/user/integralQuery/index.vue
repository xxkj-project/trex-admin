<!--
 * @Author: wangshengxian
 * @Date: 2021-02-03 20:30:57
 * @LastEditors: wangshengxian
 * @LastEditTime: 2021-02-03 20:31:35
 * @Desc: 修改积分
-->
<template>
  <div class="integral-list-page">
    <searchForm :formOptions="formOptions" @onSearch="handleSearch" />

    <div class="main">
      <div class="listWrap">
        <div class="tableBox">
          <el-table :data="tableList" tooltip-effect="dark" style="width: 100%">
            <el-table-column prop="userId" label="用户ID" min-width="140"></el-table-column>
            <el-table-column prop="nickName" label="昵称" min-width="120"></el-table-column>
            <el-table-column prop="integral" label="积分" min-width="100"></el-table-column>
            <el-table-column label="操作" min-width="180" fixed="right">
              <template slot-scope="scope">
                <el-button slot="button" type="primary" size="mini" icon="el-icon-plus" @click="onAdd(scope.row)"
                  >添加积分</el-button
                >
                <el-button slot="button" type="primary" size="mini" icon="el-icon-minus" @click="onSub(scope.row)"
                  >减少积分</el-button
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

    <operateIntegral
      :type="dialogType"
      :formData="formData"
      :visible.sync="isOperateIntegral"
      @success="handleIntegralSuccess"
    />
  </div>
</template>
<script>
import searchForm from '@/components/searchForm'
import pagination from '@/components/pagination'
import operateIntegral from '@/views/user/components/integral/handleOperateIntegral'
import { getUserIntegral } from '@/api/user'
export default {
  components: { searchForm, pagination, operateIntegral },
  data() {
    return {
      searchData: {
        user: ''
      },
      pagination: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      tableList: [],
      dialogType: 'add',
      isOperateIntegral: false,
      formData: {}
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
      this.searchData = data
      this.getInitData()
    },
    currentChange(pageNum) {
      this.getInitData(pageNum, this.pagination.pageSize)
    },
    sizeChange(pageSize) {
      this.getInitData(1, pageSize)
    },
    onAdd(row) {
      this.formData = { integral: '', userId: row.userId }
      this.dialogType = 'add'
      this.isOperateIntegral = true
    },
    onSub(row) {
      this.formData = { integral: '', userId: row.userId }
      this.dialogType = 'sub'
      this.isOperateIntegral = true
    },
    handleIntegralSuccess() {
      this.getData()
    },
    getData() {
      const params = {
        pageNum: this.pagination.currentPage,
        pageSize: this.pagination.pageSize,
        ...this.searchData
      }
      getUserIntegral(params).then(res => {
        console.log(res)
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
