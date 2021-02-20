<template>
  <div class="mod-user">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="dataForm.driverName" placeholder="驾驶员姓名" clearable></el-input>
      </el-form-item>
<!--      <el-form-item>
        <el-input v-model="dataForm.telephone" placeholder="电话号码" clearable></el-input>
      </el-form-item>-->
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
        prop="driverName"
        header-align="center"
        align="center"
        width="180"
        label="姓名">
      </el-table-column>
      <el-table-column
        prop="drivingLicense"
        header-align="center"
        align="center"
        width="180"
        label="驾驶证编号">
      </el-table-column>
      <el-table-column
        prop="vehicleClass"
        header-align="center"
        align="center"
        width="180"
        label="准驾车型">
      </el-table-column>
      <el-table-column
        prop="issuingOrganizations"
        header-align="center"
        align="center"
        width="180"
        label="驾驶证发证机关">
      </el-table-column>
      <el-table-column
        prop="validPeriodFrom"
        header-align="center"
        align="center"
        width="180"
        label="驾驶证有效期自">
      </el-table-column>
      <el-table-column
        prop="validPeriodTo"
        header-align="center"
        align="center"
        width="180"
        label="驾驶证有效期至">
      </el-table-column>
      <el-table-column
        prop="qualificationCertificate"
        header-align="center"
        align="center"
        width="180"
        label="从业资格证号">
      </el-table-column>
      <el-table-column
        prop="telephone"
        header-align="center"
        align="center"
        width="180"
        label="手机号码">
      </el-table-column>
      <el-table-column
        prop="remark"
        header-align="center"
        align="center"
        width="180"
        label="备注">
      </el-table-column>
      <el-table-column
        prop="driverLicense"
        header-align="center"
        align="center"
        width="180"
        label="驾驶证">
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
          <el-button v-if="isAuth('driver:internetdriver:update')" type="text" size="small"
                     @click="addOrUpdateHandle(scope.row.id)">修改
          </el-button>
          <el-button v-if="isAuth('driver:internetdriver:delete')" type="text" size="small"
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
import AddOrUpdate from './internetdriver-add-or-update'
import { getDriverPage } from '@/api/api'

export default {
  data () {
    return {
      dataForm: {
        driverName: ''//,
        // telephone: ''
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
  activated () {
    this.getDataList()
  },
  methods: {
    // 获取数据列表
    getDataList () {
      this.dataListLoading = true
      const params = {
        page: this.pageIndex,
        size: this.pageSize,
        driverName: this.dataForm.driverName,
        // 'telephone': this.dataForm.telephone,
        organizationId: this.$store.state.user.organization.id
      }
      getDriverPage(params).then(({ data }) => {
        if (data && data.code === 0) {
          const { data: { content, totalElements } } = data
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
    sizeChangeHandle (val) {
      this.pageSize = val
      this.pageIndex = 1
      this.getDataList()
    },
    // 当前页
    currentChangeHandle (val) {
      this.pageIndex = val
      this.getDataList()
    },
    // 多选
    selectionChangeHandle (val) {
      this.dataListSelections = val
    },
    // 新增 / 修改
    addOrUpdateHandle (id) {
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(id)
      })
    },
    // 删除
    deleteHandle (id) {
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
          url: this.$http.addUrl(`/internetfreight/internetDrivers/${ids}`),
          method: 'delete',
          data: this.$http.addData()
        }).then(({ data }) => {
          alert(ids)
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
