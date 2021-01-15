<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()"
             label-width="120px">
      <el-form-item label="原始单号" prop="originalDocumentNumber">
        <el-input v-model="dataForm.originalDocumentNumber" placeholder="原始单号"></el-input>
      </el-form-item>
      <el-form-item label="托运单号" prop="shippingNoteNumber">
        <el-input v-model="dataForm.shippingNoteNumber" placeholder="托运单号"></el-input>
      </el-form-item>
      <el-form-item label="运单上传时间">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="运单上传时间" v-model="dataForm.sendToProDateTime" style="width: 100%;"></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="网络货运经营者名称" prop="carrier">
        <el-input v-model="dataForm.carrier" placeholder="网络货运经营者名称"></el-input>
      </el-form-item>
      <el-form-item label="统一社会信用代码" prop="unifiedSocialCreditIdentifier">
        <el-input v-model="dataForm.unifiedSocialCreditIdentifier" placeholder="统一社会信用代码"></el-input>
      </el-form-item>
      <el-form-item label="道路运输经营许可证编号" prop="permitNumber">
        <el-input v-model="dataForm.permitNumber" placeholder="道路运输经营许可证编号"></el-input>
      </el-form-item>
      <el-form-item label="运单生成时间">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="运单生成时间" v-model="dataForm.consignmentDateTime" style="width: 100%;"></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="业务类型代码" prop="businessTypeCode">
        <el-input v-model="dataForm.businessTypeCode" placeholder="业务类型代码"></el-input>
      </el-form-item>
      <el-form-item label="发货日期时间">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="发货日期时间" v-model="dataForm.despatchActualDateTime" style="width: 100%;"></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="收货日期时间">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="收货日期时间" v-model="dataForm.goodsReceiptDateTime" style="width: 100%;"></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="托运人信息" prop="consignorInfo">
        <el-input v-model="dataForm.consignorInfo" placeholder="托运人信息"></el-input>
      </el-form-item>
      <el-form-item label="托运人名称" prop="consignor">
        <el-input v-model="dataForm.consignor" placeholder="托运人名称"></el-input>
      </el-form-item>
      <el-form-item label="托运人统一社会信用代码或个人证件号" prop="consignorID">
        <el-input v-model="dataForm.consignorID" placeholder="托运人统一社会信用代码或个人证件号"></el-input>
      </el-form-item>
      <el-form-item label="装货地址" prop="placeOfLoading">
        <el-input v-model="dataForm.placeOfLoading" placeholder="装货地址"></el-input>
      </el-form-item>
      <el-form-item label="装货地点的国家行政区划代码" prop="countrySubdivisionCode">
        <el-input v-model="dataForm.countrySubdivisionCode" placeholder="装货地点的国家行政区划代码"></el-input>
      </el-form-item>
      <el-form-item label="收货方信息" prop="consigneeInfo">
        <el-input v-model="dataForm.consigneeInfo" placeholder="收货方信息"></el-input>
      </el-form-item>
      <el-form-item label="收货方名称" prop="consignee">
        <el-input v-model="dataForm.consignee" placeholder="收货方名称"></el-input>
      </el-form-item>
      <el-form-item label="收货方统一社会信用代码或个人证件号码" prop="consigneeID">
        <el-input v-model="dataForm.consigneeID" placeholder="收货方统一社会信用代码或个人证件号码"></el-input>
      </el-form-item>
      <el-form-item label="收货地址" prop="goodsReceiptPlace">
        <el-input v-model="dataForm.goodsReceiptPlace" placeholder="收货地址"></el-input>
      </el-form-item>
      <el-form-item label="收货地点的国家行政区划代码" prop="countrySubdivisionCode">
        <el-input v-model="dataForm.countrySubdivisionCode" placeholder="收货地点的国家行政区划代码"></el-input>
      </el-form-item>
      <el-form-item label="运费金额" prop="totalMonetaryAmount">
        <el-input v-model="dataForm.totalMonetaryAmount" placeholder="运费金额"></el-input>
      </el-form-item>
      <el-form-item label="车辆信息" prop="vehicleInfo">
        <el-input v-model="dataForm.vehicleInfo" placeholder="车辆信息"></el-input>
      </el-form-item>
      <el-form-item label="车牌颜色代码" prop="vehiclePlateColorCode">
        <el-input v-model="dataForm.vehiclePlateColorCode" placeholder="车牌颜色代码"></el-input>
      </el-form-item>
      <el-form-item label="车辆牌照号" prop="vehicleNumber">
        <el-input v-model="dataForm.vehicleNumber" placeholder="车辆牌照号"></el-input>
      </el-form-item>
      <el-form-item label="驾驶员" prop="driver">
        <el-input v-model="dataForm.driver" placeholder="驾驶员"></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="driverName">
        <el-input v-model="dataForm.driverName" placeholder="姓名"></el-input>
      </el-form-item>
      <el-form-item label="机动车驾驶证编号" prop="drivingLicense">
        <el-input v-model="dataForm.drivingLicense" placeholder="机动车驾驶证编号"></el-input>
      </el-form-item>
      <el-form-item label="货物信息" prop="goodsInfo">
        <el-input v-model="dataForm.goodsInfo" placeholder="货物信息"></el-input>
      </el-form-item>
      <el-form-item label="货物名称" prop="descriptionOfGoods">
        <el-input v-model="dataForm.descriptionOfGoods" placeholder="货物名称"></el-input>
      </el-form-item>
      <el-form-item label="货物类型分类代码" prop="cargoTypeClassificationCode">
        <el-input v-model="dataForm.cargoTypeClassificationCode" placeholder="货物类型分类代码"></el-input>
      </el-form-item>
      <el-form-item label="货物项毛重" prop="goodsItemGrossWeight">
        <el-input v-model="dataForm.goodsItemGrossWeight" placeholder="货物项毛重"></el-input>
      </el-form-item>
      <el-form-item label="体积" prop="cube">
        <el-input v-model="dataForm.cube" placeholder="体积"></el-input>
      </el-form-item>
      <el-form-item label="总件数" prop="totalNumberOfPackages">
        <el-input v-model="dataForm.totalNumberOfPackages" placeholder="总件数"></el-input>
      </el-form-item>
      <el-form-item label="实际承运人信息" prop="actualCarrierInfo">
        <el-input v-model="dataForm.actualCarrierInfo" placeholder="实际承运人信息"></el-input>
      </el-form-item>
      <el-form-item label="实际承运人名称" prop="actualCarrierName">
        <el-input v-model="dataForm.actualCarrierName" placeholder="实际承运人名称"></el-input>
      </el-form-item>
      <el-form-item label="实际承运人道路运输经营许可证号" prop="actualCarrierBusinessLicense">
        <el-input v-model="dataForm.actualCarrierBusinessLicense" placeholder="实际承运人道路运输经营许可证号"></el-input>
      </el-form-item>
      <el-form-item label="实际承运人统一社会信用代码或证件号码" prop="actualCarrierID">
        <el-input v-model="dataForm.actualCarrierID" placeholder="实际承运人统一社会信用代码或证件号码"></el-input>
      </el-form-item>
      <el-form-item label="保险信息" prop="insuranceInformation">
        <el-input v-model="dataForm.insuranceInformation" placeholder="保险信息"></el-input>
      </el-form-item>
      <el-form-item label="保险单号" prop="policyNumber">
        <el-input v-model="dataForm.policyNumber" placeholder="保险单号"></el-input>
      </el-form-item>
      <el-form-item label="保险公司" prop="insuranceCompany">
        <el-input v-model="dataForm.insuranceCompany" placeholder="保险公司"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="dataForm.remark" placeholder="备注"></el-input>
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
