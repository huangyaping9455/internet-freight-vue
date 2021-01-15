<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()"
             label-width="120px">
      <el-form-item label="单证号" prop="documentNumber">
        <el-input v-model="dataForm.documentNumber" placeholder="单证号"></el-input>
      </el-form-item>
      <el-form-item label="资金流水单上传时间">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="资金流水单上传时间" v-model="dataForm.sendToProDateTime" style="width: 100%;"></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="实际承运人名称" prop="carrier">
        <el-input v-model="dataForm.carrier" placeholder="实际承运人名称"></el-input>
      </el-form-item>
      <el-form-item label="实际承运人统一社会信用代码或证件号码" prop="actualCarrierID">
        <el-input v-model="dataForm.actualCarrierID" placeholder="实际承运人统一社会信用代码或证件号码"></el-input>
      </el-form-item>
      <el-form-item label="车辆牌照号" prop="vehicleNumber">
        <el-input v-model="dataForm.vehicleNumber" placeholder="车辆牌照号"></el-input>
      </el-form-item>
      <el-form-item label="车牌颜色代码" prop="vehiclePlateColorCode">
        <el-input v-model="dataForm.vehiclePlateColorCode" placeholder="车牌颜色代码"></el-input>
      </el-form-item>
      <el-form-item label="运单列表" prop="shippingNoteList">
        <el-input v-model="dataForm.shippingNoteList" placeholder="运单列表"></el-input>
      </el-form-item>
      <el-form-item label="托运单号" prop="shippingNoteNumber">
        <el-input v-model="dataForm.shippingNoteNumber" placeholder="托运单号"></el-input>
      </el-form-item>
      <el-form-item label="财务列表" prop="financiallist">
        <el-input v-model="dataForm.financiallist" placeholder="财务列表"></el-input>
      </el-form-item>
      <el-form-item label="付款方式代码" prop="paymentMeansCode">
        <el-input v-model="dataForm.paymentMeansCode" placeholder="付款方式代码"></el-input>
      </el-form-item>
      <el-form-item label="收款方名称" prop="recipient">
        <el-input v-model="dataForm.recipient" placeholder="收款方名称"></el-input>
      </el-form-item>
      <el-form-item label="收款帐户信息" prop="receiptAccount">
        <el-input v-model="dataForm.receiptAccount" placeholder="收款帐户信息"></el-input>
      </el-form-item>
      <el-form-item label="银行代码" prop="bankCode">
        <el-input v-model="dataForm.bankCode" placeholder="银行代码"></el-input>
      </el-form-item>
      <el-form-item label="流水号/序列号" prop="sequenceCode">
        <el-input v-model="dataForm.sequenceCode" placeholder="流水号/序列号"></el-input>
      </el-form-item>
      <el-form-item label="实际支付金额" prop="monetaryAmount">
        <el-input v-model="dataForm.monetaryAmount" placeholder="实际支付金额"></el-input>
      </el-form-item>
      <el-form-item label="日期时间">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="日期时间" v-model="dataForm.dateTime" style="width: 100%;"></el-date-picker>
        </el-col>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {isEmail, isMobile} from '@/utils/validate'
import {getRoleList} from '@/api/api'

export default {
  data() {
    var validatePassword = (rule, value, callback) => {
      if (!this.dataForm.id && !/\S/.test(value)) {
        callback(new Error('密码不能为空'))
      } else {
        callback()
      }
    }
    var validateComfirmPassword = (rule, value, callback) => {
      if (!this.dataForm.id && !/\S/.test(value)) {
        callback(new Error('确认密码不能为空'))
      } else if (this.dataForm.password !== value) {
        callback(new Error('确认密码与密码输入不一致'))
      } else {
        callback()
      }
    }
    var validateEmail = (rule, value, callback) => {
      if (!isEmail(value)) {
        callback(new Error('邮箱格式错误'))
      } else {
        callback()
      }
    }
    var validateMobile = (rule, value, callback) => {
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
        name:'',
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
          {required: true, message: '用户名不能为空', trigger: 'blur'}
        ],
        password: [
          {validator: validatePassword, trigger: 'blur'}
        ],
        comfirmPassword: [
          {validator: validateComfirmPassword, trigger: 'blur'}
        ],
        email: [
          {required: true, message: '邮箱不能为空', trigger: 'blur'},
          {validator: validateEmail, trigger: 'blur'}
        ],
        mobile: [
          {required: true, message: '手机号不能为空', trigger: 'blur'},
          {validator: validateMobile, trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    init(id) {
      this.dataForm.id = id || 0
      getRoleList().then(({data}) => {
        this.roleList = data ? data : []
      }).then(() => {
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
        })
      }).then(() => {
        if (this.dataForm.id) {
          this.$http({
            url: this.$http.addUrl(`/uaa/sys/admin/${this.dataForm.id}`),
            method: 'get',
            params: this.$http.addParams()
          }).then(({data}) => {
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
    dataFormSubmit() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.$http({
            url: this.$http.addUrl(`/uaa/sys/admin${!this.dataForm.id ? '' : '/' + this.dataForm.id}`),
            method: `${!this.dataForm.id ? 'post' : 'put'}`,
            data: this.$http.addData({
              'id': this.dataForm.id || undefined,
              'username': this.dataForm.userName,
              'name': this.dataForm.name,
              'password': this.dataForm.password,
              'salt': this.dataForm.salt,
              'email': this.dataForm.email,
              'mobile': this.dataForm.mobile,
              'delete': this.dataForm.delete,
              'roleIdList': this.dataForm.roleIdList,
              'organizationId': this.$store.state.user.organizationId

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
