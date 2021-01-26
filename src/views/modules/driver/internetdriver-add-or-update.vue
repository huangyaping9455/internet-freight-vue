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
          name="file"
          ref="upload"
          :limit="limit"
          class="upload-demo"
          drag multiple
          action=""
          :data="uploadData"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList"
          :beforeUpload="beforeAVatarUpload"
          :on-exceed="onExceed"
          :onError="uploadError"
          :onSuccess="uploadSuccess"
          :auto-upload="true"
          :http-request="uploadImage">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text" >将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png/jpeg/gif文件，且不超过500kb</div>
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
import { uploadImage } from '@/api/api'

let pic
export default {

  data () {
    return {
      /* 最大允许上传个数 */
      limit: 1,
      fileList: [],
      uploadData: {},
      visible: false,
      dataForm: {
        id: 0,
        driverName: '',
        drivingLicense: '',
        vehicleClass: '',
        issuingOrganizations: '',
        validPeriodFrom: '',
        validPeriodTo: '',
        qualificationCertificate: '',
        telephone: '',
        remark: '',
        driverLicense: '',
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
    } */
      /* 日期 */
      pickerOptions1: {
        disabledDate (time) {
          return time.getTime() > Date.now()
        }
      },
      validPeriodFrom: '',
      validPeriodTo: ''
    }
  },
  methods: {
    init (id) {
      this.dataForm.id = id || 0
      if (this.dataForm.id) {
        this.$http({
          url: this.$http.addUrl('/internetfreight/financials/getOneById'),
          method: 'get',
          params: this.$http.addParams({ id: this.dataForm.id })
        }).then(({ data }) => {
          if (data && data.code === 0) {
            // eslint-disable-next-line no-unused-expressions,no-sequences
            this.dataForm.documentNumber = data.data.documentNumber,
            this.dataForm.sendToProDateTime = data.data.sendToProDateTime,
            this.dataForm.carrier = data.data.carrier,
            this.dataForm.actualCarrierId = data.data.actualCarrierId,
            this.dataForm.vehicleNumber = data.data.vehicleNumber,
            this.dataForm.vehiclePlateColorCode = data.data.vehiclePlateColorCode,
            this.dataForm.qualificationCertificate = data.data.qualificationCertificate,
            this.dataForm.telephone = data.data.telephone,
            this.dataForm.remark = data.data.remark,
            this.dataForm.driverLicense = data.data.driverLicense
          }
        })
      }
      this.visible = true
    },

    // 表单提交
    dataFormSubmit () {
      this.$refs.dataForm.validate((valid) => {
        /* alert(valid)
        const methods = `${!this.dataForm.id ? 'post' : 'put'}`
        if (valid) {
          const dataForm = {
            id: this.dataForm.id || undefined,
            driverName: this.dataForm.driverName,
            drivingLicense: this.dataForm.drivingLicense,
            vehicleClass: this.dataForm.vehicleClass,
            issuingOrganizations: this.dataForm.issuingOrganizations,
            validPeriodFrom: this.dataForm.validPeriodFrom,
            validPeriodTo: this.dataForm.validPeriodTo,
            qualificationCertificate: this.dataForm.qualificationCertificate,
            telephone: this.dataForm.telephone,
            remark: this.dataForm.remark,
            driverLicense: this.dataForm.driverLicense
          }
          // eslint-disable-next-line no-template-curly-in-string
          addDriver(dataForm, methods).then(({ data }) => {
            alert(methods)
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
        } */
        if (valid) {
          this.$http({
            url: this.$http.addUrl(`/internetfreight/internetDrivers${!this.dataForm.id ? '' : '/' + this.dataForm.id}`),
            method: `${!this.dataForm.id ? 'post' : 'put'}`,
            data: this.$http.addData({
              id: this.dataForm.id || undefined,
              driverName: this.dataForm.driverName,
              drivingLicense: this.dataForm.drivingLicense,
              vehicleClass: this.dataForm.vehicleClass,
              issuingOrganizations: this.dataForm.issuingOrganizations,
              validPeriodFrom: this.dataForm.validPeriodFrom,
              validPeriodTo: this.dataForm.validPeriodTo,
              qualificationCertificate: this.dataForm.qualificationCertificate,
              telephone: this.dataForm.telephone,
              remark: this.dataForm.remark,
              driverLicense: this.dataForm.driverLicense
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
    },

    // 当设置了取消自动上传的时候，调用此方法开始上传
    // submitUpload () {
    //   this.$refs.upload.submit()
    // },
    uploadImage (param) {
      const formData = new FormData()
      formData.append(param.filename, param.file)
      console.log(param)
      console.log(formData)
      uploadImage(formData).then(({ data }) => {
        // eslint-disable-next-line no-unused-expressions,no-unused-vars
        pic = 'http://139.155.138.18:8899/group1/M00/00/00/rBsQDmAPh-uABbioAADuDEQPd480.7.jpg'
        console.log(data)
        if (data || data.code === 0) {
          data.driverLicense = pic
          this.$message.success('上传成功')
        }
      })
    },

    handleRemove (file, fileList) {
      alert('移除')
      if (file.status === 'success') {
        this.$http({
          url: this.$http.addUrl('/filesystem/fileFastDFS/delete'),
          method: 'post',
          data: this.$http.addData()
        }).then(({ data }) => {
          this.$message.success('删除图片成功！')
        })
      }
    },
    handlePreview (file) {
      if (file.status === 'success') {
        this.imageVisiable = true
        this.$nextTick(() => {
          this.$refs.showImage.init(file.url)
        })
      }
    },
    onExceed (files, fileList) {
      this.$message.error('提示：只能上传一张图片！')
    },
    // 图片上传
    beforeAVatarUpload (file) {
      if (file.type !== 'image/jpg' && file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/gif') {
        this.$message.error('只支持jpg、png、gif格式的图片！')
        return false
      }
    },
    uploadSuccess (response, file, fileList) {
      this.fileIds = response.fileIds
      console.log('上传图片成功')
    },
    uploadError (response, file, fileList) {
      this.$message.error('上传图片失败！')
    }

  }
}
</script>
