<template>
  <div class="mod-user">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="dataForm.vehicleNumber" placeholder="车牌号" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="dataForm.owner" placeholder="所有人" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
        <el-button v-if="isAuth('post/admin/**')" type="primary" @click="addOrUpdateHandle()">新增</el-button>
        <el-button v-if="isAuth('sys:user:delete')" type="danger" @click="deleteHandleBach()"
                   :disabled="dataListSelections.length <= 0">批量删除
        </el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="dataList"
      row-key="id"
      border
      @selection-change="selectionChangeHandle"
      style="width: 100%; ">
      <el-table-column
        type="selection"
        header-align="center"
        align="center"
        width="50">
      </el-table-column>
      <!--      <el-table-column
              prop="id"
              header-align="center"
              align="center"
              min-width="150"
              label="ID">
            </el-table-column>-->
      <el-table-column
        prop="originalDocumentNumber"
        header-align="center"
        align="center"
        min-width="150"
        label="原始单号">
      </el-table-column>
      <el-table-column
        prop="shippingNoteNumber"
        header-align="center"
        align="center"
        width="150"
        label="托运单号">
      </el-table-column>
      <el-table-column
        prop="serialNumber"
        header-align="center"
        align="center"
        width="150"
        label="分段分单号">
      </el-table-column>
      <el-table-column
        prop="vehicleAmount"
        header-align="center"
        width="150"
        align="center"
        label="运输总车辆数">
      </el-table-column>
      <el-table-column
        prop="transportTypeCode"
        header-align="center"
        align="center"
        width="150"
        label="运输组织类型代码">
      </el-table-column>
      <el-table-column
        prop="sendToProDateTime"
        header-align="center"
        align="center"
        width="150"
        :show-overflow-tooltip="true"
        label="运单上传时间">
      </el-table-column>
      <el-table-column
        prop="carrier"
        header-align="center"
        align="center"
        width="150"
        :show-overflow-tooltip="true"
        label="网络货运经营者名称">
      </el-table-column>
      <el-table-column
        prop="unifiedSocialCreditIdentifier"
        header-align="center"
        align="center"
        width="150"
        :show-overflow-tooltip="true"
        label="统一社会信用代码">
      </el-table-column>
      <el-table-column
        prop="permitNumber"
        header-align="center"
        align="center"
        width="150"
        :show-overflow-tooltip="true"
        label="道路运输经营许可证编号">
      </el-table-column>
      <el-table-column
        prop="consignmentDateTime"
        header-align="center"
        align="center"
        width="150"
        :show-overflow-tooltip="true"
        label="运单生成时间">
      </el-table-column>
      <el-table-column
        prop="businessTypeCode"
        header-align="center"
        align="center"
        width="150"
        :show-overflow-tooltip="true"
        label="业务类型代码">
      </el-table-column>
      <el-table-column
        prop="despatchActualDateTime"
        header-align="center"
        align="center"
        width="150"
        :show-overflow-tooltip="true"
        label="发货日期时间">
      </el-table-column>
      <el-table-column
        prop="goodsReceiptDateTime"
        header-align="center"
        align="center"
        width="150"
        :show-overflow-tooltip="true"
        label="收货日期时间">
      </el-table-column>
      <el-table-column
        prop="totalMonetaryAmount"
        header-align="center"
        align="center"
        width="150"
        :show-overflow-tooltip="true"
        label="运费金额">
      </el-table-column>
      <el-table-column
        prop="remark"
        header-align="center"
        align="center"
        width="150"
        :show-overflow-tooltip="true"
        label="备注">
      </el-table-column>
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        label="操作">
        <template slot-scope="scope">
          <el-button v-if="isAuth('sys:menu:update')" type="text" size="small"
                     @click="addOrUpdateHandle(scope.row.id)">修改
          </el-button>
          <el-button v-if="isAuth('sys:menu:delete')" type="text" size="small" @click="deleteHandle(scope.row.id)">
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
import AddOrUpdate from './order-add-or-update'
import {getOrderPage} from '@/api/api'

export default {
  data() {
    return {
      dataForm: {
        //userName: ''
      },
      dataList: [],
      pageIndex: 0,
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
      let params = {
        'page': this.pageIndex,
        'vehicleNumber': this.dataForm.vehicleNumber,
        'owner': this.dataForm.owner,
        //'organizationId': this.$store.state.user.organizationId
        'limit': this.pageSize
      }
      getOrderPage(params).then(({data}) => {
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
      this.pageIndex = 0
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

    deleteHandleBach(id) {
      let ids = id ? [id] : this.dataListSelections.map(item => {
        return item.id
      })
      this.$confirm(`确定对[id=${ids.join(',')}]进行[${id ? '删除' : '批量删除'}]操作?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http({
          url: this.$http.addUrl(`/internetfreight/internetOrders/${ids}`),
          method: 'delete',
          data: this.$http.addParams()
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
    },

    // 删除
    deleteHandle(id) {
      this.$confirm(`确定对[id=${id}]进行[删除]操作?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http({
          url: this.$http.addUrl(`/internetfreight/internetOrders/${id}`),
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
