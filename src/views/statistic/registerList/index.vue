<!--
 * @Author: wangshengxian
 * @Date: 2021-01-08 10:26:51
 * @LastEditors: wangshengxian
 * @LastEditTime: 2021-02-04 10:16:14
 * @Desc: 注册用户信息 - page
-->
<template>
  <div class="online-user-page">
    <cardBox :list="infoList" />
  </div>
</template>

<script>
import cardBox from '@/components/cardBox/index'
import { getRegists } from '@/api/user'
export default {
  name: '',
  data() {
    return {
      infoList: []
    }
  },
  computed: {},
  components: { cardBox },
  created() {
    this.getData()
  },
  mounted() {},
  methods: {
    getData() {
      getRegists().then(res => {
        const { data } = res
        this.infoList.push({ txt: '用户注册量', number: data, bgColor: 'blue' })
      })
    }
  }
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
</style>
