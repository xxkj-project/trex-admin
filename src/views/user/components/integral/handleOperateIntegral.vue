<!--
 * @Author: wangshengxian
 * @Date: 2021-01-15 19:46:45
 * @LastEditors: wangshengxian
 * @LastEditTime: 2021-01-16 14:51:43
 * @Desc: 积分查询
-->
<template>
  <div class="dialog">
    <el-dialog title="修改积分" width="600px" :visible.sync="dialogVisible" @closed="handleClosed">
      <el-form :model="formData" :rules="rules" ref="formRef" label-width="100px">
        <el-form-item label="用户ID" prop="userId">
          <el-input v-model="formData.userId" disabled></el-input>
        </el-form-item>
        <el-form-item label="积分" prop="integral">
          <el-input v-model="formData.integral"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="isLoading" @click="onConfirm">确认</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { editUserIntegral } from '@/api/user'
export default {
  data() {
    return {
      isLoading: false,
      rules: {
        integral: [{ required: true, message: '请输入积分', trigger: 'blur' }]
      }
    }
  },
  props: {
    // type = add 加积分；sub 减积分
    type: {
      type: String,
      default: 'add'
    },
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
  created() {},
  mounted() {},
  methods: {
    handleClosed() {
      this.$refs.formRef.clearValidate()
    },
    onConfirm() {
      this.validateFunc(() => {
        let params = { ...this.formData }
        params.integral = this.type === 'add' ? params.integral : -params.integral
        console.log('-type-', this.type)
        console.log('-params-', params)
        this.isLoading = true
        editUserIntegral(params)
          .then(res => {
            console.log(res)
            this.$message({
              message: '操作成功!',
              type: 'success'
            })
            this.isLoading = false
            this.dialogVisible = false
            this.$emit('success')
          })
          .catch(() => {
            this.isLoading = false
          })
      })
    },
    validateFunc(callback) {
      this.$refs.formRef.validate(valid => {
        if (valid) {
          callback()
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.el-input {
  width: 200px;
}
</style>
