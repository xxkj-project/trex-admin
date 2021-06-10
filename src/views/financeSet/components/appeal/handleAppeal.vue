<!--
 * @Author: wangshengxian
 * @Date: 2021-01-15 19:46:45
 * @LastEditors: wangshengxian
 * @LastEditTime: 2021-01-15 20:20:13
 * @Desc: 申诉 - dialog
-->
<template>
  <div class="dialog">
    <el-dialog title="申诉" width="600px" :visible.sync="dialogVisible" @closed="handleClosed">
      <el-form :model="initFormData" :rules="rules" ref="formRef" label-width="100px">
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="initFormData.status">
            <el-radio label="BuyerWin">BuyerWin</el-radio>
            <el-radio label="SellerWin">SellerWin</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注" prop="reason">
          <el-input v-model="initFormData.reason" type="textarea" :row="2" placeholder="请输入备注"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" :loading="isLoading" @click="onSubmit">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { appealSubmit } from '@/api/financeSet'
export default {
  name: '',
  data() {
    return {
      isLoading: false,
      initFormData: {
        status: 'BuyerWin',
        reason: ''
      },
      rules: {
        reason: [{ required: true, message: '请输入备注', trigger: 'blur' }]
      }
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: false
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
    onSubmit() {
      this.validateFunc(() => {
        const { id } = this.formData
        const params = { id, ...this.initFormData }
        console.log('-params-', params)
        appealSubmit(params).then(res => {
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
</style>
