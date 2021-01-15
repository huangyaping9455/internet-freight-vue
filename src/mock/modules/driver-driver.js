import Mock from 'mockjs'

// 生成数据列表
const dataList = []
for (let i = 0; i < Math.floor(Math.random() * 10 + 1); i++) {
 dataList.push(Mock.mock({
   id: '@increment',
   driverName: '@driverName',
   drivingLicense: '@drivingLicense',
   vehicleClass: '@vehicleClass',
   issuingOrganizations: '@issuingOrganizations',
   validPeriodFrom: '@validPeriodFrom',
   validPeriodTo: '@validPeriodTo',
   qualificationCertificate: '@qualificationCertificate',
   telephone: '@telephone',
   remark: '@remark'
  }))
}

// 获取驾驶员列表
export function list () {
  return {
    // isOpen: false,
    url: '/driver/driver/list',
    type: 'get',
    data: {
      'msg': 'success',
      'code': 0,
      'page': {
        'totalCount': dataList.length,
        'pageSize': 10,
        'totalPage': 1,
        'currPage': 1,
        'list': dataList
      }
    }
  }
}

// 获取驾驶员信息
export function info () {
  return {
    // isOpen: false,
    url: '/driver/driver/info',
    type: 'get',
    data: {
      'msg': 'success',
      'code': 0,
      'driver':dataList[0]
    }
  }
}


// 添加驾驶员
export function add () {
  return {
    // isOpen: false,
    url: '/driver/driver/save',
    type: 'post',
    data: {
      'msg': 'success',
      'code': 0
    }
  }
}

// 修改驾驶员
export function update () {
  return {
    // isOpen: false,
    url: '/driver/driver/update',
    type: 'post',
    data: {
      'msg': 'success',
      'code': 0
    }
  }
}

// 删除驾驶员
export function del () {
  return {
    // isOpen: false,
    url: '/driver/driver/delete',
    type: 'post',
    data: {
      'msg': 'success',
      'code': 0
    }
  }
}
