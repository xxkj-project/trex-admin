<!--
   带全选的多选框组件
-->
<template>
  <div class="checkboxGroup">
    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleAllCheck">{{ title }}</el-checkbox>

    <el-checkbox-group v-model="checkedMenus" @change="handleSignCheck">
      <el-checkbox v-for="item in data" :label="item" :key="item">{{ item }}</el-checkbox>
    </el-checkbox-group>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      checkAll: false,
      isIndeterminate: true
    }
  },
  props: {
    value: {
      type: Array
    },
    title: {
      type: String,
      defualt: '全选'
    },
    data: {
      type: Array,
      default() {
        return []
      }
    }
  },
  computed: {
    checkedMenus: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  },
  components: {},
  created() {},
  mounted() {},
  methods: {
    handleAllCheck(val) {
      // console.log('全选', val)
      this.checkedMenus = val ? this.data : []
      this.isIndeterminate = false
    },
    handleSignCheck(val) {
      // console.log('单选', val)
      let checkedCount = val.length
      this.checkAll = checkedCount === this.data.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.data.length
    }
  }
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
.checkboxGroup {
  border: 1px solid #ddd;
  margin-bottom: 20px;
  background-color: #fff;
  padding: 0 10px;
  max-width: 950px;

  & > label {
    font-weight: 600;
  }

  .el-checkbox-group {
    padding-left: 20px;

    & > label {
      width: 150px;
    }
  }
}
</style>
