<!--
 * @Author: wangshengxian
 * @Date: 2021-01-03 01:56:36
 * @LastEditors: wangshengxian
 * @LastEditTime: 2021-01-22 11:17:12
 * @Desc: element-ui相关
-->

### 全局 dialog

```js
// 申诉
    onAppeals(row, idx) {
      console.log('申诉', row, idx)
      this.$prompt('', '提交申诉', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputType: 'textarea',
        inputPlaceholder: '备注最多100字',
        inputValidator: val => {
          return !!val
        },
        inputErrorMessage: '备注不能为空'
      })
        .then(({ value }) => {
          const { id, status } = row
          const params = { id, status, reason: value }
          console.log('-params-', params)
          appealSubmit(params).then(res => {
            console.log('-res-', res)
            this.$message({
              message: '提交成功！',
              type: 'success'
            })
            this.getData()
          })
        })
        .catch(() => {})
    }
```
