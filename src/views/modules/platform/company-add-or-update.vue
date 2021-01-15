<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()"
             label-width="80px">
      <el-form-item label="类型" prop="type">
        <el-radio-group v-model="dataForm.type">
          <el-radio v-for="(type, index) in dataForm.typeList" :label="index" :key="index">{{ type }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item :label="dataForm.typeList[dataForm.type] + '名称'" prop="name">
        <el-input v-model="dataForm.name" :placeholder="dataForm.typeList[dataForm.type] + '名称'"></el-input>
      </el-form-item>
      <el-form-item label="上级公司" prop="parentName">
        <el-popover
          ref="menuListPopover"
          placement="bottom-start"
          trigger="click">
          <el-tree
            :data="companyList"
            :props="companyListTreeProps"
            node-key="id"
            ref="menuListTree"
            @current-change="companyListTreeCurrentChangeHandle"
            :default-expand-all="true"
            :highlight-current="true"
            :expand-on-click-node="false">
          </el-tree>
        </el-popover>
        <el-input v-model="dataForm.parentName" v-popover:menuListPopover :readonly="true" placeholder="点击选择上级菜单"
                  class="menu-list__input"></el-input>
      </el-form-item>
      <el-form-item label="资源权限" size="mini" prop="roleIdList" v-if="dataForm.type==0">
        <el-checkbox-group v-model="dataForm.roleIdList">
          <el-checkbox v-for="role in roleList" :key="role.id" :label="role.id">{{ role.name }}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>

    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {treeDataTranslate} from '@/utils'
import Icon from '@/icons'

export default {
  data() {

    return {
      visible: false,
      roleList: [],
      dataForm: {
        id: 18,
        type: 0,
        typeList: ['公司', '部门'],
        name: '',
        parentId: 18,
        parentName: '',
        roleIdList: []
      },
      dataRule: {
        name: [
          {required: true, message: '菜单名称不能为空', trigger: 'blur'}
        ],
        parentName: [
          {required: true, message: '上级菜单不能为空', trigger: 'change'}
        ]
      },
      companyList: [],
      companyListTreeProps: {
        label: 'name',
        children: 'children'
      }
    }
  },

  methods: {
    init(id) {

      this.dataForm.id = id || 0
      this.$http({
        url: this.$http.addUrl('/uaa/sys/organization/organizationRootList'),
        // url: '/src/router/test.json',
        method: 'get',
        params: this.$http.addParams()
      }).then(({data: {data}}) => {
        this.companyList = treeDataTranslate(data, 'id')

      }).then(() => {
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
        })
      }).then(() => {
        if (!this.dataForm.id) {
          // 新增
          this.companyListTreeSetCurrentNode()
        } else {
          // 修改
          this.$http({
            url: this.$http.addUrl(`/uaa/sys/organization/${this.dataForm.id}`),
            method: 'get',
            params: this.$http.addParams()
          }).then(({data: data}) => {
            this.dataForm.id = data.data.id
            this.dataForm.type = data.data.type
            this.dataForm.name = data.data.name
            this.dataForm.parentId = data.data.parentId
            this.roleList = data.data.roleList,
              this.dataForm.roleIdList = data.data.roleIds
            this.companyListTreeSetCurrentNode()
          })
        }
      })
    },
    // 菜单树选中
    companyListTreeCurrentChangeHandle(data, node) {
      this.dataForm.parentId = data.id
      this.dataForm.parentName = data.name
    },
    // 菜单树设置当前选中节点
    companyListTreeSetCurrentNode() {
      this.$refs.menuListTree.setCurrentKey(this.dataForm.parentId)
      this.dataForm.parentName = (this.$refs.menuListTree.getCurrentNode() || {})['name']

    },

    // 表单提交
    dataFormSubmit() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.$http({
            url: this.$http.addUrl(`/uaa/sys/organization${!this.dataForm.id ? '' : '/' + this.dataForm.id}`),
            method: `${!this.dataForm.id ? 'post' : 'put'}`,
            data: this.$http.addData({
              'id': this.dataForm.id || undefined,
              'type': this.dataForm.type,
              'name': this.dataForm.name,
              'parentId': this.dataForm.parentId,

            })
          }).then(({data}) => {
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

<style lang="scss">
.mod-menu {
  .menu-list__input,
  .icon-list__input {
    > .el-input__inner {
      cursor: pointer;
    }
  }

  &__icon-popover {
    width: 458px;
    overflow: hidden;
  }

  &__icon-inner {
    width: 478px;
    max-height: 258px;
    overflow-x: hidden;
    overflow-y: auto;
  }

  &__icon-list {
    width: 458px;
    padding: 0;
    margin: -8px 0 0 -8px;

    > .el-button {
      padding: 8px;
      margin: 8px 0 0 8px;

      > span {
        display: inline-block;
        vertical-align: middle;
        width: 18px;
        height: 18px;
        font-size: 18px;
      }
    }
  }

  .icon-list__tips {
    font-size: 18px;
    text-align: center;
    color: #e6a23c;
    cursor: pointer;
  }
}
</style>
