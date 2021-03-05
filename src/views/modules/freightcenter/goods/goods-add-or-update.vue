<template>
  <el-drawer
    :title="!dataForm.id ? '新增' : '修改'"
    :destroy-on-close="true"
    :before-close="handleClose"
    size="50%"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()"
             label-width="120px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="货物名称" prop="descriptionOfGoods">
            <el-input v-model="dataForm.descriptionOfGoods" placeholder="货物名称"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="货物类型" prop="cargoTypeClassificationCode">
            <el-select v-model="dataForm.cargoTypeClassificationCode" filterable clearable placeholder="货物类型"
                       style="width: 100%">
              <el-option v-for="(item,index) in this.$enum.getValueDescList('cargoTypeClassificationType')"
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

          <el-form-item label="货物项毛重" prop="goodsItemGrossWeight">
            <el-input v-model="dataForm.goodsItemGrossWeight" placeholder="货物项毛重(KG)"></el-input>
          </el-form-item>

        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="体积" prop="cube">
            <el-input v-model="dataForm.cube" placeholder="体积/立方米(选填)"></el-input>
          </el-form-item>

        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">

          <el-form-item label="总件数" prop="totalNumberOfPackages">
            <el-input v-model="dataForm.totalNumberOfPackages" placeholder="总件数(选填)"></el-input>
          </el-form-item>

        </el-col>
      </el-row>

    </el-form>
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>

  </el-drawer>
</template>

<script>
import { isEmail, isMobile } from '@/utils/validate'
import { getRoleList } from '@/api/api'

export default {
  data () {
    const validateDescriptionOfGoods = (rule, value, callback) => {
      if (!this.dataForm.descriptionOfGoods && !/\S/.test(value)) {
        callback(new Error('货物名称不能为空'))
      } else {
        callback()
      }
    }
    return {
      visible: false,
      // roleList: [],
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
          { validator: validateDescriptionOfGoods, message: '货物名称不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {

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
    },
    init (id) {
      this.dataForm.id = id || 0

      if (this.dataForm.id) {
        this.$http({
          url: this.$http.addUrl('/internetfreight/internetGoods/getOneById'),
          method: 'get',
          params: this.$http.addParams({ id: this.dataForm.id })
        }).then(({ data }) => {
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
    dataFormSubmit () {
      this.$refs.dataForm.validate((valid) => {
        if (valid) {
          this.$http({
            url: this.$http.addUrl(`/internetfreight/internetGoods${!this.dataForm.id ? '' : '/' + this.dataForm.id}`),
            method: `${!this.dataForm.id ? 'post' : 'put'}`,
            data: this.$http.addData({
              id: this.dataForm.id || undefined,
              descriptionOfGoods: this.dataForm.descriptionOfGoods,
              cargoTypeClassificationCode: this.dataForm.cargoTypeClassificationCode,
              goodsItemGrossWeight: this.dataForm.goodsItemGrossWeight,
              cube: this.dataForm.cube,
              totalNumberOfPackages: this.dataForm.totalNumberOfPackages

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
