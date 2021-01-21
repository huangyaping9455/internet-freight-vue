<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()"
             label-width="120px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="原始单号" prop="originalDocumentNumber">
            <el-input v-model="dataForm.originalDocumentNumber" placeholder="原始单号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="托运单号" prop="shippingNoteNumber">
            <el-input v-model="dataForm.shippingNoteNumber" placeholder="托运单号"></el-input>
          </el-form-item>
        </el-col>
      </el-row>


      <el-row>
        <el-col :span="12">
          <el-form-item label="分段分单号" prop="serialNumber">
            <el-input v-model="dataForm.serialNumber" placeholder="分段分单号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="运输总车辆数" prop="vehicleAmount">
            <el-input v-model="dataForm.vehicleAmount" placeholder="运输总车辆数"></el-input>
          </el-form-item>
        </el-col>
      </el-row>


      <el-row>
        <el-col :span="12">
          <el-form-item label="运输组织类型代码" prop="transportTypeCode">
            <el-input v-model="dataForm.transportTypeCode" placeholder="运输组织类型代码"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="网络货运经营者名称" prop="carrier">
            <el-input v-model="dataForm.carrier" placeholder="网络货运经营者名称"></el-input>
          </el-form-item>
        </el-col>
      </el-row>


      <el-row>
        <el-col :span="12">
          <el-form-item label="统一社会信用代码" prop="unifiedSocialCreditIdentifier">
            <el-input v-model="dataForm.unifiedSocialCreditIdentifier" placeholder="统一社会信用代码"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="运单上传时间">
            <el-col :span="35">
              <el-date-picker type="date" placeholder="运单上传时间" v-model="dataForm.sendToProDateTime"
                              style="width: 100%;"></el-date-picker>
            </el-col>
          </el-form-item>
        </el-col>
      </el-row>


      <el-row>
        <el-col :span="12">
          <el-form-item label="运单生成时间">
            <el-col :span="35">
              <el-date-picker type="date" placeholder="运单生成时间" v-model="dataForm.consignmentDateTime"
                              style="width: 100%;"></el-date-picker>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="发货日期时间">
            <el-col :span="35">
              <el-date-picker type="date" placeholder="发货日期时间" v-model="dataForm.despatchActualDateTime"
                              style="width: 100%;"></el-date-picker>
            </el-col>
          </el-form-item>
        </el-col>
      </el-row>


      <el-row>
        <el-col :span="12">
          <el-form-item label="收货日期时间">
            <el-col :span="35">
              <el-date-picker type="date" placeholder="收货日期时间" v-model="dataForm.goodsReceiptDateTime"
                              style="width: 100%;"></el-date-picker>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="道路运输经营许可证编号" prop="permitNumber">
            <el-input v-model="dataForm.permitNumber" placeholder="道路运输经营许可证编号"></el-input>
          </el-form-item>
        </el-col>
      </el-row>


      <el-row>
        <el-col :span="12">
          <el-form-item label="业务类型代码" prop="businessTypeCode">
            <el-input v-model="dataForm.businessTypeCode" placeholder="业务类型代码"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="运费金额" prop="totalMonetaryAmount">
            <el-input v-model="dataForm.totalMonetaryAmount" placeholder="运费金额"></el-input>
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
    let validateVehicleNumber = (rule, value, callback) => {
      if (!this.dataForm.vehicleNumber && !/\S/.test(value)) {
        callback(new Error('车牌号不能为空'))
      } else {
        callback()
      }
    }
    let validateOwner = (rule, value, callback) => {
      if (!this.dataForm.owner && !/\S/.test(value)) {
        callback(new Error('所有人不能为空'))
      } else {
        callback()
      }
    }
    return {
      visible: false,
      //roleList: [],
      dataForm: {
        id: 0,
        originalDocumentNumber: '',
        shippingNoteNumber: '',
        serialNumber: '',
        vehicleAmount: '',
        transportTypeCode: '',
        sendToProDateTime: '',
        carrier: '',
        unifiedSocialCreditIdentifier: '',
        permitNumber: '',
        consignmentDateTime: '',
        businessTypeCode: '',
        despatchActualDateTime: '',
        goodsReceiptDateTime: '',
        totalMonetaryAmount: '',
        remark: '',
        delete: 1
      },
      dataRule: {
        vehicleNumber: [
          {validator: validateVehicleNumber, message: '车牌号不能为空', trigger: 'blur'}
        ],
        owner: [
          {validator: validateOwner, message: '所有人不能为空', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    init(id) {
      this.dataForm.id = id || 0




      if (this.dataForm.id) {
        this.$http({
          url: this.$http.addUrl(`/internetfreight/internetOrders/getOneById`),
          method: 'get',
          params: this.$http.addParams({id: this.dataForm.id})
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.dataForm.originalDocumentNumber = data.data.originalDocumentNumber
            this.dataForm.shippingNoteNumber = data.data.shippingNoteNumber
            this.dataForm.serialNumber = data.data.serialNumber
            this.dataForm.vehicleAmount = data.data.vehicleAmount
            this.dataForm.transportTypeCode = data.data.transportTypeCode
            this.dataForm.sendToProDateTime = data.data.sendToProDateTime
            this.dataForm.carrier = data.data.carrier
            this.dataForm.unifiedSocialCreditIdentifier = data.data.unifiedSocialCreditIdentifier
            this.dataForm.permitNumber = data.data.permitNumber
            this.dataForm.consignmentDateTime = data.data.consignmentDateTime
            this.dataForm.businessTypeCode = data.data.businessTypeCode
            this.dataForm.despatchActualDateTime = data.data.despatchActualDateTime
            this.dataForm.goodsReceiptDateTime = data.data.goodsReceiptDateTime
            this.dataForm.totalMonetaryAmount = data.data.totalMonetaryAmount
            this.dataForm.remark = data.data.remark
          }
        })
      }

      this.visible = true

    },
    // 表单提交
    dataFormSubmit() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.$http({
            url: this.$http.addUrl(`/internetfreight/internetOrders${!this.dataForm.id ? '' : '/' + this.dataForm.id}`),
            method: `${!this.dataForm.id ? 'post' : 'put'}`,
            data: this.$http.addData({
              'id': this.dataForm.id || undefined,
              'originalDocumentNumber': this.dataForm.originalDocumentNumber,
              'shippingNoteNumber': this.dataForm.shippingNoteNumber,
              'serialNumber': this.dataForm.serialNumber,
              'vehicleAmount': this.dataForm.vehicleAmount,
              'transportTypeCode': this.dataForm.transportTypeCode,
              'sendToProDateTime': this.dataForm.sendToProDateTime,
              'carrier': this.dataForm.carrier,
              'unifiedSocialCreditIdentifier': this.dataForm.unifiedSocialCreditIdentifier,
              'permitNumber': this.dataForm.permitNumber,
              'consignmentDateTime': this.dataForm.consignmentDateTime,
              'businessTypeCode': this.dataForm.businessTypeCode,
              'despatchActualDateTime': this.dataForm.despatchActualDateTime,
              'goodsReceiptDateTime': this.dataForm.goodsReceiptDateTime,
              'totalMonetaryAmount': this.dataForm.totalMonetaryAmount,
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
