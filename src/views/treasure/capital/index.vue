<!--
 * @Author: wangshengxian
 * @Date: 2021-02-03 20:30:50
 * @LastEditors: wangshengxian
 * @LastEditTime: 2021-02-03 20:31:26
 * @Desc: 显示系统内沉淀的资金
-->
<template>
  <div class="capital-list-page">
    <div class="tableBox">
      <el-table :data="tableList" tooltip-effect="dark" style="width: 100%">
        <el-table-column prop="coin" label="币种" min-width="100"></el-table-column>
        <el-table-column prop="sum" label="沉淀资金" min-width="160"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getSystemCoin } from '@/api/user'
export default {
  components: {},
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
      getSystemCoin().then(res => {
        this.tableList = res.data
      })
    }
  }
}
</script>

<style lang="less" scoped>
//@import url(); 引入公共css类
</style>
