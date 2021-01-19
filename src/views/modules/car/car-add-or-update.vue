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
        <el-col :span="11">
          <el-date-picker type="date" placeholder="注册日期" v-model="dataForm.registerDate"
                          style="width: 100%;"></el-date-picker>
        </el-col>
      </el-form-item>
                </el-col>
              </el-row>


                  <el-row>
                    <el-col :span="12">
      <el-form-item label="发证日期">
        <el-col :span="11">
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
      //roleList: [],
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




      if (this.dataForm.id) {
        this.$http({
          url: this.$http.addUrl(`/internetfreight/internetCars/getOneById`),
          method: 'get',
          params: this.$http.addParams({id: this.dataForm.id})
        }).then(({data}) => {
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
            this.dataForm.remark = data.data.remark
          }
        })
      }

      this.visible = true




      /*if (this.dataForm.id) {
        this.$http({
          url: this.$http.addUrl(`/internetfreight/internetCars/getOneById`),
          method: 'get',
          params: this.$http.addParams({id: this.dataForm.id})
        }).then(({data}) => {
          this.visible = true
          this.$nextTick(() => {
            this.$refs['dataForm'].resetFields()
          })
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
            this.dataForm.remark = data.data.remark

          }
        })
      }
      this.visible = true*/
    },
    // 表单提交
    dataFormSubmit() {
      alert(this.dataForm.id);
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.$http({
            url: this.$http.addUrl(`/internetfreight/internetCars${!this.dataForm.id ? '' : '/' + this.dataForm.id}`),
            method: `${!this.dataForm.id ? 'post' : 'put'}`,
            data: this.$http.addData({
              'id': this.dataForm.id || undefined,
              'vehicleNumber': this.dataForm.vehicleNumber,
              'vehiclePlateColorCode': this.dataForm.vehiclePlateColorCode,
              'vehicleType': this.dataForm.vehicleType,
              'owner': this.dataForm.owner,
              'useCharacter': this.dataForm.useCharacter,
              'vin': this.dataForm.vin,
              'issuingOrganizations': this.dataForm.issuingOrganizations,
              'registerDate': this.dataForm.registerDate,
              'issueDate': this.dataForm.issueDate,
              'vehicleEnergyType': this.dataForm.vehicleEnergyType,
              'vehicleTonnage': this.dataForm.vehicleTonnage,
              'grossMass': this.dataForm.grossMass,
              'roadTransportCertificateNumber': this.dataForm.roadTransportCertificateNumber,
              'trailerVehiclePlateNumber': this.dataForm.trailerVehiclePlateNumber,
              'remark': this.dataForm.remark

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
