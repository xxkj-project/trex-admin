<!--
 * @Author: wangshengxian
 * @Date: 2021-02-04 09:30:56
 * @LastEditors: wangshengxian
 * @LastEditTime: 2021-02-04 14:55:37
 * @Desc: 登录日志
-->
<template>
  <div class="login-list-page">
    <searchForm :formOptions="formOptions" @onSearch="onSearch"> </searchForm>
    <div class="main">
      <div class="listBox">
        <div class="tableBox">
          <el-table :data="tableList" tooltip-effect="dark" style="width: 100%">
            <el-table-column prop="userId" label="登录ID" min-width="100"></el-table-column>
            <el-table-column prop="nickName" label="登录用户名" min-width="140"></el-table-column>
            <el-table-column prop="headImg" label="头像" min-width="160">
              <template slot-scope="scope">
                <img class="headImg" :src="scope.row.headImg" alt="" />
              </template>
            </el-table-column>
            <el-table-column prop="createTime" label="登录时间" min-width="160"></el-table-column>
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
  </div>
</template>

<script>
import searchForm from '@/components/searchForm'
import pagination from '@/components/pagination'
import { getUserLoginLog } from '@/api/user'
import { imgHeadUrl, defaultImgUrl } from '@/utils/globalConst'
import tools from '@/utils/tools'
export default {
  components: {
    searchForm,
    pagination
  },
  data() {
    return {
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
    getInitData(pageNum = 1, pageSize = 10) {
      this.pagination.currentPage = pageNum
      this.pagination.pageSize = pageSize
      this.getData()
    },
    onSearch(data) {
      // console.log('-search-', data)
      const { times, ...otherObj } = data
      this.searchData = { ...otherObj }
      this.searchData.startDate = times ? tools.formatDate(times[0], '{y}-{m}-{d}') : ''
      this.searchData.endDate = times ? tools.formatDate(times[1], '{y}-{m}-{d}') : ''
      this.getInitData()
    },
    currentChange(pageNum) {
      this.getInitData(pageNum, this.pagination.pageSize)
    },
    sizeChange(pageSize) {
      this.getInitData(1, pageSize)
    },
    getData() {
      const params = { pageNum: this.pagination.currentPage, pageSize: this.pagination.pageSize, ...this.searchData }
      // console.log('-params-', params)
      getUserLoginLog(params).then(res => {
        let { count, list } = res.data
        this.pagination.total = count
        this.tableList = list.map(val => {
          val.headImg = val.headImg ? `${imgHeadUrl}/${val.headImg}` : defaultImgUrl
          return val
        })
        // console.log('-list-', this.tableList)
      })
    }
  }
}
</script>

<style lang="less" scoped>
//@import url(); 引入公共css类
.headImg {
  display: block;
  width: 80px;
  height: 80px;
}
</style>
