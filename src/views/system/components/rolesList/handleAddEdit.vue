<!--
  添加/编辑 角色
-->
<template>
  <div class="dialog">
    <el-dialog
      :title="(type === 'add' ? '添加' : '编辑') + '角色'"
      :width="width"
      center
      :visible.sync="dialogVisible"
      @closed="handleClosed"
    >
      <el-form :model="formData" :rules="rules" ref="formRef">
        <el-form-item label="角色名" prop="roleName">
          <el-input v-model="formData.roleName" clearable placeholder="请输入角色名"></el-input>
        </el-form-item>

        <el-form-item label="角色说明" prop="remark">
          <el-input v-model="formData.remark" clearable placeholder="请输入角色说明"></el-input>
        </el-form-item>
      </el-form>
      <div class="dialog-fotter" slot="footer">
        <el-button @click="onReset">重置</el-button>
        <el-button type="primary" :loading="isLoading" @click="onConfirm">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { addOrEditRole } from '@/api/system'
export default {
  data() {
    return {
      isInit: true,
      initData: {},
      isLoading: false,
      rules: {
        roleName: [{ required: true, message: '请输入角色名', trigger: 'blur' }],
        remark: [{ required: true, message: '请输入角色说明', trigger: 'blur' }]
      }
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'add'
    },
    width: {
      type: String,
      default: '800px'
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
        if (this.isInit) {
          console.log('-初始化-')
          this.initData = { ...data }
          this.isInit = false
        }
      }
    }
  },
  created() {},
  mounted() {},
  methods: {
    handleClosed() {
      this.isInit = true
      this.initData = {}
      this.$refs.formRef.clearValidate()
    },
    onReset() {
      this.$emit('changeValue', this.formData)
    },
    onConfirm() {
      this.vaildateFunc(() => {
        this.type === 'add' ? this.handleAdd() : this.handleEdit()
      })
    },
    handleAdd() {
      const params = { ...this.formData }
      console.log('-params-', params)
      this.reqFunc(this.type, params)
    },
    handleEdit() {
      console.log('编辑')
      const { id, ...otherObj } = this.formData
      const params = { id, ...this.setOtherParams(otherObj, this.initData) }
      this.reqFunc(this.type, params)
    },
    reqFunc(type, params) {
      console.log('-type-', type, '-params-', params)
      this.isLoading = true
      addOrEditRole(type, params)
        .then(res => {
          // console.log('-res-', res)
          this.$message({
            message: '操作成功',
            type: 'success'
          })
          this.isLoading = false
          this.dialogVisible = false
          this.$emit('success')
        })
        .catch(err => {
          this.isLoading = false
          this.$message({ type: 'error', message: err.msg })
        })
    },
    /**
     * 比较两个属性相同的对象，若值相同，该属性值设置为空，若不相同则该属性值设置为源对象的属性值
     * @param {object} source 源对象
     * @param {object} initData 初始对象
     */
    setOtherParams(source, initData) {
      let result = {}
      Object.keys(source).forEach(key => {
        result[key] = source[key] === initData[key] ? '' : source[key]
      })
      return result
    },
    vaildateFunc(callback) {
      this.$refs.formRef.validate(vaild => {
        if (vaild) {
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
//@import url(); 引入公共css类
.el-form-item {
  display: flex;
  justify-content: center;

  /deep/ .el-form-item__label {
    width: 100px;
    // padding-right: 16px;
  }

  .el-input {
    width: 240px;
  }
}
</style>
