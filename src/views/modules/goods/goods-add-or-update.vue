<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()"
             label-width="120px">
      <el-form-item label="货物名称" prop="descriptionOfGoods">
        <el-input v-model="dataForm.descriptionOfGoods" placeholder="货物名称"></el-input>
      </el-form-item>
      <el-form-item label="货物类型分类代码" prop="cargoTypeClassificationCode">
        <el-input v-model="dataForm.cargoTypeClassificationCode" placeholder="货物类型分类代码"></el-input>
      </el-form-item>
      <el-form-item label="货物项毛重" prop="goodsItemGrossWeight">
        <el-input v-model="dataForm.goodsItemGrossWeight" placeholder="货物项毛重"></el-input>
      </el-form-item>
      <el-form-item label="体积" prop="cube">
        <el-input v-model="dataForm.cube" placeholder="体积"></el-input>
      </el-form-item>
      <el-form-item label="总件数" prop="totalNumberOfPackages">
        <el-input v-model="dataForm.totalNumberOfPackages" placeholder="总件数"></el-input>
      </el-form-item>
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
    let validateDescriptionOfGoods = (rule, value, callback) => {
      if (!this.dataForm.descriptionOfGoods && !/\S/.test(value)) {
        callback(new Error('货物名称不能为空'))
      } else {
        callback()
      }
    }
    return {
      visible: false,
      //roleList: [],
      dataForm: {
        id: 0,
        descriptionOfGoods: '',
        cargoTypeClassificationCode: '',
        goodsItemGrossWeight: '',
        cube: '',
        totalNumberOfPackages: '',
        delete: 1
      },
      dataRule: {
        vehicleNumber: [
          {validator: validateDescriptionOfGoods, message: '货物名称不能为空', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    init(id) {
      this.dataForm.id = id || 0




      if (this.dataForm.id) {
        this.$http({
          url: this.$http.addUrl(`/internetfreight/internetGoods/getOneById`),
          method: 'get',
          params: this.$http.addParams({id: this.dataForm.id})
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.dataForm.descriptionOfGoods = data.data.descriptionOfGoods
            this.dataForm.cargoTypeClassificationCode = data.data.cargoTypeClassificationCode
            this.dataForm.goodsItemGrossWeight = data.data.goodsItemGrossWeight
            this.dataForm.cube = data.data.cube
            this.dataForm.totalNumberOfPackages = data.data.totalNumberOfPackages
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
            url: this.$http.addUrl(`/internetfreight/internetGoods${!this.dataForm.id ? '' : '/' + this.dataForm.id}`),
            method: `${!this.dataForm.id ? 'post' : 'put'}`,
            data: this.$http.addData({
              'id': this.dataForm.id || undefined,
              'descriptionOfGoods': this.dataForm.descriptionOfGoods,
              'cargoTypeClassificationCode': this.dataForm.cargoTypeClassificationCode,
              'goodsItemGrossWeight': this.dataForm.goodsItemGrossWeight,
              'cube': this.dataForm.cube,
              'totalNumberOfPackages': this.dataForm.totalNumberOfPackages

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
