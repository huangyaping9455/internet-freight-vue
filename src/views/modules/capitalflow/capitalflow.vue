<template>
  <div class="mod-user">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="dataForm.userName" placeholder="用户名" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
        <el-button v-if="isAuth('post/admin/**')" type="primary" @click="addOrUpdateHandle()">新增</el-button>
        <el-button v-if="isAuth('sys:user:delete')" type="danger" @click="deleteHandle()"
                   :disabled="dataListSelections.length <= 0">批量删除
        </el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="dataList"
      row-key="driverId"
      border
      style="width: 100%; ">
      <el-table-column
        prop="documentNumber"
        header-align="center"
        align="center"
        min-width="150"
        label="单证号">
      </el-table-column>
      <el-table-column
        prop="sendToProDateTime"
        header-align="center"
        align="center"
        width="150"
        label="资金流水单上传时间">
      </el-table-column>
      <el-table-column
        prop="carrier"
        header-align="center"
        align="center"
        width="150"
        label="实际承运人名称">
      </el-table-column>
      <el-table-column
        prop="actualCarrierID"
        header-align="center"
        width="150"
        align="center"
        label="实际承运人统一社会信用代码或证件号码">
      </el-table-column>
      <el-table-column
        prop="vehicleNumber"
        header-align="center"
        align="center"
        width="150"
        label="车辆牌照号">
      </el-table-column>
      <el-table-column
        prop="vehiclePlateColorCode"
        header-align="center"
        align="center"
        width="150"
        :show-overflow-tooltip="true"
        label="车牌颜色代码">
      </el-table-column>
      <el-table-column
        prop="shippingNoteList"
        header-align="center"
        align="center"
        width="150"
        :show-overflow-tooltip="true"
        label="运单列表">
      </el-table-column>
      <el-table-column
        prop="shippingNoteNumber"
        header-align="center"
        align="center"
        width="150"
        :show-overflow-tooltip="true"
        label="托运单号">
      </el-table-column>
      <el-table-column
        prop="financiallist"
        header-align="center"
        align="center"
        width="150"
        :show-overflow-tooltip="true"
        label="财务列表">
      </el-table-column>
      <el-table-column
        prop="paymentMeansCode"
        header-align="center"
        align="center"
        width="150"
        :show-overflow-tooltip="true"
        label="付款方式代码">
      </el-table-column>
      <el-table-column
        prop="recipient"
        header-align="center"
        align="center"
        width="150"
        :show-overflow-tooltip="true"
        label="收款方名称">
      </el-table-column>
      <el-table-column
        prop="receiptAccount"
        header-align="center"
        align="center"
        width="150"
        :show-overflow-tooltip="true"
        label="收款帐户信息">
      </el-table-column>
      <el-table-column
        prop="bankCode"
        header-align="center"
        align="center"
        width="150"
        :show-overflow-tooltip="true"
        label="银行代码">
      </el-table-column>
      <el-table-column
        prop="sequenceCode"
        header-align="center"
        align="center"
        width="150"
        :show-overflow-tooltip="true"
        label="流水号/序列号">
      </el-table-column>
      <el-table-column
        prop="monetaryAmount"
        header-align="center"
        align="center"
        width="150"
        :show-overflow-tooltip="true"
        label="实际支付金额">
      </el-table-column>
      <el-table-column
        prop="dateTime"
        header-align="center"
        align="center"
        width="150"
        :show-overflow-tooltip="true"
        label="日期时间">
      </el-table-column>
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        label="操作">
        <template slot-scope="scope">
          <el-button v-if="isAuth('sys:menu:update')" type="text" size="small"
                     @click="addOrUpdateHandle(scope.row.menuId)">修改
          </el-button>
          <el-button v-if="isAuth('sys:menu:delete')" type="text" size="small" @click="deleteHandle(scope.row.menuId)">
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
      layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
  </div>
</template>

<script>
import AddOrUpdate from './capitalflow-add-or-update'
import {getAdminList} from '@/api/api'

export default {
  data() {
    return {
      dataForm: {
        userName: ''
      },
      dataList: [
        {
            documentNumber: '98566',
            sendToProDateTime: '2016-05-02',
            carrier: '张三',
            actualCarrierID: '536987854523685456',
            vehicleNumber: '云A584695',
            vehiclePlateColorCode: '蓝色',
            shippingNoteList: '列表',
            shippingNoteNumber: 'hhh66',
            financiallist: '列表',
            paymentMeansCode: 'CCB',
            recipient: '李四',
            receiptAccount: '6245896874596354',
            bankCode: 'ZGYH',
            sequenceCode: '688945555445',
            monetaryAmount: '800',
            dateTime: '2016-05-02'
          }, {
            documentNumber: '98566',
            sendToProDateTime: '2016-05-02',
            carrier: '张三',
            actualCarrierID: '536987854523685456',
            vehicleNumber: '云A584695',
            vehiclePlateColorCode: '蓝色',
            shippingNoteList: '列表',
            shippingNoteNumber: 'hhh66',
            financiallist: '列表',
            paymentMeansCode: 'CCB',
            recipient: '李四',
            receiptAccount: '6245896874596354',
            bankCode: 'ZGYH',
            sequenceCode: '688945555445',
            monetaryAmount: '800',
            dateTime: '2016-05-02'
          }, {
            documentNumber: '98566',
            sendToProDateTime: '2016-05-02',
            carrier: '张三',
            actualCarrierID: '536987854523685456',
            vehicleNumber: '云A584695',
            vehiclePlateColorCode: '蓝色',
            shippingNoteList: '列表',
            shippingNoteNumber: 'hhh66',
            financiallist: '列表',
            paymentMeansCode: 'CCB',
            recipient: '李四',
            receiptAccount: '6245896874596354',
            bankCode: 'ZGYH',
            sequenceCode: '688945555445',
            monetaryAmount: '800',
            dateTime: '2016-05-02'
          }, {
            documentNumber: '98566',
            sendToProDateTime: '2016-05-02',
            carrier: '张三',
            actualCarrierID: '536987854523685456',
            vehicleNumber: '云A584695',
            vehiclePlateColorCode: '蓝色',
            shippingNoteList: '列表',
            shippingNoteNumber: 'hhh66',
            financiallist: '列表',
            paymentMeansCode: 'CCB',
            recipient: '李四',
            receiptAccount: '6245896874596354',
            bankCode: 'ZGYH',
            sequenceCode: '688945555445',
            monetaryAmount: '800',
            dateTime: '2016-05-02'
          }
      ],
      pageIndex: 0,
      pageSize: 10,
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
    //this.getDataList()
  },
  methods: {
    // 获取数据列表
    getDataList() {
      this.dataListLoading = true
      let params = {
        'page': this.pageIndex,
        'limit': this.pageSize,
        'username': this.dataForm.userName,
        'organizationId': this.$store.state.user.organizationId
      }
      getAdminList(params).then(({data}) => {
        if (data && data.code === 0) {
          let {data: {content, totalElements}} = data
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
      var adminIds = id ? [id] : this.dataListSelections.map(item => {
        return item.id
      })
      this.$confirm(`确定对[id=${adminIds.join(',')}]进行[${id ? '删除' : '批量删除'}]操作?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http({
          url: this.$http.addUrl('/uaa/admin'),
          method: 'delete',
          data: this.$http.addParams(adminIds, false)
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
