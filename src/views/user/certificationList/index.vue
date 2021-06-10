<!--
 * @Author: wangshengxian
 * @Date: 2020-11-30 15:38:46
 * @LastEditors: wangshengxian
 * @LastEditTime: 2021-01-16 17:12:01
 * @Desc: 实名认证列表 - page
-->
<template>
  <div class="coin-list-page">
    <searchForm :formOptions="formOptions" @onSearch="onSearch"> </searchForm>
    <div class="main">
      <div class="listBox">
        <div class="tableBox">
          <el-table :data="tableList" tooltip-effect="dark" style="width: 100%">
            <el-table-column prop="userId" label="用户ID" min-width="150"></el-table-column>

            <el-table-column prop="userName" label="用户名" min-width="140"></el-table-column>

            <el-table-column prop="cardName" label="身份证姓名" min-width="100"></el-table-column>

            <el-table-column prop="cardNo" label="身份证号" min-width="140"></el-table-column>

            <el-table-column label="证件照" min-width="100">
              <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-view" size="mini" @click="onCheck(scope.row, scope.$index)"
                  >查看</el-button
                >
              </template>
            </el-table-column>

            <el-table-column
              prop="reason"
              label="审核文本"
              :formatter="reasonFormatter"
              min-width="140"
            ></el-table-column>

            <el-table-column
              prop="checkStatus"
              label="审核状态"
              :formatter="checkFormatter"
              min-width="100"
            ></el-table-column>

            <el-table-column prop="createdAt" label="创建时间" min-width="160"></el-table-column>

            <el-table-column prop="updatedAt" label="修改时间" min-width="160"></el-table-column>

            <el-table-column label="操作" min-width="180" fixed="right">
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  size="mini"
                  icon="el-icon-check"
                  :disabled="scope.row.checkStatus != 0"
                  @click="onPass(scope.row, scope.$index)"
                  >通过</el-button
                >
                <el-button
                  type="danger"
                  size="mini"
                  icon="el-icon-close"
                  :disabled="scope.row.checkStatus != 0"
                  @click="onNoPass(scope.row, scope.$index)"
                  >不通过</el-button
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

      <imgCheck title="查看证件照" width="800px" :imgList="imgList" :visible.sync="isImgCheck" />
    </div>
  </div>
</template>

<script>
import searchForm from '@/components/searchForm'
import pagination from '@/components/pagination'
import imgCheck from '@/views/user/components/certification/handleImgCheck'
import { getAuthList, updateAuth } from '@/api/user'
import { getCheckStatus } from '@/filters/transform'
import { imgHeadUrl } from '@/utils/globalConst'
export default {
  name: '',
  data() {
    return {
      isImgCheck: false,
      imgList: [],
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
          element: 'el-select',
          label: '审核状态',
          prop: 'checkStatus',
          options: getCheckStatus(),
          initValue: '',
          placeholder: '全部'
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
  created() {
    this.getData()
  },
  mounted() {},
  methods: {
    reasonFormatter(row) {
      // console.log(row)
      return row.reason || '/'
    },
    checkFormatter(row) {
      return getCheckStatus(row.checkStatus)
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
    onCheck(row, index) {
      console.log('-查看-', row, index)
      this.isImgCheck = true
      this.imgList = [row.idcardFront, row.idcardBack, row.handCard]
      console.log('-img-list-', this.imgList)
    },
    onPass(row, idx) {
      console.log('-通过-', row, idx)
      this.$confirm('确认通过！', '提示', {
        type: 'warning',
        center: true
      })
        .then(() => {
          const { id } = row
          const params = {
            id,
            reason: '',
            checkStatus: 1
          }
          console.log('-params-', params)
          this.operateAudit(params)
        })
        .catch(() => {})
    },
    onNoPass(row, idx) {
      console.log('-不通过-', row, idx)
      this.$prompt('', '审核不通过', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputType: 'textarea',
        inputPlaceholder: '不通过原因，最多100字',
        inputValidator: val => {
          return !!val
        },
        inputErrorMessage: '不通过原因不能为空'
      })
        .then(({ value }) => {
          const { id } = row
          const params = {
            id,
            reason: value,
            checkStatus: 2
          }
          console.log('-params-', params)
          this.operateAudit(params)
        })
        .catch(() => {})
    },
    operateAudit(params) {
      console.log(params)
      updateAuth(params).then(res => {
        console.log('-res-', res)
        this.$message({
          message: '操作通过',
          type: 'success'
        })
        this.getData()
      })
    },

    getData() {
      const params = { pageNum: this.pagination.currentPage, pageSize: this.pagination.pageSize, ...this.searchData }
      // console.log('-params-', params)
      getAuthList(params).then(res => {
        const { count, list } = res.data
        this.pagination.total = count
        this.tableList = this.setData(list)
        // console.log('-table-list-', this.tableList)
      })
    },
    setData(list) {
      let result = list.map(val => {
        let mid = { ...val }
        mid.idcardFront = `${imgHeadUrl}/${mid.idcardFront}`
        mid.idcardBack = `${imgHeadUrl}/${mid.idcardBack}`
        mid.handCard = `${imgHeadUrl}/${mid.handCard}`
        return mid
      })
      return result
    }
  },
  components: { searchForm, pagination, imgCheck }
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
</style>
