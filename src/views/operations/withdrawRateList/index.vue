<!--
 * @Author: wangshengxian
 * @Date: 2020-11-30 15:38:46
 * @LastEditors: wangshengxian
 * @LastEditTime: 2021-01-07 16:25:43
 * @Desc: 提现费率列表 - page
-->
<template>
  <div class="withdraw-list-page">
    <div class="headWrap">
      <el-button type="primary" size="small" icon="el-icon-plus" @click="onAdd">新增提现费率</el-button>
    </div>
    <div class="main">
      <div class="listBox">
        <div class="tableBox">
          <el-table :data="tableList" tooltip-effect="dark" style="width: 100%">
            <el-table-column prop="id" label="ID" min-width="100"></el-table-column>
            <el-table-column prop="fee" label="费率" min-width="140"></el-table-column>
            <el-table-column prop="level" label="vip等级" min-width="140"></el-table-column>
            <el-table-column prop="useTo" label="用处" min-width="140"></el-table-column>
            <el-table-column
              prop="dataStatus"
              label="是否有效"
              :formatter="statusFormatter"
              min-width="120"
            ></el-table-column>

            <el-table-column label="操作" min-width="90">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" icon="el-icon-edit" @click="onEdit(scope.row, scope.$index)"
                  >编辑</el-button
                >
                <!-- <el-button type="danger" size="mini" icon="el-icon-delete" @click="onDel(scope.row, scope.$index)">删除</el-button> -->
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>

    <addEdit :type="dialogType" :visible.sync="isAddEdit" :formData="formData" @success="handleSuccess" />
  </div>
</template>

<script>
import addEdit from '@/views/operations/components/withdrawRate/handleAddEdit'
import { getWithdrawRateList } from '@/api/operations'
export default {
  name: '',
  data() {
    return {
      dialogType: 'add',
      isAddEdit: false,
      formData: {},
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
      return row.dataStatus ? '是' : '否'
    },
    onAdd() {
      this.dialogType = 'add'
      this.isAddEdit = true
      this.formData = {
        fee: '',
        level: '',
        useTo: ''
      }
    },
    onEdit(row, index) {
      console.log('-row-', row, index)
      this.dialogType = 'edit'
      this.isAddEdit = true
      this.formData = { ...row }
    },
    onDel(row, index) {
      console.log('-row-', row, index)
      this.$confirm('是否删除该banner', '提示', {
        center: true,
        type: 'warning'
      })
        .then(() => {
          const params = { id: row.id }
          console.log('-params-', params)
          // delPayAccount(params).then(res => {
          //   console.log('-res-', res)
          //   this.$message({
          //     message: '删除成功!',
          //     type: 'success'
          //   })
          //   this.tableList.splice(index, 1)
          // })
        })
        .catch(() => {})
    },
    handleSuccess() {
      this.getData()
    },
    getData() {
      getWithdrawRateList().then(res => {
        console.log('-res-', res)
        const data = res.data
        this.tableList = data
        console.log('-list-', this.tableList)
      })
    }
  },
  components: { addEdit }
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
.listBox {
  .img {
    display: block;
    width: 80px;
    height: 80px;
  }
}
</style>
