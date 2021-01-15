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
        prop="sendToProDateTime"
        header-align="center"
        align="center"
        width="150"
        label="运单上传时间">
      </el-table-column>
      <el-table-column
        prop="carrier"
        header-align="center"
        width="150"
        align="center"
        label="网络货运经营者名称">
      </el-table-column>
      <el-table-column
        prop="unifiedSocialCreditIdentifier"
        header-align="center"
        align="center"
        width="150"
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
        prop="consignorInfo"
        header-align="center"
        align="center"
        width="150"
        :show-overflow-tooltip="true"
        label="托运人信息">
      </el-table-column>
      <el-table-column
        prop="consignor"
        header-align="center"
        align="center"
        width="150"
        :show-overflow-tooltip="true"
        label="托运人名称">
      </el-table-column>
      <el-table-column
        prop="consignorID"
        header-align="center"
        align="center"
        width="150"
        :show-overflow-tooltip="true"
        label="托运人统一社会信用代码或个人证件号">
      </el-table-column>
      <el-table-column
        prop="placeOfLoading"
        header-align="center"
        align="center"
        width="150"
        :show-overflow-tooltip="true"
        label="装货地址">
      </el-table-column>
      <el-table-column
        prop="countrySubdivisionCode"
        header-align="center"
        align="center"
        width="150"
        :show-overflow-tooltip="true"
        label="装货地点的国家行政区划代码">
      </el-table-column>
      <el-table-column
        prop="consigneeInfo"
        header-align="center"
        align="center"
        width="150"
        :show-overflow-tooltip="true"
        label="收货方信息">
      </el-table-column>


      <el-table-column
        prop="consignee"
        header-align="center"
        align="center"
        width="150"
        :show-overflow-tooltip="true"
        label="收货方名称">
      </el-table-column>
      <el-table-column
        prop="consigneeID"
        header-align="center"
        align="center"
        width="150"
        :show-overflow-tooltip="true"
        label="收货方统一社会信用代码或个人证件号码">
      </el-table-column>
      <el-table-column
        prop="goodsReceiptPlace"
        header-align="center"
        align="center"
        width="150"
        :show-overflow-tooltip="true"
        label="收货地址">
      </el-table-column>
      <el-table-column
        prop="countrySubdivisionCode"
        header-align="center"
        align="center"
        width="150"
        :show-overflow-tooltip="true"
        label="收货地点的国家行政区划代码">
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
        prop="vehicleInfo"
        header-align="center"
        align="center"
        width="150"
        :show-overflow-tooltip="true"
        label="车辆信息">
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
        prop="vehicleNumber"
        header-align="center"
        align="center"
        width="150"
        :show-overflow-tooltip="true"
        label="车辆牌照号">
      </el-table-column>
      <el-table-column
        prop="driver"
        header-align="center"
        align="center"
        width="150"
        :show-overflow-tooltip="true"
        label="驾驶员">
      </el-table-column>
      <el-table-column
        prop="driverName"
        header-align="center"
        align="center"
        width="150"
        :show-overflow-tooltip="true"
        label="驾驶员姓名">
      </el-table-column>
      <el-table-column
        prop="drivingLicense"
        header-align="center"
        align="center"
        width="150"
        :show-overflow-tooltip="true"
        label="机动车驾驶证编号">
      </el-table-column>
      <el-table-column
        prop="goodsInfo"
        header-align="center"
        align="center"
        width="150"
        :show-overflow-tooltip="true"
        label="货物信息">
      </el-table-column>
      <el-table-column
        prop="descriptionOfGoods"
        header-align="center"
        align="center"
        width="150"
        :show-overflow-tooltip="true"
        label="货物名称">
      </el-table-column>
      <el-table-column
        prop="cargoTypeClassificationCode"
        header-align="center"
        align="center"
        width="150"
        :show-overflow-tooltip="true"
        label="货物类型分类代码">
      </el-table-column>
      <el-table-column
        prop="goodsItemGrossWeight"
        header-align="center"
        align="center"
        width="150"
        :show-overflow-tooltip="true"
        label="货物项毛重">
      </el-table-column>
      <el-table-column
        prop="cube"
        header-align="center"
        align="center"
        width="150"
        :show-overflow-tooltip="true"
        label="体积">
      </el-table-column>
      <el-table-column
        prop="totalNumberOfPackages"
        header-align="center"
        align="center"
        width="150"
        :show-overflow-tooltip="true"
        label="总件数">
      </el-table-column>
      <el-table-column
        prop="actualCarrierInfo"
        header-align="center"
        align="center"
        width="150"
        :show-overflow-tooltip="true"
        label="实际承运人信息">
      </el-table-column>
      <el-table-column
        prop="actualCarrierName"
        header-align="center"
        align="center"
        width="150"
        :show-overflow-tooltip="true"
        label="实际承运人名称">
      </el-table-column>
      <el-table-column
        prop="actualCarrierBusinessLicense"
        header-align="center"
        align="center"
        width="150"
        :show-overflow-tooltip="true"
        label="实际承运人道路运输经营许可证号">
      </el-table-column>
      <el-table-column
        prop="actualCarrierID"
        header-align="center"
        align="center"
        width="150"
        :show-overflow-tooltip="true"
        label="实际承运人统一社会信用代码或证件号码">
      </el-table-column>
      <el-table-column
        prop="insuranceInformation"
        header-align="center"
        align="center"
        width="150"
        :show-overflow-tooltip="true"
        label="保险信息">
      </el-table-column>
      <el-table-column
        prop="policyNumber"
        header-align="center"
        align="center"
        width="150"
        :show-overflow-tooltip="true"
        label="保险单号">
      </el-table-column>
      <el-table-column
        prop="insuranceCompany"
        header-align="center"
        align="center"
        width="150"
        :show-overflow-tooltip="true"
        label="保险公司">
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
          <el-button v-if="isAuth('sys:menu:update')" type="text" size="small"
                     @click="upload(scope.row.orderId)">上传
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
import AddOrUpdate from './order-add-or-update'
import {getAdminList} from '@/api/api'

export default {
  data() {
    return {
      dataForm: {
        userName: ''
      },
      dataList: [
        {
            originalDocumentNumber: '98566',
            shippingNoteNumber: '536987854523685456',
            sendToProDateTime: '2016-05-02',
            carrier: '张三',
            unifiedSocialCreditIdentifier: '98566',
            permitNumber: '536987854523685456',
            consignmentDateTime: '2016-05-02',
            businessTypeCode: '98566',
            despatchActualDateTime: '2016-05-02',
            goodsReceiptDateTime: '2016-05-02',
            consignorInfo: '98566',
            consignor: '张三',
            consignorID: '536987854523685456',
            placeOfLoading: '张三',
            countrySubdivisionCode: '98566',
            consigneeInfo: '张三',
            consignee: '张三',
            consigneeID: '536987854523685456',
            goodsReceiptPlace: '张三',
            countrySubdivisionCode: '98566',
            totalMonetaryAmount: '800',
            vehicleInfo: '张三',
            vehiclePlateColorCode: '98566',
            vehicleNumber: '536987854523685456',
            driver: '张三',
            driverName: '张三',
            drivingLicense: '98566',
            goodsInfo: '张三',
            descriptionOfGoods: '土豆',
            cargoTypeClassificationCode: '98566',
            goodsItemGrossWeight: '20',
            cube: '14',
            totalNumberOfPackages: '92',
            actualCarrierInfo: '张三',
            actualCarrierName: '张三',
            actualCarrierBusinessLicense: '98566',
            actualCarrierID: '536987854523685456',
            insuranceInformation: '98566',
            policyNumber: '98566',
            insuranceCompany: '中国人寿',
            remark: '备注'
          }, {
            originalDocumentNumber: '98566',
            shippingNoteNumber: '536987854523685456',
            sendToProDateTime: '2016-05-02',
            carrier: '张三',
            unifiedSocialCreditIdentifier: '98566',
            permitNumber: '536987854523685456',
            consignmentDateTime: '2016-05-02',
            businessTypeCode: '98566',
            despatchActualDateTime: '2016-05-02',
            goodsReceiptDateTime: '2016-05-02',
            consignorInfo: '98566',
            consignor: '张三',
            consignorID: '536987854523685456',
            placeOfLoading: '张三',
            countrySubdivisionCode: '98566',
            consigneeInfo: '张三',
            consignee: '张三',
            consigneeID: '536987854523685456',
            goodsReceiptPlace: '张三',
            countrySubdivisionCode: '98566',
            totalMonetaryAmount: '800',
            vehicleInfo: '张三',
            vehiclePlateColorCode: '98566',
            vehicleNumber: '536987854523685456',
            driver: '张三',
            driverName: '张三',
            drivingLicense: '98566',
            goodsInfo: '张三',
            descriptionOfGoods: '土豆',
            cargoTypeClassificationCode: '98566',
            goodsItemGrossWeight: '20',
            cube: '14',
            totalNumberOfPackages: '92',
            actualCarrierInfo: '张三',
            actualCarrierName: '张三',
            actualCarrierBusinessLicense: '98566',
            actualCarrierID: '536987854523685456',
            insuranceInformation: '98566',
            policyNumber: '98566',
            insuranceCompany: '中国人寿',
            remark: '备注'
          }, {
            originalDocumentNumber: '98566',
            shippingNoteNumber: '536987854523685456',
            sendToProDateTime: '2016-05-02',
            carrier: '张三',
            unifiedSocialCreditIdentifier: '98566',
            permitNumber: '536987854523685456',
            consignmentDateTime: '2016-05-02',
            businessTypeCode: '98566',
            despatchActualDateTime: '2016-05-02',
            goodsReceiptDateTime: '2016-05-02',
            consignorInfo: '98566',
            consignor: '张三',
            consignorID: '536987854523685456',
            placeOfLoading: '张三',
            countrySubdivisionCode: '98566',
            consigneeInfo: '张三',
            consignee: '张三',
            consigneeID: '536987854523685456',
            goodsReceiptPlace: '张三',
            countrySubdivisionCode: '98566',
            totalMonetaryAmount: '800',
            vehicleInfo: '张三',
            vehiclePlateColorCode: '98566',
            vehicleNumber: '536987854523685456',
            driver: '张三',
            driverName: '张三',
            drivingLicense: '98566',
            goodsInfo: '张三',
            descriptionOfGoods: '土豆',
            cargoTypeClassificationCode: '98566',
            goodsItemGrossWeight: '20',
            cube: '14',
            totalNumberOfPackages: '92',
            actualCarrierInfo: '张三',
            actualCarrierName: '张三',
            actualCarrierBusinessLicense: '98566',
            actualCarrierID: '536987854523685456',
            insuranceInformation: '98566',
            policyNumber: '98566',
            insuranceCompany: '中国人寿',
            remark: '备注'
          }, {
            originalDocumentNumber: '98566',
            shippingNoteNumber: '536987854523685456',
            sendToProDateTime: '2016-05-02',
            carrier: '张三',
            unifiedSocialCreditIdentifier: '98566',
            permitNumber: '536987854523685456',
            consignmentDateTime: '2016-05-02',
            businessTypeCode: '98566',
            despatchActualDateTime: '2016-05-02',
            goodsReceiptDateTime: '2016-05-02',
            consignorInfo: '98566',
            consignor: '张三',
            consignorID: '536987854523685456',
            placeOfLoading: '张三',
            countrySubdivisionCode: '98566',
            consigneeInfo: '张三',
            consignee: '张三',
            consigneeID: '536987854523685456',
            goodsReceiptPlace: '张三',
            countrySubdivisionCode: '98566',
            totalMonetaryAmount: '800',
            vehicleInfo: '张三',
            vehiclePlateColorCode: '98566',
            vehicleNumber: '536987854523685456',
            driver: '张三',
            driverName: '张三',
            drivingLicense: '98566',
            goodsInfo: '张三',
            descriptionOfGoods: '土豆',
            cargoTypeClassificationCode: '98566',
            goodsItemGrossWeight: '20',
            cube: '14',
            totalNumberOfPackages: '92',
            actualCarrierInfo: '张三',
            actualCarrierName: '张三',
            actualCarrierBusinessLicense: '98566',
            actualCarrierID: '536987854523685456',
            insuranceInformation: '98566',
            policyNumber: '98566',
            insuranceCompany: '中国人寿',
            remark: '备注'
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
