<template>
  <el-drawer
    :title="!dataForm.id ? '新增' : '修改'"
    :destroy-on-close="true"
    size="50%"
    :before-close="handleClose"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()"
             label-width="80px">
      <el-form-item label="登陆名" prop="userName">
        <el-input :disabled="!dataForm.id?false:true" v-model="dataForm.userName" placeholder="登录帐号"></el-input>
      </el-form-item>

      <el-form-item label="用户名" prop="name">
        <el-input v-model="dataForm.name" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password" :class="{ 'is-required': !dataForm.id }">
        <el-input v-model="dataForm.password" type="password" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="comfirmPassword" :class="{ 'is-required': !dataForm.id }">
        <el-input v-model="dataForm.comfirmPassword" type="password" placeholder="确认密码"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="dataForm.email" placeholder="邮箱"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="dataForm.mobile" placeholder="手机号"></el-input>
      </el-form-item>
      <el-divider content-position="left"></el-divider>
      <el-form-item label="角色" size="mini" prop="roleIdList">
        <el-checkbox-group v-model="dataForm.roleIdList">
          <el-checkbox
            v-for="role in roleList"
            :key="role.id"
            :label="role.id">{{ role.name }}
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-divider content-position="left"></el-divider>
      <el-form-item label="状态" size="mini" prop="status">
        <el-radio-group v-model="dataForm.delete">
          <el-radio :label=true>禁用</el-radio>
          <el-radio :label=false>正常</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <el-divider content-position="left"></el-divider>
<!--    <span slot="footer" class="dialog-footer">-->
      <el-button @click="cancel (dataForm)">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
<!--    </span>-->
  </el-drawer>
</template>

<script>
import { isEmail, isMobile } from '@/utils/validate'
import { getRoleListByCondition, getUserInfo } from '@/api/api'

export default {
  data () {
    const validatePassword = (rule, value, callback) => {
      if (!this.dataForm.id && !/\S/.test(value)) {
        callback(new Error('密码不能为空'))
      } else {
        callback()
      }
    }
    const validateComfirmPassword = (rule, value, callback) => {
      if (!this.dataForm.id && !/\S/.test(value)) {
        callback(new Error('确认密码不能为空'))
      } else if (this.dataForm.password !== value) {
        callback(new Error('确认密码与密码输入不一致'))
      } else {
        callback()
      }
    }
    const validateEmail = (rule, value, callback) => {
      if (!isEmail(value)) {
        callback(new Error('邮箱格式错误'))
      } else {
        callback()
      }
    }
    const validateMobile = (rule, value, callback) => {
      if (!isMobile(value)) {
        callback(new Error('手机号格式错误'))
      } else {
        callback()
      }
    }
    return {
      visible: false,
      roleList: [],
      dataForm: {
        id: 0,
        userName: '',
        name: '',
        password: '',
        comfirmPassword: '',
        organizationId: '',
        email: '',
        mobile: '',
        roleIdList: [],
        delete: 1
      },
      dataRule: {
        userName: [
          { required: true, message: '用户名不能为空', trigger: 'blur' }
        ],
        password: [
          { validator: validatePassword, trigger: 'blur' }
        ],
        comfirmPassword: [
          { validator: validateComfirmPassword, trigger: 'blur' }
        ],
        email: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' },
          { validator: validateEmail, trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { validator: validateMobile, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {

    /**
     * 取消
     * @param dataForm
     */
    cancel (dataForm) {
      this.$refs.dataForm.resetFields()
      this.visible = false
    },
    /**
     * 关闭弹出抽屉
     * @param done
     */
    handleClose (done) {
      this.$refs.dataForm.resetFields()
      done()
    },
    init (id) {
      this.dataForm.id = id || 0
      const params = {
        organizationId: this.$store.state.user.organization.id
      }
      getRoleListByCondition(params).then(({ data }) => {
        this.roleList = data || []
      }).then(() => {
        this.visible = true
        this.$nextTick(() => {
          this.$refs.dataForm.resetFields()
        })
      }).then(() => {
        if (this.dataForm.id) {
          getUserInfo(this.dataForm.id).then(({ data }) => {
            if (data && data.code === 0) {
              this.dataForm.userName = data.data.username
              this.dataForm.organizationId = data.data.organizationId
              this.dataForm.email = data.data.email
              this.dataForm.mobile = data.data.mobile
              this.dataForm.name = data.data.name
              this.dataForm.roleIdList = data.data.roleIdList
              this.dataForm.delete = data.data.delete
            }
          })
        }
      })
    },
    // 表单提交
    dataFormSubmit () {
      this.$refs.dataForm.validate((valid) => {
        if (valid) {
          this.$http({
            url: this.$http.addUrl(`/uaa/sys/admin${!this.dataForm.id ? '' : '/' + this.dataForm.id}`),
            method: `${!this.dataForm.id ? 'post' : 'put'}`,
            data: this.$http.addData({
              id: this.dataForm.id || undefined,
              username: this.dataForm.userName,
              name: this.dataForm.name,
              password: this.dataForm.password,
              salt: this.dataForm.salt,
              email: this.dataForm.email,
              mobile: this.dataForm.mobile,
              delete: this.dataForm.delete,
              roleIdList: this.dataForm.roleIdList,
              organizationId: this.$store.state.user.organization.id

            })
          }).then(({ data }) => {
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
