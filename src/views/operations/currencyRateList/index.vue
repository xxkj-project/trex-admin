<!--
 * @Author: wangshengxian
 * @Date: 2020-11-30 15:38:46
 * @LastEditors: wangshengxian
 * @LastEditTime: 2021-01-07 16:41:09
 * @Desc: 提现费率列表 - page
-->
<template>
  <div class="withdraw-list-page">
    <searchForm :formOptions="formOptions" @onSearch="onSearch"> </searchForm>
    <div class="main">
      <div class="listBox">
        <div class="tableBox">
          <el-table :data="tableList" tooltip-effect="dark" style="width: 100%">
            <el-table-column prop="id" label="ID" min-width="100"></el-table-column>
            <el-table-column prop="coin" label="交易币种" min-width="120"></el-table-column>
            <el-table-column prop="quoteUnit" label="报价币种" min-width="120"></el-table-column>
            <el-table-column prop="rate" label="费率" min-width="120"></el-table-column>
            <el-table-column prop="priceMin" label="最小数量" min-width="120"></el-table-column>
            <el-table-column prop="priceMax" label="最大数量" min-width="120"></el-table-column>
            <el-table-column
              prop="status"
              label="是否开启"
              :formatter="statusFormatter"
              min-width="120"
            ></el-table-column>

            <el-table-column prop="createdAt" label="创建时间" min-width="160"></el-table-column>
            <el-table-column prop="updatedAt" label="修改时间" min-width="160"></el-table-column>

            <!-- <el-table-column label="操作" min-width="160">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="onEdit(scope.row, scope.$index)">编辑</el-button>
              </template>
            </el-table-column> -->
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import searchForm from '@/components/searchForm'
import { getCurrencyRateList } from '@/api/operations'
import coinMixins from '@/mixins/getCoinList'
export default {
  name: '',
  mixins: [coinMixins],
  data() {
    return {
      searchData: { coin: '' },
      tableList: []
    }
  },
  computed: {
    formOptions() {
      let options = [
        {
          element: 'el-select',
          label: '币种',
          prop: 'coin',
          options: this.coinList,
          initValue: '',
          placeholder: '全部'
        }
      ]
      return options
    }
  },
  created() {
    this.getData()
  },
  mounted() {},
  methods: {
    statusFormatter(row) {
      return row.dataStatus ? '是' : '否'
    },

    onSearch(data) {
      console.log('-search-', data)
      const { coin } = data
      this.searchData.coin = coin ? this.coinList[coin].label : ''
      this.getData()
    },

    getData() {
      getCurrencyRateList(this.searchData).then(res => {
        console.log('-res-', res)
        const data = res.data
        this.tableList = data
        console.log('-list-', this.tableList)
      })
    }
  },
  components: { searchForm }
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
