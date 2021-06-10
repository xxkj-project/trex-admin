<!--
 * @Author: wangshengxian
 * @Date: 2020-10-09 18:25:11
 * @LastEditors: wangshengxian
 * @LastEditTime: 2021-01-10 20:47:29
 * @Desc: 公告列表 - 添加/修改公告
-->
<template>
  <div class="dialog">
    <el-dialog
      :title="(type === 'add' ? '添加' : '编辑') + '公告'"
      width="40%"
      :visible.sync="dialogVisible"
      @closed="handleClosed"
    >
      <el-form :model="formData" :rules="rules" ref="formRef" label-width="100px">
        <el-form-item label="标题" prop="title">
          <el-input v-model="formData.title" clearable></el-input>
        </el-form-item>

        <el-form-item label="公告详情" prop="details">
          <el-input v-model="formData.details" clearable></el-input>
        </el-form-item>

        <el-form-item label="是否弹出" prop="times">
          <el-switch v-model="formData.times"> </el-switch>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" :loading="isLoading" @click="onSave">保存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { addNotice, editNotice } from '@/api/message'
export default {
  name: '',
  data() {
    return {
      isLoading: false,
      isInit: true,
      initObj: {},
      rules: {
        title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
        details: [{ required: true, message: '请输入公告详情', trigger: 'blur' }]
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
        console.log('-watch-edit-', data)
        // console.log('-is-init-', this.isInit)
        if (this.isInit) {
          this.initObj = { ...data }
          this.isInit = false
        }
        // console.log('-init-data-', this.initObj)
      },
      deep: true
    }
  },
  created() {},
  mounted() {},
  methods: {
    initData() {
      this.isInit = true
      this.initObj = {}
      // TODO: 不能重置。只能清除验证，否则initObj获取不到初始化的formData值
      this.$refs.formRef.clearValidate()
    },
    // closed
    handleClosed() {
      this.initData()
    },
    // 保存
    onSave() {
      this.validateFunc(() => {
        console.log('-type-', this.type)
        this.type === 'add' ? this.addReq() : this.editReq()
      })
    },
    addReq() {
      this.isLoading = true
      const params = this.formData
      console.log('-params-', params)
      addNotice(params).then(res => {
        console.log('-res-', res)
        this.$message({
          message: '添加成功!',
          type: 'success'
        })
        this.isLoading = false
        this.dialogVisible = false
        this.$emit('success')
      })
    },
    editReq() {
      this.isLoading = true
      const params = { ...this.formData }
      console.log('-params-', params)
      editNotice(params).then(res => {
        console.log('-res-', res)
        this.$message({
          message: '修改成功!',
          type: 'success'
        })
        this.isLoading = false
        this.dialogVisible = false
        this.$emit('success')
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
    },
    validateFuncs(callback) {
      this.$refs.formRef.validate(valid => {
        if (valid) {
          let mid = { ...this.formData }
          mid.pic = mid.pic[0]
          // console.log('-mid-', mid)
          let params = this.type === 'add' ? mid : this.setEditParams(mid)
          // console.log('-params-', params)
          if (JSON.stringify(params) === '{}') {
            this.$message({
              message: '请选择修改的选项!',
              type: 'warning'
            })
            return
          }
          callback(params)
        } else {
          return false
        }
      })
    },
    // 设置编辑参数(修改了哪个属性值，获取哪个属性值)
    setEditParams(formObj) {
      // console.log('-init-obj-', this.initObj, '-form-obj-', formObj)
      let result = {}
      Object.keys(this.initObj).forEach(key => {
        // console.log('-key-', key, '-value-', formObj[key])
        if (this.initObj[key] !== formObj[key]) {
          result[key] = formObj[key]
        }
      })
      if (JSON.stringify(result) !== '{}') {
        result.id = formObj.id
      }
      return result
    }
  },
  components: {}
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
.el-input {
  width: 160px;
}
</style>
