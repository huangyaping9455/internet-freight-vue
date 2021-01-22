<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
<!--   :rules="dataRule"-->
    <el-form :model="dataForm"  ref="dataForm" @keyup.enter.native="dataFormSubmit()"
             label-width="160px">
      <el-form-item label="姓名" prop="driverName" :class="{ 'is-required': !dataForm.driverName }">
        <el-input v-model="dataForm.driverName" placeholder="姓名"></el-input>
      </el-form-item>
      <el-form-item label="驾驶证编号" prop="drivingLicense" :class="{ 'is-required': !dataForm.drivingLicense }">
        <el-input v-model="dataForm.drivingLicense" placeholder="驾驶证编号"></el-input>
      </el-form-item>
      <el-form-item label="准驾车型" prop="vehicleClass" :class="{ 'is-required': !dataForm.vehicleClass }">
        <el-input v-model="dataForm.vehicleClass" placeholder="准驾车型"></el-input>
      </el-form-item>
      <el-form-item label="驾驶证发证机关" prop="issuingOrganizations"
                    :class="{ 'is-required': !dataForm.issuingOrganizations }">
        <el-input v-model="dataForm.issuingOrganizations" placeholder="驾驶证发证机关"></el-input>
      </el-form-item>
      <el-form-item label="驾驶证有效期自" prop="validPeriodFrom" :class="{ 'is-required': !dataForm.validPeriodFrom }">
        <div class="block">
          <el-date-picker
            v-model="dataForm.validPeriodFrom"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </div>
      </el-form-item>
      <el-form-item label="驾驶证有效期至" prop="validPeriodTo" :class="{ 'is-required': !dataForm.validPeriodTo }">
        <div class="block">
          <el-date-picker
            v-model="dataForm.validPeriodTo"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </div>
      </el-form-item>
      <el-form-item label="从业资格证号" prop="qualificationCertificate"
                    :class="{ 'is-required': !dataForm.qualificationCertificate }">
        <el-input v-model="dataForm.qualificationCertificate" placeholder="从业资格证号"></el-input>
      </el-form-item>
      <el-form-item label="手机号码" prop="telephone" :class="{ 'is-required': !dataForm.telephone }">
        <el-input v-model="dataForm.telephone" placeholder="手机号码"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="dataForm.remark" placeholder="备注"></el-input>
      </el-form-item>

      <el-form-item label="驾驶证" prop="driverLicense">
        <el-upload
          class="upload-demo"
          drag
          action="filesystem/fileFastDFS/upload"
          multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text" v-model="dataForm.driverLicense">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {addDriver, upload} from '@/api/api'
import {telephone} from '../../../utils/validate'

export default {
  data() {
    return {
      visible: false,
      roleList: [],
      dataForm: {
        id: 0,
        'driverName': '',
        'drivingLicense': '',
        'vehicleClass': '',
        'issuingOrganizations': '',
        'validPeriodFrom': '',
        'validPeriodTo': '',
        'qualificationCertificate': '',
        'telephone': '',
        'remark': '',
        'driverLicense':'',
        delete: 1
      },
      /*  dataRule: {
    driverName: [
         {required: true, message: '驾驶员姓名不能为空', trigger: 'blur'}
       ],
       drivingLicense: [
         {required: true, message: '身份证号不能为空', trigger: 'blur'}
       ],
       vehicleClass: [
         {required: true, message: '准驾车型不能为空', trigger: 'blur'}
       ],
       issuingOrganizations: [
         {required: true, message: '驾驶证发证机关不能为空', trigger: 'blur'}
       ],
       validPeriodFrom: [
         {required: true, message: '驾驶证有效期自不能为空', trigger: 'blur'}
       ],
       validPeriodTo: [
         {required: true, message: '驾驶证有效期至不能为空', trigger: 'blur'}
       ],
       qualificationCertificate: [
         {required: true, message: '从业资格证号不能为空', trigger: 'blur'}
       ],
      telephone: [
        {required: true, message: '手机号不能为空', trigger: 'blur'},
        {validator: telephone, trigger: 'blur'}
      ]
    }*/
      /*日期*/
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        },
      },
      validPeriodFrom: '',
      validPeriodTo: '',
    }
  },
  methods: {
    init(id) {
      this.dataForm.id = id || 0
      if (this.dataForm.id) {
        this.$http({
          url: this.$http.addUrl(`/internetfreight/financials/getOneById`),
          method: 'get',
          params: this.$http.addParams({id: this.dataForm.id})
        }).then(({data}) => {
          alert(44444)
          if (data && data.code === 0) {
              this.dataForm.documentNumber = data.data.driverName,
              this.dataForm.sendToProDateTime = data.data.drivingLicense,
              this.dataForm.carrier = data.data.vehicleClass,
              this.dataForm.actualCarrierId = data.data.issuingOrganizations,
              this.dataForm.vehicleNumber = data.data.validPeriodFrom,
              this.dataForm.vehiclePlateColorCode = data.data.validPeriodTo,
              this.dataForm.remark = data.data.qualificationCertificate
          }
        })
      }
      this.visible = true
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs['dataForm'].validate((valid) => {
        let methods = `${!this.dataForm.id ? 'post' : 'put'}`;
        if (valid) {
          let dataForm = {
            'id': this.dataForm.id || undefined,
            'driverName': this.dataForm.driverName,
            'drivingLicense': this.dataForm.drivingLicense,
            'vehicleClass': this.dataForm.vehicleClass,
            'issuingOrganizations': this.dataForm.issuingOrganizations,
            'validPeriodFrom': this.dataForm.validPeriodFrom,
            'validPeriodTo': this.dataForm.validPeriodTo,
            'qualificationCertificate': this.dataForm.qualificationCertificate,
            'telephone': this.dataForm.telephone,
            'remark': this.dataForm.remark,
            'driverLicense': this.dataForm.driverLicense
          }
          addDriver(dataForm, methods).then(({data}) => {
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
