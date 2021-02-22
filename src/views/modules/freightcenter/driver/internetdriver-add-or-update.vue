<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()"
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
      <el-form-item class="demo-image" :style="!dataForm.id ? 'display:none;' : 'display:block;'">
        <img :src="imageURL" style="width: 100px; height: 100px">
      </el-form-item>

      <el-form-item label="驾驶证">
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
          <div class="el-upload__text">上传驾驶证</div>
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
import {uploadImage} from '@/api/api'

export default {
  data() {
    const validatedriverName = (rule, value, callback) => {
      if (!this.dataForm.driverName && !/\S/.test(value)) {
        callback(new Error('驾驶员姓名不能为空'))
      } else {
        callback()
      }
    }
    const validatedrivingLicense = (rule, value, callback) => {
      if (!this.dataForm.drivingLicense && !/\S/.test(value)) {
        callback(new Error('驾驶证编号不能为空'))
      } else {
        callback()
      }
    }
    const validatevehicleClass = (rule, value, callback) => {
      if (!this.dataForm.vehicleClass && !/\S/.test(value)) {
        callback(new Error('准驾车型不能为空'))
      } else {
        callback()
      }
    }
    const validateissuingOrganizations = (rule, value, callback) => {
      if (!this.dataForm.issuingOrganizations && !/\S/.test(value)) {
        callback(new Error('驾驶证发证机关不能为空'))
      } else {
        callback()
      }
    }
    const   validatevalidPeriodFrom = (rule, value, callback) => {
      if (!this.dataForm.validPeriodFrom && !/\S/.test(value)) {
        callback(new Error('驾驶证有效期自不能为空'))
      } else {
        callback()
      }
    }
    const validatevalidPeriodTo = (rule, value, callback) => {
      if (!this.dataForm.validPeriodTo && !/\S/.test(value)) {
        callback(new Error('驾驶证有效期至不能为空'))
      } else {
        callback()
      }
    }
    const validatequalificationCertificate = (rule, value, callback) => {
      if (!this.dataForm.qualificationCertificate && !/\S/.test(value)) {
        callback(new Error('从业资格证号不能为空'))
      } else {
        callback()
      }
    }
    const validatetelephone = (rule, value, callback) => {
      if (!this.dataForm.telephone && !/\S/.test(value)) {
        callback(new Error('手机号码不能为空'))
      } else {
        callback()
      }
    }
        return {
          /* 最大允许上传个数 */
          limit: 1,
          fileList: [],
          uploadData: {},
          driverLicense: '',
          visible: false,
          imageURL: '',
          driverLicenseUrl:'',
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
            delete: 1
          },
          /* 日期 */
          pickerOptions1: {
            disabledDate(time) {
              return time.getTime() > Date.now()
            }
          },
          validPeriodFrom: '',
          validPeriodTo: '',
          dataRule: {
            driverName: [
              {validator: validatedriverName, message: '驾驶员姓名不能为空', trigger: 'blur'}
            ],
            drivingLicense: [
              {validator: validatedrivingLicense, message: '驾驶证编号不能为空', trigger: 'blur'}
            ],
            vehicleClass: [
              {validator: validatevehicleClass, message: '车架类型不能为空', trigger: 'blur'}
            ],
            issuingOrganizations: [
              {validator: validateissuingOrganizations, message: '驾驶证发证机关不能为空', trigger: 'blur'}
            ],
            validPeriodFrom: [
              {validator: validatevalidPeriodFrom, message: '驾驶证有效期自不能为空', trigger: 'blur'}
            ],
            validPeriodTo: [
              {validator: validatevalidPeriodTo, message: '驾驶证有效期至不能为空', trigger: 'blur'}
            ],
            qualificationCertificate: [
              {validator: validatequalificationCertificate, message: '从业资格证号不能为空', trigger: 'blur'}
            ],
            telephone: [
              {validator: validatetelephone, message: '手机号码不能为空', trigger: 'blur'}
            ],
          }
        }
      },
      methods: {
        init(id)
        {
          this.dataForm.id = id || 0
          if (this.dataForm.id) {
            alert(88)
            this.$http({
              url: this.$http.addUrl('/internetfreight/internetOrders/getOneById'),
              method: 'get',
              params: this.$http.addParams({id: this.dataForm.id})
            }).then(({data}) => {
              alert(data)
              if (data && data.code === 0) {
                this.dataForm.driverName = data.data.driverName,
                  this.dataForm.drivingLicense = data.data.drivingLicense,
                  this.dataForm.vehicleClass = data.data.vehicleClass,
                  this.dataForm.issuingOrganizations = data.data.issuingOrganizations,
                  this.dataForm.validPeriodFrom = data.data.validPeriodFrom,
                  this.dataForm.validPeriodTo = data.data.validPeriodTo,
                  this.dataForm.qualificationCertificate = data.data.qualificationCertificate,
                  this.dataForm.telephone = data.data.telephone,
                  this.dataForm.remark = data.data.remark,
                  this.imageURL = 'http://139.155.138.18:8899/' + data.data.driverLicenseUrl,
                  this.driverLicenseUrl = data.data.driverLicenseUrl,
                  this.dataForm.delete = data.data.delete
              }
            })
          }
          this.visible = true
        },
        // 表单提交
        dataFormSubmit()
        {
          this.$refs.dataForm.validate((valid) => {
            console.log(this.driverLicenseUrl);
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
                  driverLicenseUrl: this.driverLicenseUrl,
                  organizationId: this.$store.state.user.organization.id
                })
              }).then(({data}) => {
                console.log(data.driverLicenseUrl);

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
      ,

        // 当设置了取消自动上传的时候，调用此方法开始上传
        // submitUpload () {
        //   this.$refs.upload.submit()
        // },
        uploadImage(param)
        {
          const formData = new FormData()
          formData.append(param.filename, param.file)
          console.log(param)
          console.log(formData)
          uploadImage(formData).then(({data}) => {
            console.log(data)
            if (data || data.code === 0) {
              this.$message.success('上传成功')
            }
          })
        }
      ,

        handleRemove(file, fileList)
        {
          alert('移除')
          if (file.status === 'success') {
            this.$http({
              url: this.$http.addUrl('/filesystem/fileFastDFS/delete'),
              method: 'delete',
              data: this.$http.addData(file)
            }).then(({data}) => {
              this.driverLicense = ' '
              this.$message.success('删除图片成功！')
            })
          }
        }
      ,
        handlePreview(file)
        {
          if (file.status === 'success') {
            this.imageVisiable = true
            this.$nextTick(() => {
              this.$refs.showImage.init(file.url)
            })
          }
        }
      ,
        onExceed(files, fileList)
        {
          this.$message.error('提示：只能上传一张图片！')
        }
      ,
        // 图片上传
        beforeAVatarUpload(file)
        {
          if (file.type !== 'image/jpg' && file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/gif') {
            this.$message.error('只支持jpg、png、gif格式的图片！')
            return false
          }
        }
      ,
        uploadSuccess(response, file, fileList)
        {
          this.fileIds = response.fileIds
          console.log('上传图片成功')
        }
      ,
        uploadError(response, file, fileList)
        {
          this.$message.error('上传图片失败！')
        }

      }
    }
</script>
