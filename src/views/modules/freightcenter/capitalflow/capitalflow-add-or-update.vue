<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <!--   :rules="dataRule"-->
    <el-form :model="dataForm" ref="dataForm" @keyup.enter.native="dataFormSubmit()"
             label-width="160px">
      <el-form-item label="单证号" prop="documentNumber" :class="{ 'is-required': !dataForm.documentNumber }">
        <el-input v-model="dataForm.documentNumber" placeholder="单证号"></el-input>
      </el-form-item>
      <el-form-item label="资金流水单上传到省级监测系统的时间" prop="sendToProDateTime"
                    :class="{ 'is-required': !dataForm.sendToProDateTime }">
        <div class="block">
          <el-date-picker
            v-model="dataForm.sendToProDateTime"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </div>
      </el-form-item>
      <el-form-item label="实际承运人名称" prop="carrier" :class="{ 'is-required': !dataForm.carrier }">
        <el-input v-model="dataForm.carrier" placeholder="实际承运人名称"></el-input>
      </el-form-item>
      <el-form-item label="实际承运人统一社会信用代码或证件号码" prop="actualCarrierId"
                    :class="{ 'is-required': !dataForm.actualCarrierId }">
        <el-input v-model="dataForm.actualCarrierId" placeholder="实际承运人统一社会信用代码或证件号码"></el-input>
      </el-form-item>
      <el-form-item label="车辆牌照号" prop="vehicleNumber"
                    :class="{ 'is-required': !dataForm.vehicleNumber }">
        <el-input v-model="dataForm.vehicleNumber" placeholder="车辆牌照号"></el-input>
      </el-form-item>
      <el-form-item label="车牌颜色代码" prop="vehiclePlateColorCode"
                    :class="{ 'is-required': !dataForm.vehiclePlateColorCode }">
        <el-input v-model="dataForm.vehiclePlateColorCode" placeholder="车牌颜色代码"></el-input>
      </el-form-item>
      <el-form-item label="托运单号" prop="shippingNoteNumber" :class="{ 'is-required': !dataForm.shippingNoteNumber }">
        <el-input v-model="dataForm.shippingNoteNumber" placeholder="托运单号"></el-input>
      </el-form-item>
      <el-form-item label="分段分单号" prop="serialNumber" :class="{ 'is-required': !dataForm.serialNumber }">
        <el-input v-model="dataForm.serialNumber" placeholder="分段分单号"></el-input>
      </el-form-item>
      <el-form-item label="付款方式代码" prop="paymentMeansCode" :class="{ 'is-required': !dataForm.paymentMeansCode }">
        <el-input v-model="dataForm.paymentMeansCode" placeholder="付款方式代码"></el-input>
      </el-form-item>
      <el-form-item label="收款方名称" prop="recipient" :class="{ 'is-required': !dataForm.recipient }">
        <el-input v-model="dataForm.recipient" placeholder="收款方名称"></el-input>
      </el-form-item>
      <el-form-item label="收款帐户信息" prop="receiptAccount" :class="{ 'is-required': !dataForm.receiptAccount }">
        <el-input v-model="dataForm.receiptAccount" placeholder="收款帐户信息"></el-input>
      </el-form-item>
      <el-form-item label="收款方银行代码" prop="bankCode" :class="{ 'is-required': !dataForm.bankCode }">
        <el-input v-model="dataForm.bankCode" placeholder="收款方银行代码"></el-input>
      </el-form-item>
      <el-form-item label="流水号/序列号" prop="sequenceCode" :class="{ 'is-required': !dataForm.sequenceCode }">
        <el-input v-model="dataForm.sequenceCode" placeholder="流水号/序列号"></el-input>
      </el-form-item>
      <el-form-item label="实际支付金额" prop="monetaryAmount" :class="{ 'is-required': !dataForm.monetaryAmount }">
        <el-input v-model="dataForm.monetaryAmount" placeholder="实际支付金额"></el-input>
      </el-form-item>
      <el-form-item label="日期时间" prop="dateTime" :class="{ 'is-required': !dataForm.dateTime }">
        <div class="block">
          <el-date-picker
            v-model="dataForm.dateTime"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </div>
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
import {} from '@/api/api'

export default {
  data() {
    return {
      visible: false,
      roleList: [],
      dataForm: {
        id: 0,
        documentNumber: '',
        sendToProDateTime: '',
        carrier: '',
        actualCarrierId: '',
        vehicleNumber: '',
        vehiclePlateColorCode: '',
        remark: '',
        delete: 1
      },
      /* 日期 */
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      },
      sendToProDateTime: '',
      dateTime: ''

    }
  },
  methods: {
    init(id) {
      this.dataForm.id = id || 0
      if (this.dataForm.id) {
        this.$http({
          url: this.$http.addUrl('/internetfreight/financials/getOneById'),
          method: 'get',
          params: this.$http.addParams({id: this.dataForm.id})
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.dataForm.documentNumber = data.data.documentNumber,
              this.dataForm.sendToProDateTime = data.data.sendToProDateTime,
              this.dataForm.carrier = data.data.carrier,
              this.dataForm.actualCarrierId = data.data.actualCarrierId,
              this.dataForm.vehicleNumber = data.data.vehicleNumber,
              this.dataForm.vehiclePlateColorCode = data.data.vehiclePlateColorCode,
              this.dataForm.remark = data.data.remark,
              this.dataForm.delete = data.data.delete
          }
        })
      }
      this.visible = true
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs.dataForm.validate((valid) => {
        /*  const methods = `${!this.dataForm.id ? 'post' : 'put'}`
          if (valid) {
            alert(methods)
            const dataForm = {
              id: this.dataForm.id || undefined,
              documentNumber: this.dataForm.documentNumber,
              sendToProDateTime: this.dataForm.sendToProDateTime,
              carrier: this.dataForm.carrier,
              actualCarrierId: this.dataForm.actualCarrierId,
              vehicleNumber: this.dataForm.vehicleNumber,
              vehiclePlateColorCode: this.dataForm.vehiclePlateColorCode,
              remark: this.dataForm.remark
            }
            addFinancial(dataForm, methods).then(({ data }) => {
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
            url: this.$http.addUrl(`/internetfreight/financials${!this.dataForm.id ? '' : '/' + this.dataForm.id}`),
            method: `${!this.dataForm.id ? 'post' : 'put'}`,
            data: this.$http.addData({
              id: this.dataForm.id || undefined,
              documentNumber: this.dataForm.documentNumber,
              sendToProDateTime: this.dataForm.sendToProDateTime,
              carrier: this.dataForm.carrier,
              actualCarrierId: this.dataForm.actualCarrierId,
              vehicleNumber: this.dataForm.vehicleNumber,
              vehiclePlateColorCode: this.dataForm.vehiclePlateColorCode,
              remark: this.dataForm.remark,
              organizationId: this.$store.state.user.organization.id
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
