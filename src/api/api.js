import {
  getActionImageCode,
  getActionSmsCode,
  loginAction,
  getAction,
  postAction,
  httpAction,
  putAction,
  deleteAction
} from '@/api/manage'


/*==================uaa系统模块==========================*/
const uaaModel = '/uaa'
//登陆
const getImageCode = (params) => getActionImageCode(`${uaaModel}/code/image`, params)//获取图片验证码
const getSmsCode = (params) => getActionSmsCode(`${uaaModel}/code/sms`, params)//获取图片验证码
const passwordLogin = (params) => loginAction(`${uaaModel}/authentication/form`, params)//登陆
const mobileLogin = (params) => loginAction(`${uaaModel}/authentication/mobile`, params)//手机号登陆

//菜单管理
const getMenuList = (params) => getAction(`${uaaModel}/sys/resource`, params)
const getResourceList = (params) => getAction(`${uaaModel}/sys/resource/resourceList`, params)

//用户管理
const getLoginUserInfo = (params) => getAction(`${uaaModel}/sys/admin/me`, params)
const getAdminList = (params) => getAction(`${uaaModel}/sys/admin`, params)
//角色管理
const getRoleList = (params) => getAction(`${uaaModel}/sys/role`, params)
const getRolePage = (params) => getAction(`${uaaModel}/sys/role/page`, params)

//组织机构管理
const getOrganizationList = (params) => getAction(`${uaaModel}/sys/organization/organizationList`, params)

//网络货运模块
const internetFreightModel = '/interpreter'
//车辆管理
const getCarPage = (params) => getAction(`${internetFreightModel}/internetCars/getPageByCondition`, params)

//驾驶员管理
const getDriverPage = (params) => getAction(`${internetFreightModel}/internetDrivers/getPageByCondition`, params) //获取分页列表
const addDriver = (params, methodN) => httpAction(`${internetFreightModel}/internetDrivers`, params, methodN) //新增驾驶员
const getDriverById=(params,methodI)=>httpAction(`${internetFreightModel}/interpreter/internetDrivers/getOneById`,params,methodI)//根据id获取对应的列表

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
  getCarPage,
  mobileLogin,
  getDriverPage,
  addDriver,
  getDriverById
}



