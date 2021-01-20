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
        prop="vehicleNumber"
        header-align="center"
        align="center"
        min-width="150"
        label="车辆牌照号">
      </el-table-column>
      <el-table-column
        prop="vehiclePlateColorCode"
        header-align="center"
        align="center"
        width="150"
        label="车牌颜色代码">
      </el-table-column>
      <el-table-column
        prop="vehicleType"
        header-align="center"
        align="center"
        width="150"
        label="车辆类型代码">
      </el-table-column>
      <el-table-column
        prop="owner"
        header-align="center"
        width="150"
        align="center"
        label="所有人">
      </el-table-column>
      <el-table-column
        prop="useCharacter"
        header-align="center"
        align="center"
        width="150"
        label="使用性质">
      </el-table-column>
      <el-table-column
        prop="vin"
        header-align="center"
        align="center"
        width="150"
        :show-overflow-tooltip="true"
        label="车辆识别代码">
      </el-table-column>
      <el-table-column
        prop="issuingOrganizations"
        header-align="center"
        align="center"
        width="150"
        :show-overflow-tooltip="true"
        label="发证机关">
      </el-table-column>
      <el-table-column
        prop="registerDate"
        header-align="center"
        align="center"
        width="150"
        :show-overflow-tooltip="true"
        label="注册日期">
      </el-table-column>
      <el-table-column
        prop="issueDate"
        header-align="center"
        align="center"
        width="150"
        :show-overflow-tooltip="true"
        label="发证日期">
      </el-table-column>
      <el-table-column
        prop="vehicleEnergyType"
        header-align="center"
        align="center"
        width="150"
        :show-overflow-tooltip="true"
        label="车辆能源类型">
      </el-table-column>
      <el-table-column
        prop="vehicleTonnage"
        header-align="center"
        align="center"
        width="150"
        :show-overflow-tooltip="true"
        label="核定载质量">
      </el-table-column>
      <el-table-column
        prop="grossMass"
        header-align="center"
        align="center"
        width="150"
        :show-overflow-tooltip="true"
        label="总质量">
      </el-table-column>
      <el-table-column
        prop="roadTransportCertificateNumber"
        header-align="center"
        align="center"
        width="150"
        :show-overflow-tooltip="true"
        label="道路运输证号">
      </el-table-column>
      <el-table-column
        prop="trailerVehiclePlateNumber"
        header-align="center"
        align="center"
        width="150"
        :show-overflow-tooltip="true"
        label="挂车牌照号">
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
import AddOrUpdate from './car-add-or-update'
import {getCarPage} from '@/api/api'

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
      getCarPage(params).then(({data}) => {
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
          url: this.$http.addUrl(`/internetfreight/internetCars/${ids}`),
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
          url: this.$http.addUrl(`/internetfreight/internetCars/${id}`),
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
