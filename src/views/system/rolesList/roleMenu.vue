<!--
   角色菜单
-->
<template>
  <div class="roleMenu">
    <div class="main">
      <el-form :model="formData" ref="formRef" label-width="90px">
        <el-form-item label="角色名:">
          <el-input v-model="queryObj.roleName" disabled></el-input>
        </el-form-item>
        <el-form-item label="权限列表:">
          <ul class="listBox">
            <li class="item" v-for="(item, index) in menusList" :key="index">
              <checkboxGroup v-model="item.checkMenus" :data="item.showMenus" :title="item.menuName" />
            </li>
          </ul>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" icon="el-icon-check" :loading="isLoading" @click="onSave">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import checkboxGroup from '@/views/system/components/rolesList/checkboxGroup'
import { getAuthMenusList, editRoleMenu } from '@/api/system'
export default {
  name: '',
  data() {
    return {
      queryObj: {},
      menusList: [],
      formData: {},
      isLoading: false
    }
  },
  computed: {},
  components: { checkboxGroup },
  created() {
    this.setQuery()
    this.getData()
  },
  mounted() {},
  methods: {
    setQuery() {
      const queryObj = this.$route.query
      queryObj && (this.queryObj = queryObj)
    },
    onSave() {
      let menuIds = []
      this.menusList.map(p => {
        console.log('-p-id-', p.id)
        if (p.checkMenus.length > 0) {
          menuIds.push(p.id)
        }

        p.children.map(c => {
          // console.log(p, p.checkMenus, c.menuName)
          if (p.checkMenus.includes(c.menuName)) {
            menuIds.push(c.id)
          }
        })
      })
      menuIds = menuIds.toString()
      console.log('-menu-ids-', menuIds)
      const params = { menuIds, roleId: this.queryObj.id }
      this.isLoading = true
      editRoleMenu(params)
        .then(res => {
          this.isLoading = false
          this.$message({
            message: '操作成功!',
            type: 'success'
          })
        })
        .catch(() => {
          this.isLoading = false
        })
    },
    getData() {
      getAuthMenusList().then(res => {
        const list = res.data
        if (!list && list.length === 0) return
        // console.log('-list-', list)
        this.menusList = this.setData(list)
        console.log('-menus-list-', this.menusList)
      })
    },
    setData(list) {
      let pList = []
      let cList = []
      let menuIds = this.queryObj.menuIds.split(',').map(Number)

      console.log('-menuIds-', menuIds)

      list.map(val => {
        // console.log('-val-', val)
        if (val.parentId > 0) {
          cList.push(val)
        } else {
          pList.push({ showMenus: [], children: [], checkAll: false, checkMenus: [], ...val })
        }
      })

      pList.map(p => {
        cList.map(c => {
          if (c.parentId === p.id) {
            p.children.push(c)
            p.showMenus.push(c.menuName)
            if (menuIds.includes(c.id)) {
              p.checkMenus.push(c.menuName)
            }
          }
        })
      })
      // console.log('-p-list-', pList)
      return pList
    }
  }
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类

/deep/ .el-input {
  width: 220px;

  &.is-disabled {
    .el-input__inner {
      background: #fff;
    }
  }
}

/deep/ .el-form-item__label {
  font-weight: 600;
}
</style>
