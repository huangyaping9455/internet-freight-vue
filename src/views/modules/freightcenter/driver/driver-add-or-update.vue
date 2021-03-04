<template>
  <el-drawer
    :title="!dataForm.id ? '新增' : '修改'"
    :destroy-on-close="true"
    :before-close="handleClose"
    size="50%"
    :visible.sync="visible">
    <el-form :model="dataForm"
             ref="dataForm"
             :rules="dataRule"
             @keyup.enter.native="dataFormSubmit()"
             label-width="160px">
      <el-form-item label="司机姓名" prop="driverName">
        <el-input v-model="dataForm.driverName" placeholder="司机姓名"></el-input>
      </el-form-item>
      <el-form-item label="驾驶证编号" prop="drivingLicense">
        <el-input v-model="dataForm.drivingLicense" placeholder="驾驶证编号"></el-input>
      </el-form-item>
      <el-form-item label="准驾车型" prop="vehicleClass">
        <el-input v-model="dataForm.vehicleClass" placeholder="准驾车型"></el-input>
      </el-form-item>
      <el-form-item label="驾驶证发证机关" prop="issuingOrganizations">
        <el-input v-model="dataForm.issuingOrganizations" placeholder="驾驶证发证机关"></el-input>
      </el-form-item>
      <el-form-item label="驾驶证有效期自" prop="validPeriodFrom">
        <div class="block">
          <el-date-picker
            v-model="dataForm.validPeriodFrom"
            type="date"
            placeholder="选择日期" style="width: 100%">
          </el-date-picker>
        </div>
      </el-form-item>
      <el-form-item label="驾驶证有效期至" prop="validPeriodTo">
        <div class="block">
          <el-date-picker
            v-model="dataForm.validPeriodTo"
            type="date"
            placeholder="选择日期" style="width: 100%">
          </el-date-picker>
        </div>
      </el-form-item>
      <el-form-item label="从业资格证号" prop="qualificationCertificate">
        <el-input v-model="dataForm.qualificationCertificate" placeholder="从业资格证号"></el-input>
      </el-form-item>
      <el-form-item label="手机号码" prop="telephone">
        <el-input v-model="dataForm.telephone" placeholder="手机号码"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input type="textarea" v-model="dataForm.remark" placeholder="备注"></el-input>
      </el-form-item>

      <!--文件上传-->
      <el-divider content-position="left" style="font-weight: bold; font-size: 22px">证件上传</el-divider>

      <el-upload
        action=""
        name="file"
        ref="upload"
        :on-preview="handlePictureCardPreview" 点击文件列表中已上传的文件时的钩子
        :on-remove="handleRemove"
        :http-request="uploadImage"
        :file-list="dataForm.fileList"
        list-type="picture-card">
        <i slot="default" class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl">
      </el-dialog>
    </el-form>
    <el-divider content-position="left" style="font-weight: bold; font-size: 22px"></el-divider>
      <el-button @click="cancel(dataForm)">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit('dataForm')">确定</el-button>

  </el-drawer>
</template>

<script>
import { uploadImage, deleteImage, getDriver } from '@/api/api'

export default {
  data () {
    return {
      limit: 1,
      fileList: [],
      visible: false,
      dialogImageUrl: '',
      dialogVisible: false,
      dataForm: {
        id: 0,
        organizationId: this.$store.state.user.organization.id,
        driverName: '',
        drivingLicense: '',
        vehicleClass: '',
        issuingOrganizations: '',
        validPeriodFrom: '',
        validPeriodTo: '',
        qualificationCertificate: '',
        telephone: '',
        remark: '',
        driverAttachmentURLs: [],
        fileList: [],
        delete: 1
      },
      dataRule: {
        driverName: [
          { required: true, message: '驾驶员姓名不能为空', trigger: 'blur' }
        ],
        drivingLicense: [
          { required: true, message: '身份证号不能为空', trigger: 'blur' }
        ],
        vehicleClass: [
          { required: true, message: '准驾车型不能为空', trigger: 'blur' }
        ],
        issuingOrganizations: [
          { required: true, message: '驾驶证发证机关不能为空', trigger: 'blur' }
        ],
        validPeriodFrom: [
          { required: true, message: '驾驶证有效期自不能为空', trigger: 'blur' }
        ],
        validPeriodTo: [
          { required: true, message: '驾驶证有效期至不能为空', trigger: 'blur' }
        ],
        qualificationCertificate: [
          { required: true, message: '从业资格证号不能为空', trigger: 'blur' }
        ],
        telephone: [
          { required: true, message: '手机号不能为空', trigger: 'blur' }
        ]
      }

    }
  },
  methods: {

    init (id) {
      this.dataForm.id = id || 0
      if (this.dataForm.id) {
        getDriver(this.dataForm.id).then(({ data }) => {
          if (data && data.code === 0) {
            this.dataForm.driverName = data.data.driverName
            this.dataForm.drivingLicense = data.data.drivingLicense
            this.dataForm.vehicleClass = data.data.vehicleClass
            this.dataForm.issuingOrganizations = data.data.issuingOrganizations
            this.dataForm.validPeriodFrom = data.data.validPeriodFrom
            this.dataForm.validPeriodTo = data.data.validPeriodTo
            this.dataForm.qualificationCertificate = data.data.qualificationCertificate
            this.dataForm.telephone = data.data.telephone
            this.dataForm.remark = data.data.remark
            this.dataForm.driverAttachmentURLs = data.data.driverAttachmentURLs

            this.dataForm.fileList = data.data.driverAttachmentURLs.map(item => {
              return { name: item.split('/')[0], url: window.SITE_CONFIG.baseUploadUrl + item }
            })
          }
        })
      }
      this.visible = true
    },
    // 表单提交

    dataFormSubmit (dataForm) {
      this.$refs[dataForm].validate((valid) => {
        if (valid) {
          this.$http({
            url: this.$http.addUrl(`/internetfreight/internetDrivers${!this.dataForm.id ? '' : '/' + this.dataForm.id}`),
            method: `${!this.dataForm.id ? 'post' : 'put'}`,
            data: this.dataForm
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
          }).finally(() => {
            this.$refs.dataForm.resetFields()
          })
        }
      })
    },

    uploadImage (param) {
      const formData = new FormData()
      formData.append(param.filename, param.file)
      uploadImage(formData).then(({ data }) => {
        if (data || data.code === 0) {
          this.dataForm.driverAttachmentURLs.push(data.data)
          this.$message.success('添加成功,请保存更新')
        }
      })
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleRemove (file) {
      const data = { groupName: file.name, fileName: file.url.split('group1/')[1] }
      deleteImage(data).then(({ data }) => {
        if (data || data === 0) {
          this.$message.success('移除成功,请保存更新')
          this.dataForm.driverAttachmentURLs = this.dataForm.driverAttachmentURLs.filter(item => !item.includes(file.url.split('group1/')[1]))
        }
      })
    },
    /**
     * 关闭弹出抽屉
     * @param done
     */
    handleClose (done) {
      this.$refs.dataForm.resetFields()
      this.dataForm.fileList = []
      done()
    },
    /**
     * 取消
     * @param dataForm
     */
    cancel (dataForm) {
      this.$refs.dataForm.resetFields()
      this.dataForm.fileList = []
      this.visible = false
    }

  }
}
</script>
