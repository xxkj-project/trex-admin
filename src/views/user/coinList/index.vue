<!--
 * @Author: wangshengxian
 * @Date: 2020-11-30 15:38:46
 * @LastEditors: wangshengxian
 * @LastEditTime: 2021-01-15 20:28:50
 * @Desc: 币种列表 - page
-->
<template>
  <div class="coin-list-page">
    <div class="main">
      <div class="listBox">
        <div class="tableBox">
          <el-table :data="tableList" tooltip-effect="dark" style="width: 100%">
            <el-table-column prop="coin" label="币种类型" min-width="100"></el-table-column>
            <el-table-column label="币种图片" min-width="100">
              <template slot-scope="scope">
                <img :src="scope.row.img" alt="" class="img" />
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCoinList } from '@/api/user'
import { imgHeadUrl } from '@/utils/globalConst'
export default {
  name: '',
  data() {
    return {
      tableList: []
    }
  },
  computed: {},
  created() {
    this.getData()
  },
  mounted() {},
  methods: {
    getData() {
      getCoinList().then(res => {
        // console.log('-res-', res)
        const list = res.data
        this.tableList = list.map(val => {
          val.img = `${imgHeadUrl}/${val.img}`
          return val
        })
        // console.log('-list-', this.tableList)
      })
    }
  },
  components: {}
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类

.listBox {
  .img {
    display: flex;
    width: 80px;
    height: 80px;
  }
}
</style>
