<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()"
             label-width="80px">
      <el-form-item label="角色名称" prop="roleName">
        <el-input v-model="dataForm.name" placeholder="角色名称"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="dataForm.remark" placeholder="备注"></el-input>
      </el-form-item>
      <el-form-item size="mini" label="授权">
        <el-tree
          :data="menuList"
          :props="menuListTreeProps"
          node-key="menuId"
          ref="menuListTree"
          :default-expand-all="true"
          show-checkbox>
        </el-tree>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { treeDataTranslate } from '@/utils'
import { getResourceList } from '@/api/api'
export default {
  data () {
    return {
      visible: false,
      menuList: [],
      menuListTreeProps: {
        label: 'name',
        children: 'children'
      },
      dataForm: {
        id: 0,
        name: '',
        remark: '',
        ids: []
      },
      dataRule: {
        name: [
          { required: true, message: '角色名称不能为空', trigger: 'blur' }
        ]
      },
      tempKey: 99999 // 临时key, 用于解决tree半选中状态项不能传给后台接口问题. # 待优化
    }
  },
  methods: {
    init: function (id) {
      this.dataForm.id = id || 0
      getResourceList().then(({ data: { data } }) => {
        this.menuList = treeDataTranslate(data, 'menuId')
      }).then(() => {
        this.visible = true
        this.$nextTick(() => {
          this.$refs.dataForm.resetFields()
          this.$refs.menuListTree.setCheckedKeys([])
        })
      }).then(() => {
        if (this.dataForm.id) {
          this.$http({
            url: this.$http.addUrl(`/uaa/sys/role/${this.dataForm.id}/resource`),
            method: 'get',
            params: this.$http.addParams()
          }).then(({ data }) => {
            if (data && data.code === 0) {
              this.dataForm.name = data.data.name
              this.dataForm.remark = data.data.remark
              const idx = data.data.resourceIds.indexOf(this.tempKey)
              if (idx !== -1) {
                data.data.resourceIds.splice(idx, data.data.resourceIds.length - idx)
              }

              this.dataForm.ids = data.data.resourceIds
              this.dataForm.ids.forEach((i, n) => {
                const node = this.$refs.menuListTree.getNode(i)
                if (node.isLeaf) {
                  this.$refs.menuListTree.setChecked(node, true)
                }
              })
            }
          })
        }
      })
    },

    // 表单提交
    dataFormSubmit () {
      const _creat = ''
      const _update = `${'/' + this.dataForm.id + '/resource'}`
      this.$refs.dataForm.validate((valid) => {
        if (valid) {
          this.$http({
            url: this.$http.addUrl(`/uaa/sys/role${!this.dataForm.id ? _creat : _update}`),
            method: 'post',
            data: this.$http.addData({
              id: this.dataForm.id || undefined,
              name: this.dataForm.name,
              remark: this.dataForm.remark,
              organizationId: this.$store.state.user.organizationId,
              resourceIds: [].concat(this.$refs.menuListTree.getCheckedKeys(), this.$refs.menuListTree.getHalfCheckedKeys())

            })
          }).then(({ data }) => {
            console.log(data)
            if (data && data.code === 0) {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1500,
                onClose: () => {
                  this.visible = false
                  this.$emit('refreshDataList')
                }
              })
            } else {
              this.$message.error(data.msg)
            }
          })
        }
      })
    }
  }
}
</script>
