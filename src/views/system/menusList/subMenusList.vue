<!--
 菜单列表
-->
<template>
  <div class="menus-list-page">
    <el-button type="primary" icon="el-icon-plus" @click="onAddMenu">新增二级菜单</el-button>
    <div class="main">
      <div class="listBox">
        <div class="tableBox">
          <el-table :data="tableList" tooltip-effect="dark" style="width: 100%">
            <el-table-column prop="id" label="菜单ID" min-width="140"></el-table-column>
            <el-table-column prop="menuName" label="菜单名" min-width="140"></el-table-column>
            <el-table-column prop="perms" label="菜单标识" min-width="140"></el-table-column>
            <el-table-column prop="parentMenuName" label="父级菜单名" min-width="140"></el-table-column>

            <el-table-column label="操作" min-width="160">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" icon="el-icon-edit" @click="onEdit(scope.row)">编辑</el-button>
                <el-button type="danger" size="mini" icon="el-icon-delete" @click="onDel(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <addEdit :type="dialogType" :formData="formData" :visible.sync="isAddEdit" @success="handleSuccess"></addEdit>
  </div>
</template>

<script>
import addEdit from '@/views/system/components/menusList/handleAddEdit'
import { getMenusList, deleteMenu } from '@/api/system'
export default {
  components: {
    addEdit
  },
  data() {
    return {
      parentId: '',
      parentMenuName: '',
      dialogType: 'add',
      isAddEdit: false,
      formData: {},
      tableList: []
    }
  },
  computed: {},
  created() {
    const { parentId, parentMenuName } = this.$route.query
    if (parentId) {
      this.parentId = parentId
      this.parentMenuName = parentMenuName
      this.getData()
    }
  },
  mounted() {},
  methods: {
    onAddMenu() {
      this.dialogType = 'add'
      this.isAddEdit = true
      this.formData = { parentId: this.parentId, menuName: '', perms: '' }
    },
    onDel(row) {
      console.log('-del-', row)
      this.$confirm('确认删除该二级菜单？', '提示', {
        type: 'warning',
        center: true
      })
        .then(() => {
          const params = { id: row.id }
          console.log('-params-', params)
          deleteMenu(params).then(res => {
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
    onEdit(row) {
      // console.log('-编辑-', row, index)
      const { parentMenuName, ...otherObj } = row
      this.dialogType = 'edit'
      this.isAddEdit = true
      this.formData = otherObj
    },
    handleSuccess() {
      this.getData()
    },
    getData() {
      const params = { parentId: this.parentId }
      console.log('-parmas-', params)
      getMenusList(params).then(res => {
        console.log('-res-', res)
        const list = res.data
        if (!list || list.length === 0) return
        this.tableList = list.map(val => ({ parentMenuName: this.parentMenuName, ...val }))
      })
    }
  }
}
</script>

<style lang="less" scoped></style>
