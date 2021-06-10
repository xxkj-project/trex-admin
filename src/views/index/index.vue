<!--
  首页
-->
<template>
  <div class="main-index">
    <div class="dataCard">
      <h4 class="welcome">欢迎，</h4>
      <cardBox :list="infoList" />
    </div>
  </div>
</template>

<script>
import cardBox from '@/components/cardBox'
import { getCurrentNumber, getRegists } from '@/api/user'
export default {
  props: {},

  data() {
    return {
      infoList: []
    }
  },

  computed: {},

  created() {
    this.getData()
  },

  mounted() {},

  methods: {
    async getData() {
      try {
        const currentData = await getCurrentNumber()
        const regData = await getRegists()
        this.infoList.push({ txt: '用户在线量', number: currentData.data })
        this.infoList.push({ txt: '用户注册量', number: regData.data, bgColor: 'green' })
      } catch (err) {
        console.log(err)
      }
    }
  },

  components: { cardBox }
}
</script>

<style lang="less" scoped>
@import '~@/assets/styles/variables';

.main-index {
  display: flex;
  flex-direction: column;

  .dataCard {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 50px;

    .welcome {
      font-size: 32px;
    }
  }
}
</style>
