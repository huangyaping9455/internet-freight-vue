<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()"
             label-width="120px">
      <el-form-item label="对应运单号" prop="shippingNoteNumber">
        <el-input v-model="dataForm.shippingNoteNumber" placeholder="对应运单号"></el-input>
      </el-form-item>
      <el-form-item label="位置类型" prop="locationType">
        <el-input v-model="dataForm.locationType" placeholder="位置类型"></el-input>
      </el-form-item>
      <el-form-item label="经度" prop="longitude">
        <el-input v-model="dataForm.longitude" placeholder="经度"></el-input>
      </el-form-item>
      <el-form-item label="纬度" prop="latitude">
        <el-input v-model="dataForm.latitude" placeholder="纬度"></el-input>
      </el-form-item>
      <el-form-item label="表单上传时间">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="表单上传时间" v-model="dataForm.sendToProDateTime" style="width: 100%;"></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="发货/收货时间">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="发货/收货时间" v-model="dataForm.sendDateTime" style="width: 100%;"></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="发货/收货行政区划代码" prop="countrySubdivisionCode">
        <el-input v-model="dataForm.countrySubdivisionCode" placeholder="发货/收货行政区划代码"></el-input>
      </el-form-item>
      <el-form-item label="地点信息" prop="locationText">
        <el-input v-model="dataForm.locationText" placeholder="地点信息"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { isEmail, isMobile } from '@/utils/validate'
import { getRoleList } from '@/api/api'

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
    init (id) {
      this.dataForm.id = id || 0
      getRoleList().then(({ data }) => {
        this.roleList = data || []
      }).then(() => {
        this.visible = true
        this.$nextTick(() => {
          this.$refs.dataForm.resetFields()
        })
      }).then(() => {
        if (this.dataForm.id) {
          this.$http({
            url: this.$http.addUrl(`/uaa/sys/admin/${this.dataForm.id}`),
            method: 'get',
            params: this.$http.addParams()
          }).then(({ data }) => {
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
