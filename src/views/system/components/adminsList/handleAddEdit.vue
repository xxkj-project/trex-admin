<template>
  <div class="dialog">
    <el-dialog
      :title="type === 'add' ? '添加' : '编辑' + '管理员角色'"
      :width="width"
      :visible.sync="dialogVisible"
      @closed="handleClosed"
    >
      <el-form :model="formData" :rules="rules" ref="formRef" label-width="140px">
        <el-form-item label="角色名" prop="roleId">
          <el-select v-model="formData.roleId" clearable placeholder="请选择">
            <el-option v-for="item in rolesList" :label="item.label" :value="item.value" :key="item.value"></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <div class="dialog-footer" slot="footer">
        <el-button type="primary" :loading="isLoading" @click="onConfirm">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { editAdminRole } from '@/api/system'
export default {
  data() {
    return {
      isLoading: false,
      isInit: true,
      initObj: {},
      rules: {
        roleId: [{ required: true, message: '请选择角色名', trigger: 'blur' }]
      }
    }
  },
  props: {
    type: {
      type: String,
      default: 'add'
    },
    width: {
      type: String,
      default: '600px'
    },
    visible: {
      type: Boolean,
      default: false
    },
    rolesList: {
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
  watch: {
    formData: {
      handler(data) {
        // console.log('-watch-edit-', data)
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
        // console.log(this.formData)
        this.isLoading = true
        editAdminRole(this.formData)
          .then(res => {
            this.$message({
              message: '编辑成功',
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
.el-input {
  width: 200px;
}
</style>
