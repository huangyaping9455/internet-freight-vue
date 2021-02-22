<template>
  <div class="mod-user">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="dataForm.documentNumber" placeholder="单证号" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="dataForm.carrier" placeholder="实际承运人名称" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="dataForm.vehicleNumber" placeholder="车辆牌照号" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
        <el-button v-if="isAuth('post/admin/**')" type="primary" @click="addOrUpdateHandle()">新增</el-button>
        <el-button v-if="isAuth('driver:internetdriver:delete')" type="danger" @click="deleteHandle()"
                   :disabled="dataListSelections.length <= 0">批量删除
        </el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="dataList"
      :row-style="{height:'20px'}"
      :cell-style="{padding:'0px'}"
      border
      v-loading="dataListLoading"
      @selection-change="selectionChangeHandle"
      style="width: 100%;">
      <el-table-column
        type="selection"
        header-align="center"
        align="center"
        width="50">
      </el-table-column>
      <el-table-column
        prop="documentNumber"
        header-align="center"
        align="center"
        width="180"
        label="单证号">
      </el-table-column>
      <el-table-column
        prop="sendToProDateTime"
        header-align="center"
        align="center"
        width="180"
        label="资金流水单上传到省级监测系统的时间">
      </el-table-column>
      <el-table-column
        prop="carrier"
        header-align="center"
        align="center"
        width="180"
        label="实际承运人名称">
      </el-table-column>
      <el-table-column
        prop="actualCarrierId"
        header-align="center"
        align="center"
        width="180"
        label="实际承运人统一社会信用代码或证件号码">
      </el-table-column>
      <el-table-column
        prop="vehicleNumber"
        header-align="center"
        align="center"
        width="180"
        label="车辆牌照号">
      </el-table-column>
      <el-table-column
        prop="vehiclePlateColorCode"
        header-align="center"
        align="center"
        width="180"
        label="车牌颜色代码">
      </el-table-column>
      <el-table-column
        prop="remark"
        header-align="center"
        align="center"
        width="180"
        label="备注">
      </el-table-column>
      <el-table-column
        prop="shippingNoteList"
        header-align="center"
        align="center"
        width="180"
        label="运单列表">
      </el-table-column>
      <el-table-column
        prop="shippingNoteNumber"
        header-align="center"
        align="center"
        width="180"
        label="托运单号">
      </el-table-column>
      <el-table-column
        prop="shippingNoteNumber"
        header-align="center"
        align="center"
        width="180"
        label="托运单号">
      </el-table-column>
      <el-table-column
        prop="financiallist"
        header-align="center"
        align="center"
        width="180"
        label="财务列表">
      </el-table-column>
      <el-table-column
        prop="paymentMeansCode"
        header-align="center"
        align="center"
        width="180"
        label="付款方式代码">
      </el-table-column>
      <el-table-column
        prop="recipient"
        header-align="center"
        align="center"
        width="180"
        label="收款方名称">
      </el-table-column>
      <el-table-column
        prop="receiptAccount"
        header-align="center"
        align="center"
        width="180"
        label="收款帐户信息">
      </el-table-column>
      <el-table-column
        prop="bankCode"
        header-align="center"
        align="center"
        width="180"
        label="银行代码">
      </el-table-column>
      <el-table-column
        prop="sequenceCode"
        header-align="center"
        align="center"
        width="180"
        label="流水号/序列号">
      </el-table-column>
      <el-table-column
        prop="monetaryAmount"
        header-align="center"
        align="center"
        width="180"
        label="实际支付金额">
      </el-table-column>
      <el-table-column
        prop="dateTime"
        header-align="center"
        align="center"
        width="180"
        label="日期时间">
      </el-table-column>
      <el-table-column
        prop="updateTime"
        header-align="center"
        align="center"
        width="180"
        label="更新时间">
        <template slot-scope="scope">
          {{ scope.row.updateTime | dateFormat }}
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        label="操作">
        <template slot-scope="scope">
          <el-button v-if="isAuth('capitalflow:capitalflow:update')" type="text" size="small"
                     @click="addOrUpdateHandle(scope.row.id)">修改
          </el-button>
          <el-button v-if="isAuth('capitalflow:capitalflow:delete')" type="text" size="small"
                     @click="deleteHandle(scope.row.id)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      :current-page="pageIndex"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      :total="totalPage"
      :background="true"
      layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
  </div>
</template>

<script>
import AddOrUpdate from './capitalflow-add-or-update'
import {getFinancialPage} from '@/api/api'

export default {
  data() {
    return {
      dataForm: {
        documentNumber: '',
        carrier: '',
        vehicleNumber: '',
        organizationId: '',
        isdelete: ''
      },
      dataList: [],
      pageIndex: 1,
      pageSize: 20,
      totalPage: 0,
      dataListLoading: false,
      dataListSelections: [],
      addOrUpdateVisible: false
    }
  },
  components: {
    AddOrUpdate
  },
  activated() {
    this.getDataList()
  },
  methods: {
    // 获取数据列表
    getDataList() {
      this.dataListLoading = true
      const params = {
        page: this.pageIndex,
        size: this.pageSize,
        documentNumber: this.dataForm.documentNumber,
        carrier: this.dataForm.carrier,
        vehicleNumber: this.dataForm.vehicleNumber,
        organizationId: this.$store.state.user.organization.id,
        isdelete: this.dataForm.isdelete
      }
      getFinancialPage(params).then(({data}) => {
        alert(data.dataForm.documentNumber)
        if (data && data.code === 0) {
          const {data: {content, totalElements}} = data
          this.totalPage = totalElements
          this.dataList = content
        } else {
          this.dataList = []
          this.totalPage = 0
        }
        this.dataListLoading = false
      })
    },
    // 每页数
    sizeChangeHandle(val) {
      this.pageSize = val
      this.pageIndex = 1
      this.getDataList()
    },
    // 当前页
    currentChangeHandle(val) {
      this.pageIndex = val
      this.getDataList()
    },
    // 多选
    selectionChangeHandle(val) {
      this.dataListSelections = val
    },
    // 新增 / 修改
    addOrUpdateHandle(id) {
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(id)
      })
    },
    // 删除
    deleteHandle(id) {
      const ids = id
        ? [id]
        : this.dataListSelections.map(item => {
          return item.id
        })
      this.$confirm(`确定对[id=${ids.join(',')}]进行[${id ? '删除' : '批量删除'}]操作?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http({
          url: this.$http.addUrl(`/internetfreight/financials/${ids}`),
          method: 'delete',
          data: this.$http.addData()
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 1500,
              onClose: () => {
                this.getDataList()
              }
            })

            this.visible = true
          } else {
            this.$message.error(data.msg)
          }
        })
      }).catch(() => {
      })
    }
  }
}
</script>
