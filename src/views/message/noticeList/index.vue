<!--
 * @Author: wangshengxian
 * @Date: 2020-11-30 15:38:46
 * @LastEditors: wangshengxian
 * @LastEditTime: 2021-01-10 20:54:54
 * @Desc: 平台公告列表 - page
-->
<template>
  <div class="feedback-list-page">
    <el-button type="primary" size="small" icon="el-icon-plus" @click="onAdd">新增公告</el-button>

    <div class="main">
      <div class="listBox">
        <div class="tableBox">
          <el-table :data="tableList" tooltip-effect="dark" style="width: 100%">
            <el-table-column prop="id" label="ID" min-width="100"></el-table-column>
            <el-table-column prop="title" label="标题" min-width="140"></el-table-column>
            <el-table-column prop="details" label="详细信息" min-width="140"></el-table-column>
            <el-table-column
              prop="times"
              label="公告状态"
              :formatter="statusFormatter"
              min-width="140"
            ></el-table-column>
            <el-table-column
              prop="dataStatus"
              label="是否有效"
              :formatter="validFormatter"
              min-width="140"
            ></el-table-column>
            <el-table-column prop="createTime" label="创建时间" min-width="160"></el-table-column>
            <el-table-column prop="updateTime" label="修改时间" min-width="160"></el-table-column>

            <el-table-column label="操作" min-width="90">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" icon="el-icon-edit" @click="onEdit(scope.row, scope.$index)"
                  >编辑</el-button
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

    <addEdit :type="dialogType" :formData="formData" :visible.sync="isAddEdit" @success="handleAddEdit" />
  </div>
</template>

<script>
import pagination from '@/components/pagination'
import addEdit from '@/views/message/components/notice/handleAddEdit'
import { getNoticeList } from '@/api/message'
export default {
  name: '',
  data() {
    return {
      isAddEdit: false,
      dialogType: 'add',
      formData: {},
      pagination: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      tableList: []
    }
  },
  computed: {},
  created() {
    this.getData()
  },
  mounted() {},
  methods: {
    statusFormatter(row) {
      return row.times ? '弹出' : '不弹出'
    },
    validFormatter(row) {
      return row.dataStatus ? '是' : '否'
    },
    getInitData(pageNum = 1, pageSize = 10) {
      this.pagination.currentPage = pageNum
      this.pagination.pageSize = pageSize
      this.getData()
    },
    currentChange(pageNum) {
      this.getInitData(pageNum, this.pagination.pageSize)
    },
    sizeChange(pageSize) {
      this.getInitData(1, pageSize)
    },
    // 新增
    onAdd() {
      this.dislogType = 'add'
      this.isAddEdit = true
      this.formData = { title: '', details: '', times: false }
    },
    // 编辑
    onEdit(row, idx) {
      console.log('-编辑-', row, idx)
      const { title, details, times, id, dataStatus } = row
      this.dialogType = 'edit'
      this.isAddEdit = true
      this.formData = { title, details, times, id, dataStatus }
    },
    handleAddEdit() {
      this.dialogType === 'add' ? this.getInitData() : this.getData()
    },

    getData() {
      const params = { pageNum: this.pagination.currentPage, pageSize: this.pagination.pageSize }
      console.log('-params-', params)
      getNoticeList(params).then(res => {
        // console.log('-res-', res)
        let { count, list } = res.data
        // list = [
        //   {
        //     adminId: '10000',
        //     createdAt: '2021-01-03 08:00:00',
        //     id: 1,
        //     orderId: 20202002,
        //     reason: '备注',
        //     status: 'Pending',
        //     updatedAt: '2021-01-03 16:00:00',
        //     userId: 10009,
        //     userName: '用户名'
        //   }
        // ]
        this.pagination.total = count
        this.tableList = list
        console.log('-table-list-', this.tableList)
      })
    }
  },
  components: { pagination, addEdit }
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
</style>
