<template>
  <div class="mod-menu">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="dataForm.shippingNoteNumber" placeholder="运单号" clearable></el-input>
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
        prop="sendToProDateTime"
        header-align="center"
        align="center"
        min-width="50"
        label="表单上传时间">
      </el-table-column>
      <el-table-column
        prop="shippingNoteNumber"
        header-align="center"
        align="center"
        width="150"
        label="对应运单号">
      </el-table-column>
      <el-table-column
        prop="locationType"
        header-align="center"
        align="center"
        width="150"
        label="位置类型">
      </el-table-column>
      <el-table-column
        prop="sendDateTime"
        header-align="center"
        width="150"
        align="center"
        label="发货/收货时间">
      </el-table-column>
      <el-table-column
        prop="longitude"
        header-align="center"
        align="center"
        width="150"
        label="经度">
      </el-table-column>
      <el-table-column
        prop="latitude"
        header-align="center"
        align="center"
        width="150"
        :show-overflow-tooltip="true"
        label="纬度">
      </el-table-column>
      <el-table-column
        prop="countrySubdivisionCode"
        header-align="center"
        align="center"
        width="150"
        :show-overflow-tooltip="true"
        label="发货/收货行政区划代码">
      </el-table-column>
      <el-table-column
        prop="locationText"
        header-align="center"
        align="center"
        width="150"
        :show-overflow-tooltip="true"
        label="地点信息">
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
import AddOrUpdate from './location-add-or-update'
import {treeDataTranslate} from '@/utils'
import {getResourceList} from '@/api/api'
export default {
  data() {
    return {
      dataForm: {},
      dataList: [
        {
            sendToProDateTime: '2016-05-02',
            shippingNoteNumber: '412336222222222222',
            locationType: '发货地',
            sendDateTime: '2016-05-02',
            longitude: '54',
            latitude: '62',
            countrySubdivisionCode: '650000',
            locationText: '就不填又怎么样'
          }, {
            sendToProDateTime: '2016-05-02',
            shippingNoteNumber: '412336222222222222',
            locationType: '发货地',
            sendDateTime: '2016-05-02',
            longitude: '54',
            latitude: '62',
            countrySubdivisionCode: '650000',
            locationText: '就不填又怎么样'
          }, {
            sendToProDateTime: '2016-05-02',
            shippingNoteNumber: '412336222222222222',
            locationType: '发货地',
            sendDateTime: '2016-05-02',
            longitude: '54',
            latitude: '62',
            countrySubdivisionCode: '650000',
            locationText: '就不填又怎么样'
          }, {
            sendToProDateTime: '2016-05-02',
            shippingNoteNumber: '412336222222222222',
            locationType: '发货地',
            sendDateTime: '2016-05-02',
            longitude: '54',
            latitude: '62',
            countrySubdivisionCode: '650000',
            locationText: '就不填又怎么样'
          }
      ],
      dataListLoading: false,
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
     getResourceList().then(({data:{data}}) => {
        this.dataList = this.dataList = treeDataTranslate(data, 'menuId')
        this.dataListLoading = false
      })
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
      this.$confirm(`确定对[id=${id}]进行[删除]操作?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http({
          url: this.$http.addUrl(`/uaa/resource/${id}`),
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
