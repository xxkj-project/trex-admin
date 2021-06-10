<!--
 角色列表
-->
<template>
  <div class="roles-list-page">
    <el-button type="primary" icon="el-icon-plus" @click="onAdd">新增角色</el-button>
    <div class="main">
      <div class="listBox">
        <div class="tableBox">
          <el-table :data="tableList" tooltip-effect="dark" style="width: 100%">
            <el-table-column prop="id" label="用户ID" min-width="150"></el-table-column>
            <el-table-column prop="roleName" label="角色名" min-width="140"></el-table-column>
            <el-table-column prop="remark" label="角色说明" min-width="140"></el-table-column>

            <el-table-column label="操作" min-width="160">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" icon="el-icon-edit" @click="onEdit(scope.row, scope.$index)"
                  >编辑</el-button
                >
                <el-button type="danger" size="mini" icon="el-icon-delete" @click="onDel(scope.row, scope.$index)"
                  >删除</el-button
                >
                <el-button type="primary" size="mini" icon="el-icon-setting" @click="onAuth(scope.row)"
                  >设置权限</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <addEdit
      :type="dialogType"
      :formData="formData"
      :visible.sync="isAddEdit"
      @success="handleSuccess"
      @changeValue="changeValue"
    ></addEdit>
  </div>
</template>

<script>
import addEdit from '@/views/system/components/rolesList/handleAddEdit'
import { getRolesList, deleteRole } from '@/api/system'
export default {
  components: {
    addEdit
  },
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
    onAdd() {
      this.dialogType = 'add'
      this.isAddEdit = true
      this.formData = { roleName: '', remark: '' }
    },
    onDel(row, idx) {
      console.log('-del-', row, idx)
      this.$confirm('确认删除该角色？', '提示', {
        type: 'warning',
        center: true
      })
        .then(() => {
          const params = { id: row.id }
          deleteRole(params).then(res => {
            console.log('-res-', res)
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.getData()
          })
        })
        .catch(() => {})
    },
    // 编辑
    onEdit(row, idx) {
      console.log('-编辑-', row, idx)
      const { id, roleName, remark } = row
      this.dialogType = 'edit'
      this.isAddEdit = true
      this.formData = { id, roleName, remark }
    },
    onAuth(row) {
      console.log('-row-', row)
      const { id, roleName, menuIds } = row
      this.$router.push({ name: 'RoleMenu', query: { id, roleName, menuIds: menuIds.join(',') } })
    },
    handleSuccess() {
      this.getData()
    },
    changeValue(childValue) {
      childValue.remark = ''
      childValue.roleName = ''
    },
    getData() {
      getRolesList().then(res => {
        const list = res.data
        if (!list || list.length === 0) return
        this.tableList = list
        console.log('-list-', this.tableList)
      })
    }
  }
}
</script>

<style lang="less" scoped></style>
