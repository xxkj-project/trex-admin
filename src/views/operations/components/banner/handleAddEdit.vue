<!--
 * @Author: wangshengxian
 * @Date: 2020-10-09 18:25:11
 * @LastEditors: wangshengxian
 * @LastEditTime: 2021-01-10 18:46:56
 * @Desc: banner列表 - 添加/修改banner
-->
<template>
  <div class="dialog">
    <el-dialog
      :title="(type === 'add' ? '添加' : '编辑') + 'banner'"
      width="40%"
      :visible.sync="dialogVisible"
      @closed="handleClosed"
    >
      <el-form :model="formData" :rules="rules" ref="formRef" label-width="100px">
        <el-form-item label="过期时间" prop="expirate">
          <!-- <el-input v-model="formData.expirate" clearable></el-input> -->
          <el-date-picker
            v-model="formData.expirate"
            type="datetime"
            placeholder="选择日期时间"
            align="right"
            format="yyyy-MM-dd hh:mm:ss"
            value-format="yyyy-MM-dd hh:mm:ss"
            :picker-options="pickerOptions"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item label="跳转url" prop="url">
          <el-input v-model="formData.url" clearable></el-input>
        </el-form-item>

        <el-form-item label="排序" prop="sort">
          <el-input v-model="formData.sort" clearable></el-input>
        </el-form-item>

        <el-form-item label="banner图片" prop="img">
          <imgUpload ref="wxUploadRef" v-model="formData.img" :limit="1" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-check" @click="onSave">保存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import imgUpload from '@/components/imgUpload'
import { addBanner, editBanner } from '@/api/operations'
import picker from '@/utils/pickerOptions'
import { imgHeadUrl } from '@/utils/globalConst'
export default {
  name: '',
  data() {
    return {
      isInit: true,
      initObj: {},
      rules: {
        url: [{ required: true, message: '请输入跳转链接', trigger: 'blur' }],
        sort: [{ required: true, message: '请输入排序号', trigger: 'blur' }],
        img: [{ required: true, message: '请上传banner图', trigger: 'change' }]
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
    },
    pickerOptions() {
      return picker.pickerComOptions
    }
  },
  watch: {
    formData: {
      handler(data) {
        // console.log('-watch-edit-', data)
        // console.log('-is-init-', this.isInit)
        if (this.isInit) {
          this.initObj = { ...data }
          this.initObj.img = data.img[0]
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
      this.$refs.wxUploadRef.syncElUpload([])
      // TODO: 不能重置。只能清除验证，否则initObj获取不到初始化的formData值
      this.$refs.formRef.clearValidate()
    },
    // closed
    handleClosed() {
      this.initData()
    },
    // 保存
    onSave() {
      console.log('-type-', this.type)
      this.$refs.formRef.validate(valid => {
        if (valid) {
          this.type === 'add' ? this.addBannerReq() : this.editBannerReq()
        } else {
          return false
        }
      })
    },
    addBannerReq() {
      console.log('-add-', this.formData)
      let params = { ...this.formData }
      params.img = params.img[0].replace(`${imgHeadUrl}/`, '')
      console.log('-params-', params)
      addBanner(params).then(res => {
        console.log('-res-', res)
        this.$message({
          message: '添加成功!',
          type: 'success'
        })
        this.dialogVisible = false
        this.$emit('success')
      })
    },
    // TODO: 过期时间为空后台并没有改变状态为永久有效
    editBannerReq() {
      console.log('-edit-', this.formData)
      const { id, img, sort, url, expirate, dataStatus } = this.formData
      let params = { id, sort, url, expirate, dataStatus, img }
      params.img = params.img[0].replace(`${imgHeadUrl}/`, '')
      params.expirate = params.expirate || ''
      console.log('-params-', params)
      editBanner(params).then(res => {
        console.log('-res-', res)
        this.$message({
          message: '修改成功!',
          type: 'success'
        })
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
  components: { imgUpload }
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
.el-input {
  width: 220px;
}
</style>
