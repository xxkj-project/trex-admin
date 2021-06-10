<!--
 * @Author: wangshengxian
 * @Date: 2020-10-29 17:36:34
 * @LastEditors: wangshengxian
 * @LastEditTime: 2021-01-16 17:16:10
 * @Desc: 商品管理列表
-->
<template>
  <div class="goodsList">
    <searchForm :formOptions="formOptions" @onSearch="onSearch"> </searchForm>

    <div class="main">
      <div class="listBox">
        <div class="tableBox">
          <el-table :data="tableList" tooltip-effect="dark" style="width: 100%">
            <el-table-column prop="userId" label="用户ID" min-width="150"></el-table-column>
            <el-table-column prop="userName" label="用户名" min-width="140"></el-table-column>
            <el-table-column prop="coin" label="币种" min-width="80"></el-table-column>
            <el-table-column prop="type" label="类型" min-width="80"></el-table-column>
            <el-table-column prop="balanceAvailable" label="可用余额" min-width="120"></el-table-column>
            <el-table-column prop="balanceLocked" label="冻结资产" min-width="80"></el-table-column>
            <el-table-column
              prop="isVisible"
              label="是否可见"
              :formatter="visFormatter"
              min-width="80"
            ></el-table-column>
            <el-table-column prop="createdAt" label="创建时间" min-width="160"></el-table-column>
            <el-table-column prop="updatedAt" label="修改时间" min-width="160"></el-table-column>
            <el-table-column label="操作" min-width="100">
              <template slot-scope="scope">
                <el-button
                  slot="button"
                  type="primary"
                  size="mini"
                  icon="el-icon-plus"
                  :disabled="['UBNK', 'XIF'].includes(scope.row.coin)"
                  @click="onAdd(scope.row, scope.$index)"
                  v-show="isShowBtn"
                  >加币</el-button
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

    <addCoin :coinList="coinList" :formData="formData" :visible.sync="isAddCoin" @success="handleAddCoinSuccess" />
  </div>
</template>

<script>
import searchForm from '@/components/searchForm'
import pagination from '@/components/pagination'
import addCoin from '@/views/user/components/assetsList/handleAddCoin'
import { getUserAssetsList } from '@/api/user'
import coinMixins from '@/mixins/getCoinList'
export default {
  name: '',
  mixins: [coinMixins],
  data() {
    return {
      isAddCoin: false,
      formData: {},
      searchData: {
        user: '',
        coin: ''
      },
      pagination: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      tableList: [],
      isShowBtn: false
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
          label: '币种',
          prop: 'coin',
          options: this.coinList,
          initValue: '',
          placeholder: '全部'
        }
      ]
      return result
    }
  },
  watch: {
    coinList(val) {
      // console.log('-watch-', val)
      this.isShowBtn = true
    }
  },
  filters: {},
  created() {
    this.getData()
  },
  mounted() {},
  methods: {
    visFormatter(row) {
      return row.isVisible ? '是' : '否'
    },
    statusFormatter(row) {
      return row.dataStatus ? '是' : '否'
    },
    getInitData(pageNum = 1, pageSize = 10) {
      this.pagination.currentPage = pageNum
      this.pagination.pageSize = pageSize
      this.getData()
    },
    onAdd(row, index) {
      console.log('-add-', row, index)
      this.isAddCoin = true
      let currObj = this.coinList.filter(val => val.label === row.coin)[0]
      this.formData = { userId: row.userId, coin: currObj.value, type: row.type, amount: '' }
    },
    handleAddCoinSuccess() {
      this.getData()
    },
    onSearch(data) {
      console.log('-search-', data)
      const { coin, ...otherObj } = data
      this.searchData = { ...otherObj }
      this.searchData.coin = coin ? this.coinList[coin].label : ''
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
      getUserAssetsList(params).then(res => {
        const data = res.data
        this.tableList = data.list
        this.pagination.total = data.count
        // console.log('-list-', this.tableList)
      })
    }
  },
  components: { searchForm, pagination, addCoin }
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
