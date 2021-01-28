<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()"
             label-width="120px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="车辆牌照号" prop="vehicleNumber">
            <el-input v-model="dataForm.vehicleNumber" placeholder="车辆牌照号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="车牌颜色代码" prop="vehiclePlateColorCode">
            <el-input v-model="dataForm.vehiclePlateColorCode" placeholder="车牌颜色代码"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="车辆类型代码" prop="vehicleType">
            <el-input v-model="dataForm.vehicleType" placeholder="车辆类型代码"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="所有人" prop="owner">
            <el-input v-model="dataForm.owner" placeholder="所有人"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="使用性质" prop="useCharacter">
            <el-input v-model="dataForm.useCharacter" placeholder="使用性质"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="车辆识别代号" prop="vin">
            <el-input v-model="dataForm.vin" placeholder="车辆识别代号"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="发证机关" prop="issuingOrganizations">
            <el-input v-model="dataForm.issuingOrganizations" placeholder="发证机关"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="注册日期">
            <el-col :span="35">
              <el-date-picker type="date" placeholder="注册日期" v-model="dataForm.registerDate"
                              style="width: 100%;"></el-date-picker>
            </el-col>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="发证日期">
            <el-col :span="35">
              <el-date-picker type="date" placeholder="发证日期" v-model="dataForm.issueDate"
                              style="width: 100%;"></el-date-picker>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="车辆能源类型" prop="vehicleEnergyType">
            <el-input v-model="dataForm.vehicleEnergyType" placeholder="车辆能源类型"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="核定载质量" prop="vehicleTonnage">
            <el-input v-model="dataForm.vehicleTonnage" placeholder="核定载质量"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="总质量" prop="grossMass">
            <el-input v-model="dataForm.grossMass" placeholder="总质量"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="道路运输证号" prop="roadTransportCertificateNumber">
            <el-input v-model="dataForm.roadTransportCertificateNumber" placeholder="道路运输证号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="挂车牌照号" prop="trailerVehiclePlateNumber">
            <el-input v-model="dataForm.trailerVehiclePlateNumber" placeholder="挂车牌照号"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="备注" prop="remark">
            <el-input v-model="dataForm.remark" placeholder="备注"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <div class="demo-image" :style="!dataForm.id ? 'display:none;' : 'display:block;'">
          <img :src="imageURL"  style="width: 100px; height: 100px">
<!--          <div class="block" v-for="fit in fits" :key="fit">
            <span class="demonstration">{{ fit }}</span>
            <el-image
              style="width: 100px; height: 100px"
              :src="drivingPermit"
              :fit="fit"></el-image>
          </div>-->
        </div>
      </el-row>

      <el-row>
        <div :style="!dataForm.id ? 'display:block;' : 'display:none;'">
          <el-upload drag multiple
                     name="file"
                     ref="upload"
                     :limit="limit"
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
            <div class="el-upload__text">请上传行车证</div>
            <div class="el-upload__tip" slot="tip">只能上传'jpg/png/jpeg/gif'</div>
          </el-upload>
        </div>
      </el-row>
<!--      <el-row>
        <div>
          <el-upload drag multiple
                     name="file"
                     ref="upload"
                     :limit="limit"
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
            <div class="el-upload__text">请上传驾驶证</div>
            <div class="el-upload__tip" slot="tip">只能上传'jpg/png/jpeg/gif'</div>
          </el-upload>
        </div>
      </el-row>-->

    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { uploadImage } from '@/api/api'

export default {
  data () {
    const validateVehicleNumber = (rule, value, callback) => {
      if (!this.dataForm.vehicleNumber && !/\S/.test(value)) {
        callback(new Error('车牌号不能为空'))
      } else {
        callback()
      }
    }
    const validateOwner = (rule, value, callback) => {
      if (!this.dataForm.owner && !/\S/.test(value)) {
        callback(new Error('所有人不能为空'))
      } else {
        callback()
      }
    }
    return {
      fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
      imageURL: '',
      drivingPermit: '',
      driverLicense: '',
      limit: 1,
      fileList: [],
      uploadData: {},
      visible: false,
      // roleList: [],
      dataForm: {
        id: 0,
        vehicleNumber: '',
        vehiclePlateColorCode: '',
        vehicleType: '',
        owner: '',
        useCharacter: '',
        VIN: '',
        issuingOrganizations: '',
        registerDate: '',
        issueDate: '',
        vehicleEnergyType: '',
        vehicleTonnage: '',
        grossMass: '',
        roadTransportCertificateNumber: '',
        trailerVehiclePlateNumber: '',
        remark: '',
        delete: 1
      },
      dataRule: {
        vehicleNumber: [
          { validator: validateVehicleNumber, message: '车牌号不能为空', trigger: 'blur' }
        ],
        owner: [
          { validator: validateOwner, message: '所有人不能为空', trigger: 'blur' }
        ]
      }
    }
  },

  methods: {
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
        console.log('==---' + data)
        if (data || data.code === 0) {
          console.log(data.data)
          this.drivingPermit = data.data

          this.$message.success('上传成功')
        }
      })
    },

    handleRemove (file, fileList) {
      alert(this.drivingPermit)
      if (file.status === 'ready') {
        file = this.drivingPermit
        this.$http({
          url: this.$http.addUrl('/filesystem/fileFastDFS/delete'),
          method: 'post',
          data: this.$http.addData(file)
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
    },
    init (id) {
      this.dataForm.id = id || 0

      if (this.dataForm.id) {
        this.$http({
          url: this.$http.addUrl('/internetfreight/internetCars/getOneById'),
          method: 'get',
          params: this.$http.addParams({ id: this.dataForm.id })
        }).then(({ data }) => {
          if (data && data.code === 0) {
            this.dataForm.vehicleNumber = data.data.vehicleNumber
            this.dataForm.vehiclePlateColorCode = data.data.vehiclePlateColorCode
            this.dataForm.vehicleType = data.data.vehicleType
            this.dataForm.owner = data.data.owner
            this.dataForm.useCharacter = data.data.useCharacter
            this.dataForm.VIN = data.data.VIN
            this.dataForm.issuingOrganizations = data.data.issuingOrganizations
            this.dataForm.registerDate = data.data.registerDate
            this.dataForm.issueDate = data.data.issueDate
            this.dataForm.vehicleEnergyType = data.data.vehicleEnergyType
            this.dataForm.vehicleTonnage = data.data.vehicleTonnage
            this.dataForm.grossMass = data.data.grossMass
            this.dataForm.roadTransportCertificateNumber = data.data.roadTransportCertificateNumber
            this.dataForm.trailerVehiclePlateNumber = data.data.trailerVehiclePlateNumber
            this.imageURL = 'http://139.155.138.18:8899/' + data.data.drivingPermit
            this.drivingPermit = data.data.drivingPermit
            this.driverLicense = data.data.driverLicense
            this.dataForm.remark = data.data.remark
          }
        })
      }

      this.visible = true
    },
    // 表单提交
    dataFormSubmit () {
      this.$refs.dataForm.validate((valid) => {
        if (valid) {
          this.$http({
            url: this.$http.addUrl(`/internetfreight/internetCars${!this.dataForm.id ? '' : '/' + this.dataForm.id}`),
            method: `${!this.dataForm.id ? 'post' : 'put'}`,
            data: this.$http.addData({
              id: this.dataForm.id || undefined,
              vehicleNumber: this.dataForm.vehicleNumber,
              vehiclePlateColorCode: this.dataForm.vehiclePlateColorCode,
              vehicleType: this.dataForm.vehicleType,
              owner: this.dataForm.owner,
              useCharacter: this.dataForm.useCharacter,
              vin: this.dataForm.vin,
              issuingOrganizations: this.dataForm.issuingOrganizations,
              registerDate: this.dataForm.registerDate,
              issueDate: this.dataForm.issueDate,
              vehicleEnergyType: this.dataForm.vehicleEnergyType,
              vehicleTonnage: this.dataForm.vehicleTonnage,
              grossMass: this.dataForm.grossMass,
              roadTransportCertificateNumber: this.dataForm.roadTransportCertificateNumber,
              trailerVehiclePlateNumber: this.dataForm.trailerVehiclePlateNumber,
              drivingPermit: this.drivingPermit,
              driverLicense: this.driverLicense,
              remark: this.dataForm.remark
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
