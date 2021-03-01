<template>
  <el-drawer
    :title="!dataForm.id ? '新增' : '修改'"
    :destroy-on-close="true"
    :before-close="handleClose"
    size="40%"
    :visible.sync="visible">
    <div class="demo-drawer__content">
      <el-form :model="dataForm"
               :rules="dataRule"
               ref="dataForm" @keyup.enter.native="dataFormSubmit()"
               label-width="120px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="车辆牌照" prop="vehicleNumber">
              <el-input v-model="dataForm.vehicleNumber" placeholder="车辆牌照号"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="车辆类型" prop="vehicleType">
              <el-select v-model="dataForm.vehicleType" filterable clearable placeholder="车辆类型" style="width: 100%">
                <el-option  v-for="(item,index) in this.$enum.getValueDescList('vehicleType')"
                            :label="item.desc"
                            :key="index"
                            :value="item.value">
                </el-option>

              </el-select>
            </el-form-item>
          </el-col>

        </el-row>

        <el-row>

          <el-col :span="24">
            <el-form-item label="挂车牌照" prop="trailerVehiclePlateNumber">
              <el-input v-model="dataForm.trailerVehiclePlateNumber" placeholder="挂车牌照号"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="车牌颜色" prop="vehiclePlateColorCode">
              <el-select v-model="dataForm.vehiclePlateColorCode" filterable clearable placeholder="请选车牌颜色" style="width: 100%">
                <el-option  v-for="(item,index) in this.$enum.getValueDescList('vehiclePlateColorCode')"
                            :label="item.desc"
                            :key="index"
                            :value="item.value">
                </el-option>

              </el-select>
            </el-form-item>
          </el-col>

        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item label="识别代码" prop="vin">
              <el-input v-model="dataForm.vin" placeholder="车辆识别代码"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="能源类型" prop="vehicleEnergyType">
              <!--              <el-input v-model="dataForm.vehicleEnergyType" placeholder="车辆能源类型"></el-input>-->
              <el-select v-model="dataForm.vehicleEnergyType" filterable clearable placeholder="车辆能源类型" style="width: 100%">
                <el-option  v-for="(item,index) in this.$enum.getValueDescList('vehicleEnergyType')"
                            :label="item.desc"
                            :key="index"
                            :value="item.value">
                </el-option>

              </el-select>
            </el-form-item>
          </el-col>

        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item label="发证机关" prop="issuingOrganizations">
              <el-input v-model="dataForm.issuingOrganizations" placeholder="发证机关"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="道路运输证" prop="roadTransportCertificateNumber">
              <el-input v-model="dataForm.roadTransportCertificateNumber" placeholder="道路运输证号"></el-input>
            </el-form-item>
          </el-col>

        </el-row>

        <el-row>

          <el-col :span="24">
            <el-form-item label="总质量" prop="grossMass">
              <el-input v-model="dataForm.grossMass" placeholder="总质量"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="核定载质量" prop="vehicleTonnage">
              <el-input v-model="dataForm.vehicleTonnage" placeholder="核定载质量"></el-input>
            </el-form-item>
          </el-col>

        </el-row>

        <el-row>

          <el-col :span="24">
            <el-form-item label="注册日期" prop="registerDate">
              <el-date-picker type="date" placeholder="注册日期" v-model="dataForm.registerDate"
                              style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="24">
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
              <el-radio-group v-model="dataForm.owner" size="medium" style="width:100%" >
                <el-radio label="公司" border>公司</el-radio>
                <el-radio label="挂靠" border>挂靠</el-radio>
                <el-radio label="其他" border>其他</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="使用性质" prop="useCharacter">
              <el-radio-group v-model="dataForm.useCharacter" size="medium">
                <el-radio label="营运"  border>营运</el-radio>
                <el-radio label="非营运"  border>非营运</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>

        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item label="备注" prop="remark">
              <el-input  type="textarea" v-model="dataForm.remark" placeholder="备注"></el-input>
            </el-form-item>
          </el-col>

        </el-row>
        <!--文件上传-->
        <el-divider content-position="left" style="font-weight: bold; font-size: 22px">证件上传</el-divider>

        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"

          :file-list="fileList"
          list-type="picture-card">
          <i slot="default" class="el-icon-plus"></i>
        </el-upload>

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
import { uploadImage } from '@/api/api'

export default {
  data () {
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
        console.log('==---' + data)
        if (data || data.code === 0) {
          console.log(data.data)
          this.drivingPermit = data.data

          this.$message.success('上传成功')
        }
      })
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
    dataFormSubmit (dataForm) {
      this.$refs[dataForm].validate((valid) => {
        if (valid) {
          this.$http({
            url: this.$http.addUrl(`/internetfreight/internetCars${!this.dataForm.id ? '' : '/' + this.dataForm.id}`),
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
      done()
    },
    /**
     * 取消
     * @param dataForm
     */
    cancel (dataForm) {
      this.$refs.dataForm.resetFields()
      this.visible = false
    }

  }
}
</script>
