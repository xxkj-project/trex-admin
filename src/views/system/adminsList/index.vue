<!--
 管理员列表
-->
<template>
  <div class="admin-list-page">
    <div class="main">
      <div class="listBox">
        <div class="tableBox">
          <el-table :data="tableList" tooltip-effect="dark" style="width: 100%">
            <el-table-column prop="id" label="管理员ID" min-width="100"></el-table-column>
            <el-table-column prop="userName" label="管理员账号" min-width="140"></el-table-column>
            <el-table-column prop="nickName" label="管理员名称" min-width="140"></el-table-column>
            <el-table-column prop="roleName" label="角色名" min-width="100"></el-table-column>

            <el-table-column label="操作" min-width="160">
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  size="mini"
                  icon="el-icon-edit"
                  :disabled="scope.row.roleName === '超级管理员'"
                  @click="onEdit(scope.row, scope.$index)"
                  >编辑</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>

    <addEdit
      :type="dialogType"
      :visible.sync="isAddEdit"
      :rolesList="rolesList"
      :formData="formData"
      @success="handleRoleSuccess"
    ></addEdit>
  </div>
</template>

<script>
import addEdit from '@/views/system/components/adminsList/handleAddEdit'
import { getAdminsList, getRolesList } from '@/api/system'
export default {
  name: '',

  data() {
    return {
      dialogType: 'add',
      isAddEdit: false,
      formData: {},
      rolesList: [], // 角色列表
      tableList: [] // 管理员列表
    }
  },
  computed: {},
  watch: {},
  components: {
    addEdit
  },
  created() {
    this.getData()
  },
  mounted() {},
  methods: {
    onEdit(row, index) {
      console.log('-编辑-', row, index)
      const roleId = row.roleId || ''
      this.dialogType = 'edit'
      this.isAddEdit = true
      this.formData = { roleId, adminId: row.id }
    },
    handleRoleSuccess() {
      this.getAdminsData()
    },
    async getData() {
      const rolesData = await getRolesList()
      const adminsData = await getAdminsList()
      this.rolesList = rolesData.data.map(val => ({
        value: val.id,
        label: val.roleName,
        ...val
      }))
      this.tableList = this.setAdminsData(adminsData.data)
      console.log('-roles-', this.rolesList)
      console.log('-admins-', this.tableList)
    },
    async getAdminsData() {
      const adminsData = await getAdminsList()
      this.tableList = this.setAdminsData(adminsData.data)
    },
    setAdminsData(list) {
      console.log('-list-', list)
      let result = list.map(val => {
        // console.log('-val-', val)
        val.roleName = this.setRoleName(val.roleId)
        return val
      })
      return result
    },
    setRoleName(roleId) {
      // console.log('-role-list-', this.rolesList)
      let result = this.rolesList.filter(role => role.id === roleId)[0]
      // console.log('-result-', result)
      return result ? result.label : '无'
    }
  }
}
</script>

<style lang="less" scoped>
//@import url(); 引入公共css类
</style>
