<!--
 * @Author: wangshengxian
 * @Date: 2021-02-03 20:33:10
 * @LastEditors: wangshengxian
 * @LastEditTime: 2021-02-03 20:33:10
 * @Desc: 权限管理
-->
<template>
  <div class="authority-list-page">
    <searchForm :formOptions="formOptions" @onSearch="onSearch"> </searchForm>

    <div class="boX">
      <div class="checkbox" v-for="(v, i) in modules" :key="i" style="margin: 15px 0">
        <el-checkbox :indeterminate="v.isIndeterminate" v-model="v.checkAll" @change="handleCheckAllChange(i)">{{
          v.label
        }}</el-checkbox>
        <div style="margin: 5px 0;"></div>
        <el-checkbox-group v-model="v.checkedAuthority" @change="handleCheckedauthorityChange(i)">
          <el-checkbox v-for="(j, n) in v.children" :label="j.label" :key="n">{{ j.label }}</el-checkbox>
        </el-checkbox-group>
      </div>
    </div>

    <el-button type="primary" size="small" @click="onAdd">新增成员</el-button>
    <div class="main">
      <div class="listBox">
        <div class="tableBox">
          <el-table :data="tableList" tooltip-effect="dark" style="width: 100%">
            <el-table-column prop="id" label="用户ID" min-width="150"></el-table-column>
            <el-table-column prop="userName" label="用户名" min-width="140"></el-table-column>
            <el-table-column prop="duty" label="职务" min-width="140"></el-table-column>
            <el-table-column label="操作" min-width="160">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="onEdit(scope.row, scope.$index)">编辑</el-button>
                <el-button type="primary" size="mini" @click="share(scope.row, scope.$index)">共享</el-button>
                <el-button type="danger" size="mini" @click="onRemove(scope.row, scope.$index)">删除</el-button>
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
    <addEdit :type="dialogType" :formData="formData" :visible.sync="isAddEdit"></addEdit>
  </div>
</template>

<script>
import searchForm from '@/components/searchForm'
import pagination from '@/components/pagination'
import { getAuthorityList, getList } from './authority'
import addEdit from '@/views/system/components/rolesList/handleAddEdit'
export default {
  components: {
    searchForm,
    pagination,
    addEdit
  },
  data() {
    return {
      modules: [],
      Authoritys: [],
      isAddEdit: false,
      dialogType: 'add',
      formData: {},
      searchData: {
        user: '',
        duty: ''
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
          element: 'el-input',
          label: '职务',
          prop: 'duty',
          initValue: '',
          placeholder: '请输入职务名'
        }
      ]
      return result
    }
  },
  created() {
    this.getData()
    this.getModule()
  },
  mounted() {},
  methods: {
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
    onSearch(data) {
      console.log('-search-', data)
      let { user, duty, ...otherObj } = data
      this.searchData = { ...otherObj }
      this.searchData.user = user
      this.searchData.duty = duty
      this.getInitData()
    },
    // 新增
    onAdd() {
      this.dialogType = 'add'
      this.isAddEdit = true
      this.formData = { duty: '', userName: '' }
      console.log('-新增-', this.formData)
    },
    // 编辑
    onEdit(row, idx) {
      console.log('-编辑-', row, idx)
      const { duty, userName } = row
      this.isAddEdit = true
      this.dialogType = 'edit'
      this.formData = { userName, duty }
    },
    // 删除用户
    onRemove(row, idx) {
      console.log('-删除-', row, idx)
    },
    getData() {
      console.log(getAuthorityList())
      const params = { pageNum: this.pagination.currentPage, pageSize: this.pagination.pageSize, ...this.searchData }
      console.log('-params-', params)
      let { total, List } = getAuthorityList(params).authorityList
      this.pagination.total = total
      this.tableList = List
    },
    getModule() {
      let List = getList().List
      let pList = []
      let cList = []
      let attr = {
        checkAll: false,
        isIndeterminate: false,
        checkedAuthority: [],
        children: []
      }
      List.map(val => {
        if (val.PID === '0') {
          pList.push({ ...attr, ...val })
        } else {
          cList.push(val)
        }
      })
      pList.map(pel => (pel.children = cList.filter(mel => mel.PID === pel.id)))
      this.modules = pList
    },
    handleCheckAllChange(i, val) {
      this.checkedAuthority = val ? this.checkedAuthority : []
      this.modules[i].isIndeterminate = false
      if (this.modules[i].checkAll) {
        this.modules[i].checkedAuthority = this.modules[i].children.map(item => item.label)
      } else {
        this.modules[i].checkedAuthority = []
      }
      console.log(this.modules[i].checkAll)
    },
    handleCheckedauthorityChange(i) {
      console.log(i)
      let len = this.modules[i].checkedAuthority.length
      let clen = this.modules[i].children.length
      console.log(this.modules[i].checkedAuthority)
      this.modules[i].checkAll = len === clen
      this.modules[i].isIndeterminate = clen > 0 && clen < len
    }
    // share(row,idx) {
    //   const Authoritys = this.modules.map(val => {
    //     return val.checkedAuthority
    //   })
    //   this.Authoritys = [...Authoritys[0], ...Authoritys[1], ...Authoritys[2]]
    //   console.log(this.Authoritys)
    //   if (this.Authotiys) {
    //     storage.setItem('Authoritys', this.Authoritys)
    //   } else {
    //     alert('您还没有选择共享功能')
    //   }
    // }
  }
}
</script>

<style></style>
