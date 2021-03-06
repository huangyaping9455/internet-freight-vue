import {
  getActionImageCode,
  getActionSmsCode,
  loginAction,
  getAction,
  deleteAction,
  postAction,
  httpAction,
  // eslint-disable-next-line no-unused-vars
  putAction,
  uploadImageAction
} from '@/api/manage'
import id from 'element-ui/src/locale/lang/id'

/* ==================uaa系统模块========================== */
const uaaModel = '/uaa'
// 登陆
const getImageCode = (params) => getActionImageCode(`${uaaModel}/code/image`, params)// 获取图片验证码
const getSmsCode = (params) => getActionSmsCode(`${uaaModel}/code/sms`, params)// 获取短信验证码
const passwordLogin = (params) => loginAction(`${uaaModel}/authentication/form`, params)// 密码登陆
const mobileLogin = (params) => loginAction(`${uaaModel}/authentication/mobile`, params)// 手机号登陆

// 菜单管理
const getMenuList = (params) => getAction(`${uaaModel}/sys/resource`, params)
const getResourceList = (params) => getAction(`${uaaModel}/sys/resource/resourceList`, params)

// 用户管理
const getLoginUserInfo = (params) => getAction(`${uaaModel}/sys/admin/me`, params)
const getAdminList = (params) => getAction(`${uaaModel}/sys/admin`, params)
const getUserInfo = (id) => getAction(`/uaa/sys/admin/${id}`)
// 角色管理
const getRoleList = (params) => getAction(`${uaaModel}/sys/role`, params)
const getRoleListByCondition = (params) => getAction(`${uaaModel}/sys/role/getByCondition`, params)
const getRolePage = (params) => getAction(`${uaaModel}/sys/role/page`, params)

// 组织机构管理
const getOrganizationList = (params) => getAction(`${uaaModel}/sys/organization/organizationList`, params)

// 网络货运模块
const internetFreightModel = '/internetfreight'
// 车辆管理
const getCarPage = (params) => getAction(`${internetFreightModel}/internetCars/getPageByCondition`, params)
const getCar = (id) => getAction(`${internetFreightModel}/internetCars/${id}`)
const deleteCar = (id) => deleteAction(`${internetFreightModel}/internetCars/${id}`)
const deleteCars = (ids) => deleteAction(`${internetFreightModel}/internetCars/${ids}`)
const updateCar = (id, data) => putAction(`${internetFreightModel}/internetCars/${id}`, data)
const addCar = (data) => postAction(`${internetFreightModel}/internetCars`, data)
// 订单管理
const getOrderPage = (params) => getAction(`${internetFreightModel}/internetOrders/getPageByCondition`, params)
// 货物管理
const getGoodsPage = (params) => getAction(`${internetFreightModel}/internetGoods/getPageByCondition`, params)

// 驾驶员管理
const getDriver = (id) => getAction(`${internetFreightModel}/internetDrivers/${id}`)
const getDriverPage = (params) => getAction(`${internetFreightModel}/internetDrivers/getPageByCondition`, params) // 获取分页列表
const addDriver = (data) => postAction(`${internetFreightModel}/internetDrivers`, data) // 新增驾驶员
const updateDriver = (id, data) => putAction(`${internetFreightModel}/internetDrivers/${id}`, data) // 新增驾驶员

// 资金流水管理
const getFinancialPage = (params) => getAction(`${internetFreightModel}/financials/getPageByCondition`, params) // 获取分页列表
const addFinancial = (params, methodN) => httpAction(`${internetFreightModel}/financials`, params, methodN)// 新增资金流水

// 文件上传模块
const fileUploadModel = '/filesystem'
// 文件上传
const uploadImage = (data) => uploadImageAction(`${fileUploadModel}/fileFastDFS/upload`, data)
const deleteImage = (data) => deleteAction(`${fileUploadModel}/fileFastDFS/delete`, data)

export {
  getMenuList,
  getImageCode,
  passwordLogin,
  getLoginUserInfo,
  getAdminList,
  getRoleList,
  getResourceList,
  getRolePage,
  getOrganizationList,
  getSmsCode,
  mobileLogin,
  getCarPage,
  updateCar,
  addCar,
  getCar,
  deleteCar,
  deleteCars,
  getOrderPage,
  getGoodsPage,
  getDriverPage,
  addDriver,
  getDriver,
  updateDriver,
  getFinancialPage,
  uploadImage,
  deleteImage,
  addFinancial,
  getUserInfo,
  getRoleListByCondition

}
