<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
<!--   :rules="dataRule"-->
    <el-form :model="dataForm"  ref="dataForm" @keyup.enter.native="dataFormSubmit()"
             label-width="160px">
      <el-form-item label="单证号" prop="documentNumber" :class="{ 'is-required': !dataForm.documentNumber }">
        <el-input v-model="dataForm.documentNumber" placeholder="单证号"></el-input>
      </el-form-item>
      <el-form-item label="资金流水单上传到省级监测系统的时间" prop="sendToProDateTime" :class="{ 'is-required': !dataForm.sendToProDateTime }">
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
      <el-form-item label="实际承运人统一社会信用代码或证件号码" prop="actualCarrierId" :class="{ 'is-required': !dataForm.actualCarrierId }">
        <el-input v-model="dataForm.actualCarrierId" placeholder="实际承运人统一社会信用代码或证件号码"></el-input>
      </el-form-item>
      <el-form-item label="车辆牌照号" prop="vehicleNumber"
                    :class="{ 'is-required': !dataForm.vehicleNumber }">
        <el-input v-model="dataForm.vehicleNumber" placeholder="车辆牌照号"></el-input>
      </el-form-item>

<!--      <el-form-item label="驾驶证有效期至" prop="validPeriodTo" :class="{ 'is-required': !dataForm.validPeriodTo }">
        <div class="block">
          <el-date-picker
            v-model="dataForm.validPeriodTo"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </div>
      </el-form-item>-->
      <el-form-item label="车牌颜色代码" prop="vehiclePlateColorCode" :class="{ 'is-required': !dataForm.vehiclePlateColorCode }">
        <el-input v-model="dataForm.vehiclePlateColorCode" placeholder="车牌颜色代码"></el-input>
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
import { addFinancial } from '@/api/api'
export default {
  data () {
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
        disabledDate (time) {
          return time.getTime() > Date.now()
        }
      },
      sendToProDateTime: ''

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
          alert(333333)
          if (data && data.code === 0) {
            // eslint-disable-next-line no-unused-expressions
            this.dataForm.documentNumber = data.data.documentNumber,
            this.dataForm.sendToProDateTime = data.data.sendToProDateTime,
            this.dataForm.carrier = data.data.carrier,
            this.dataForm.actualCarrierId = data.data.actualCarrierId,
            this.dataForm.vehicleNumber = data.data.vehicleNumber,
            this.dataForm.vehiclePlateColorCode = data.data.vehiclePlateColorCode,
            this.dataForm.remark = data.data.remark
          }
        })
      }
      this.visible = true
    },
    // 表单提交
    dataFormSubmit () {
      this.$refs.dataForm.validate((valid) => {
        const methods = `${!this.dataForm.id ? 'post' : 'put'}`
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
        }
      })
    }
  }
}
</script>
