<template>
  <el-drawer
    :title="!dataForm.id ? '新增' : '修改'"
    :destroy-on-close="true"
    :before-close="handleClose"
    size="50%"
    :visible.sync="visible">
    <div class="demo-drawer__content">
      <el-form :model="dataForm"
               :rules="dataRule"
               ref="dataForm" @keyup.enter.native="dataFormSubmit()"
               label-width="120px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="车辆牌照" prop="vehicleNumber">
              <el-input v-model="dataForm.vehicleNumber" placeholder="车辆牌照号"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="车辆类型" prop="vehicleType">
              <el-select v-model="dataForm.vehicleType" filterable clearable placeholder="车辆类型" style="width: 100%">
                <el-option v-for="(item,index) in this.$enum.getValueDescList('vehicleType')"
                           :label="item.desc"
                           :key="index"
                           :value="item.value">
                </el-option>

              </el-select>
            </el-form-item>
          </el-col>

        </el-row>

        <el-row>

          <el-col :span="12">
            <el-form-item label="挂车牌照" prop="trailerVehiclePlateNumber">
              <el-input v-model="dataForm.trailerVehiclePlateNumber" placeholder="挂车牌照号"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="车牌颜色" prop="vehiclePlateColorCode">
              <el-select v-model="dataForm.vehiclePlateColorCode" filterable clearable placeholder="请选车牌颜色"
                         style="width: 100%">
                <el-option v-for="(item,index) in this.$enum.getValueDescList('vehiclePlateColorCode')"
                           :label="item.desc"
                           :key="index"
                           :value="item.value">
                </el-option>

              </el-select>
            </el-form-item>
          </el-col>

        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="识别代码" prop="vin">
              <el-input v-model="dataForm.vin" placeholder="车辆识别代码"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="能源类型" prop="vehicleEnergyType">
              <el-select v-model="dataForm.vehicleEnergyType" filterable clearable placeholder="车辆能源类型"
                         style="width: 100%">
                <el-option v-for="(item,index) in this.$enum.getValueDescList('vehicleEnergyType')"
                           :label="item.desc"
                           :key="index"
                           :value="item.value">
                </el-option>

              </el-select>
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
            <el-form-item label="道路运输证" prop="roadTransportCertificateNumber">
              <el-input type="number" v-model="dataForm.roadTransportCertificateNumber" placeholder="道路运输证号"></el-input>
            </el-form-item>
          </el-col>

        </el-row>

        <el-row>

          <el-col :span="12">
            <el-form-item label="总质量(吨)" prop="grossMass">
              <el-input type="number" v-model="dataForm.grossMass" placeholder="总质量单位(吨)"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="核定载质量(吨)" prop="vehicleTonnage">
              <el-input type="number" v-model="dataForm.vehicleTonnage" placeholder="核定载质量单位(吨)"></el-input>
            </el-form-item>
          </el-col>

        </el-row>

        <el-row>

          <el-col :span="12">
            <el-form-item label="注册日期" prop="registerDate">
              <el-date-picker type="date" placeholder="注册日期" v-model="dataForm.registerDate"
                              style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="发证日期" prop="issueDate">

              <el-date-picker type="date" placeholder="发证日期" v-model="dataForm.issueDate"
                              style="width: 100%;"></el-date-picker>

            </el-form-item>
          </el-col>

        </el-row>
        <el-row>

          <el-col :span="24">
            <el-form-item label="车辆所有" prop="owner">
              <!--              <el-input v-model="dataForm.owner" placeholder="所有人"></el-input>-->
              <el-radio-group v-model="dataForm.owner" size="medium" style="width:100%">
                <el-radio label="公司" border>公司</el-radio>
                <el-radio label="挂靠" border>挂靠</el-radio>
                <el-radio label="其他" border>其他</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="使用性质" prop="useCharacter">
              <el-radio-group v-model="dataForm.useCharacter" size="medium">
                <el-radio label="营运" border>营运</el-radio>
                <el-radio label="非营运" border>非营运</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>

        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item label="备注" prop="remark">
              <el-input type="textarea" v-model="dataForm.remark" placeholder="备注"></el-input>
            </el-form-item>
          </el-col>

        </el-row>
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
    </div>
    <el-divider content-position="left"></el-divider>

    <div class="el-footer">
      <el-button @click="cancel(dataForm)">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit('dataForm')">保存</el-button>
    </div>

  </el-drawer>
</template>
<script>
import { uploadImage, deleteImage, getCar, addCar, updateCar } from '@/api/api'

export default {
  data () {
    return {
      fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
      limit: 1,
      visible: false,
      dialogImageUrl: '',
      dialogVisible: false,
      dataForm: {
        id: 0,
        organizationId: this.$store.state.user.organization.id,
        vehicleNumber: '',
        vehiclePlateColorCode: '',
        vehicleType: '',
        owner: '',
        useCharacter: '',
        vin: '',
        issuingOrganizations: '',
        registerDate: '',
        issueDate: '',
        vehicleEnergyType: '',
        vehicleTonnage: '',
        grossMass: '',
        roadTransportCertificateNumber: '',
        trailerVehiclePlateNumber: '',
        remark: '',
        delete: 1,
        carAttachmentURLs: [],
        fileList: []
      },
      dataRule: {
        vehicleNumber: [
          { required: true, message: '车牌号不能为空', trigger: 'blur' }
        ],
        owner: [
          { required: true, message: '所有人不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    uploadImage (param) {
      const formData = new FormData()
      formData.append(param.filename, param.file)
      uploadImage(formData).then(({ data }) => {
        if (data || data.code === 0) {
          this.dataForm.carAttachmentURLs.push(data.data)
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
          this.dataForm.carAttachmentURLs = this.dataForm.carAttachmentURLs.filter(item => !item.includes(file.url.split('group1/')[1]))
        }
      })
    },

    init (id) {
      this.dataForm.id = id || 0
      if (this.dataForm.id) {
        getCar(this.dataForm.id).then(({ data }) => {
          if (data && data.code === 0) {
            this.dataForm.vehicleNumber = data.data.vehicleNumber
            this.dataForm.vehiclePlateColorCode = data.data.vehiclePlateColorCode
            this.dataForm.vehicleType = data.data.vehicleType
            this.dataForm.owner = data.data.owner
            this.dataForm.useCharacter = data.data.useCharacter
            this.dataForm.vin = data.data.vin
            this.dataForm.issuingOrganizations = data.data.issuingOrganizations
            this.dataForm.registerDate = data.data.registerDate
            this.dataForm.issueDate = data.data.issueDate
            this.dataForm.vehicleEnergyType = data.data.vehicleEnergyType
            this.dataForm.vehicleTonnage = data.data.vehicleTonnage
            this.dataForm.grossMass = data.data.grossMass
            this.dataForm.roadTransportCertificateNumber = data.data.roadTransportCertificateNumber
            this.dataForm.trailerVehiclePlateNumber = data.data.trailerVehiclePlateNumber
            this.dataForm.fileList = data.data.carAttachmentURLs.map(item => {
              return { name: item.split('/')[0], url: window.SITE_CONFIG.baseUploadUrl + item }
            })
            this.dataForm.remark = data.data.remark
            this.dataForm.carAttachmentURLs = data.data.carAttachmentURLs
          }
        })
      }

      this.visible = true
    },
    // 表单提交
    dataFormSubmit (dataForm) {
      this.$refs[dataForm].validate((valid) => {
        if (valid) {
          (!this.dataForm.id
            ? addCar(this.dataForm)
            : updateCar(this.dataForm.id, this.dataForm))
            .then(({ data }) => {
              if (data && data.code === 0) {
                this.$message({
                  message: '操作成功',
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    this.visible = false
                    this.dataForm.fileList = []
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
