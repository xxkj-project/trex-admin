<!--
  添加/编辑 菜单
-->
<template>
  <div class="dialog">
    <el-dialog :title="title" :width="width" center :visible.sync="dialogVisible" @closed="handleClosed">
      <el-form :model="formData" :rules="rules" ref="formRef" label-width="300px">
        <el-form-item label="菜单名" prop="menuName">
          <el-input v-model="formData.menuName" clearable placeholder="请输入菜单名"></el-input>
        </el-form-item>

        <el-form-item label="权限标识" prop="perms">
          <el-input v-model="formData.perms" clearable placeholder="请输入权限标识"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <p>权限标识必须和菜单路由配置表name值相同</p>
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
import { addOrEditMenu } from '@/api/system'
export default {
  data() {
    return {
      isLoading: false,
      isInit: true,
      initData: {},
      rules: {
        menuName: [{ required: true, message: '请输入菜单名', trigger: 'blur' }],
        perms: [{ required: true, message: '请输入权限标识', trigger: 'blur' }]
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
    title() {
      let opeName = this.type === 'add' ? '添加' : '编辑'
      let signName = this.formData.parentId > 0 ? '二级' : '一级'
      return `${opeName}${signName}菜单`
    },
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
        console.log('-watch-formData-', data)
        console.log('-is-init-', this.isInit)
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
      console.log('-close-')
      this.isInit = true
      this.initData = {}
      this.$refs.formRef.clearValidate()
    },
    onConfirm() {
      this.vaildateFunc(() => {
        this.type === 'add' ? this.handleAdd() : this.handleEdit()
      })
    },
    handleAdd() {
      const params = { ...this.formData }
      this.reqFunc(this.type, params)
    },
    handleEdit() {
      const { id, parentId, ...otherObj } = this.formData
      const params = { id, parentId, ...this.setOtherParams(otherObj, this.initData) }
      this.reqFunc(this.type, params)
    },
    reqFunc(type, params) {
      console.log('-type-', type, '-params-', params)
      this.isLoading = true
      addOrEditMenu(type, params)
        .then(res => {
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
    },
    onReset() {
      this.$refs.formRef.resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
//@import url(); 引入公共css类
.el-form-item {
  // display: flex;
  // justify-content: center;

  /deep/ .el-form-item__label {
    width: 100px;
    // padding-right: 16px;
  }

  .el-input {
    width: 240px;
  }
}
</style>
