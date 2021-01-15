<template>
  <div class="mod-user">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="dataForm.driverName" placeholder="驾驶员姓名" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="dataForm.telephone" placeholder="电话号码" clearable></el-input>
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
        prop="driverName"
        header-align="center"
        align="center"
        min-width="50"
        label="姓名">
      </el-table-column>
      <el-table-column
        prop="drivingLicense"
        header-align="center"
        align="center"
        width="150"
        label="驾驶证编号">
      </el-table-column>
      <el-table-column
        prop="vehicleClass"
        header-align="center"
        align="center"
        width="150"
        label="准驾车型">
        <!--<template slot-scope="scope">
          <icon-svg :name="scope.row.icon || ''"></icon-svg>
        </template>-->
      </el-table-column>
      <el-table-column
        prop="issuingOrganizations"
        header-align="center"
        width="150"
        align="center"
        label="驾驶证发证机关">
        <!--<template slot-scope="scope">
          <el-tag v-if="scope.row.type === 0" size="small">目录</el-tag>
          <el-tag v-else-if="scope.row.type === 1" size="small" type="success">菜单</el-tag>
          <el-tag v-else-if="scope.row.type === 2" size="small" type="info">按钮</el-tag>
        </template>-->
      </el-table-column>
      <el-table-column
        prop="validPeriodFrom"
        header-align="center"
        align="center"
        width="150"
        label="驾驶证有效期自">
      </el-table-column>
      <el-table-column
        prop="validPeriodTo"
        header-align="center"
        align="center"
        width="150"
        :show-overflow-tooltip="true"
        label="驾驶证有效期至">
      </el-table-column>
      <el-table-column
        prop="qualificationCertificate"
        header-align="center"
        align="center"
        width="150"
        :show-overflow-tooltip="true"
        label="从业资格证号">
      </el-table-column>
      <el-table-column
        prop="telephone"
        header-align="center"
        align="center"
        width="150"
        :show-overflow-tooltip="true"
        label="手机号码">
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
import AddOrUpdate from './driver-add-or-update'
import {getAdminList} from '@/api/api'

export default {
  data() {
    return {
      dataForm: {
        userName: ''
      },
      dataList: [
        {
            driverName: '王小虎',
            drivingLicense: '412336222222222222',
            vehicleClass: 'C1',
            issuingOrganizations: '上海市普陀区金沙江路派出所',
            validPeriodFrom: '2016-05-02',
            validPeriodTo: '2016-05-02',
            qualificationCertificate: 'IUO859JIU96855',
            telephone: '13259869587',
            remark: '无'
          }, {
            driverName: '张丽丽',
            drivingLicense: '342336222222222222',
            vehicleClass: 'C3',
            issuingOrganizations: '上海市普陀区金沙江路派出所',
            validPeriodFrom: '2016-05-02',
            validPeriodTo: '2016-05-02',
            qualificationCertificate: 'IUO859JIU96855',
            telephone: '13259869587',
            remark: '无'
          }, {
            driverName: '林妙可',
            drivingLicense: '882336222222222222',
            vehicleClass: 'C4',
            issuingOrganizations: '上海市普陀区金沙江路派出所',
            validPeriodFrom: '2016-05-02',
            validPeriodTo: '2016-05-02',
            qualificationCertificate: 'IUO859JIU96855',
            telephone: '13259869587',
            remark: '无'
          }, {
            driverName: '潘米拉',
            drivingLicense: '662336222222222222',
            vehicleClass: 'C2',
            issuingOrganizations: '上海市普陀区金沙江路派出所',
            validPeriodFrom: '2016-05-02',
            validPeriodTo: '2016-05-02',
            qualificationCertificate: 'IUO859JIU96855',
            telephone: '13259869587',
            remark: '无'
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
