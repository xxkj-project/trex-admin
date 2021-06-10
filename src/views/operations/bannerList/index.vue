<!--
 * @Author: wangshengxian
 * @Date: 2020-11-30 15:38:46
 * @LastEditors: wangshengxian
 * @LastEditTime: 2021-01-07 18:35:52
 * @Desc: banner列表 - page
-->
<template>
  <div class="banner-list-page">
    <div class="headWrap">
      <el-button type="primary" size="small" icon="el-icon-plus" @click="onAdd">新增banner</el-button>
    </div>
    <div class="main">
      <div class="listBox">
        <div class="tableBox">
          <el-table :data="tableList" tooltip-effect="dark" style="width: 100%">
            <el-table-column prop="id" label="ID" min-width="100"></el-table-column>
            <el-table-column label="图片" min-width="100">
              <template slot-scope="scope">
                <img class="img" :src="scope.row.img" alt="" />
              </template>
            </el-table-column>
            <el-table-column prop="sort" label="排序" min-width="140"></el-table-column>
            <el-table-column
              prop="dataStatus"
              label="是否有效"
              :formatter="statusFormatter"
              min-width="120"
            ></el-table-column>
            <el-table-column prop="url" label="跳转url" min-width="140"></el-table-column>
            <el-table-column prop="createTime" label="创建时间" min-width="160"></el-table-column>
            <el-table-column prop="updateTime" label="修改时间" min-width="160"></el-table-column>
            <el-table-column
              prop="expirate"
              label="过期时间"
              :formatter="expFormatter"
              min-width="160"
            ></el-table-column>

            <el-table-column label="操作" min-width="90">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" icon="el-icon-edit" @click="onEdit(scope.row, scope.$index)"
                  >编辑</el-button
                >
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
import addEdit from '@/views/operations/components/banner/handleAddEdit'
import { getBannerList } from '@/api/operations'
import { imgHeadUrl } from '@/utils/globalConst'
export default {
  name: '',
  data() {
    return {
      dialogType: 'add',
      isAddEdit: false,
      formData: {
        expirate: '',
        url: '',
        sort: '',
        img: []
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
      return row.dataStatus ? '是' : '否'
    },
    expFormatter(row) {
      return row.expirate || '永久有效'
    },
    onAdd() {
      this.dialogType = 'add'
      this.isAddEdit = true
      this.formData = {
        expirate: '',
        img: [],
        sort: '',
        url: ''
      }
      console.log('-form-data-', this.formData)
    },
    onEdit(row, index) {
      console.log('-row-', row, index)
      this.dialogType = 'edit'
      this.isAddEdit = true
      this.formData = { ...row }
      this.formData.img = row.img ? [row.img] : []
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
      getBannerList().then(res => {
        console.log('-res-', res)
        const data = res.data
        this.tableList = data.map(val => {
          let mid = { ...val }
          mid.img = `${imgHeadUrl}/${mid.img}`
          return mid
        })
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
