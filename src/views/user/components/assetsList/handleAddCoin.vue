<!--
 * @Author: wangshengxian
 * @Date: 2021-01-15 19:46:45
 * @LastEditors: wangshengxian
 * @LastEditTime: 2021-01-16 14:51:43
 * @Desc: 申诉 - dialog
-->
<template>
  <div class="dialog">
    <el-dialog title="加币" width="600px" :visible.sync="dialogVisible" @closed="handleClosed">
      <el-form :model="formData" :rules="rules" ref="formRef" label-width="100px">
        <el-form-item label="用户ID" prop="userId">
          <el-input v-model="formData.userId" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="币种" prop="coin">
          <el-select v-model="formData.coin" placeholder="请选择" @change="onCoinChange">
            <el-option v-for="item in coinList" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-input v-model="formData.type" disabled></el-input>
          <!-- <el-select v-model="formData.type" placeholder="请选择">
            <el-option v-for="item in typeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select> -->
        </el-form-item>
        <el-form-item label="数量" prop="amount">
          <el-input-number v-model="formData.amount" controls-position="right"></el-input-number>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" :loading="isLoading" @click="onSubmit">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { addCoin } from '@/api/user'
export default {
  name: '',
  data() {
    return {
      isLoading: false,
      // typeList: [
      //   { value: 1, label: 'coin' },
      //   { value: 2, label: 'legal' }
      // ],
      rules: {
        coin: [{ required: true, message: '请选择币种', trigger: 'change' }],
        amount: [{ required: true, message: '请选择数量', trigger: 'blur' }]
      }
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    coinList: {
      type: Array,
      default() {
        return []
      }
    },
    formData: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    dialogVisible: {
      get() {
        return this.visible
      },
      set(val) {
        this.$emit('update:visible', val)
      }
    }
  },
  components: {},
  created() {},
  mounted() {},
  methods: {
    handleClosed() {
      this.handleReset()
    },
    onCoinChange(val) {
      if (!val) {
        this.formData.type = ''
        return
      }
      // 币种类型：UBNK、XIF、USDT、UBG、USD、PHP
      // UBNK、XIF、USDT、UBG ==》币种类型为coin
      // USD、PHP ==》币种类型为lebal
      let coinVal = this.coinList[val].label
      // console.log('-coin-', coinVal)
      let valideArr = ['USD', 'PHP']
      this.formData.type = valideArr.includes(coinVal) ? 'lebal' : 'coin'
    },
    onSubmit() {
      this.validateFunc(() => {
        const { amount, coin, ...otherObj } = this.formData
        if (!amount) {
          this.$message({
            message: '数量不能为零！',
            type: 'warning'
          })
          return
        }
        let coinVal = this.coinList[coin].label
        console.log('-coin-', coin)
        const params = { amount, coin: coinVal, ...otherObj }
        console.log('-params-', params)
        addCoin(params).then(res => {
          console.log('-res-', res)
          this.$message({
            message: '提交成功！',
            type: 'success'
          })
          this.dialogVisible = false
          this.$emit('success')
        })
      })
    },
    handleReset() {
      this.$refs.formRef.resetFields()
    },
    validateFunc(callback) {
      this.$refs.formRef.validate(valid => {
        if (valid) {
          callback()
          return
        }
        return false
      })
    }
  }
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
.el-input,
.el-input-number,
.el-select {
  width: 180px;
}
</style>
