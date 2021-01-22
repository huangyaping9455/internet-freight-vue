import http from '@/utils/httpRequest'


/**
 * post 请求
 * @param url 请求路径
 * @param data jsonData
 */
export function postAction(url, data) {
  return http({
    url: http.addUrl(url),
    method: 'post',
    data: http.addData(data)
  })
}

/**
 * {post | put}
 * @param url
 * @param data
 * @param method
 */
export function httpAction(url, data, method) {
  return http({
    url: http.addUrl(url),
    method: method,
    data: http.addData(data)
  })
}

/***
 * put
 * @param url
 * @param data
 */
export function putAction(url, data) {
  return http({
    url: http.addUrl(url),
    method: 'put',
    data: http.addData(data)
  })
}

/***
 * get
 * @param url
 * @param params
 */
export function getAction(url, params) {
  return http({
    url: http.addUrl(url),
    method: 'get',
    params: http.addParams(params)
  })
}

/**
 * delete
 * @param url
 * @param params
 */
export function deleteAction(url, params) {
  return http({
    url: http.addUrl(url),
    method: 'delete',
    params: http.addParams(params)
  })
}

/*=======================不通用==================================*/
/**
 * 获取图片验证码
 * @param url
 * @param parameter
 */
export function getActionImageCode(url, params) {
  return http({
    url: http.addUrl(url),
    method: 'get',
    headers: {deviceId: 'web'},
    responseType: 'blob',
    params: http.addParams(params)
  })
}


export function getActionSmsCode(url, params) {
  return http({
    url: http.addUrl(url),
    method: 'get',
    headers: {deviceId: 'web'},
    params: http.addParams(params)
  })
}

/**
 * 登陆
 * @param url
 * @param params
 */
export function loginAction(url, params) {
  return http({
    url: http.addUrl(url),
    method: 'post',
    headers: {deviceId: 'web'},
    params: http.addParams(params)
  })
}

export function uploadImageAction(url, data) {
  return http({
    url: http.addUrl(url),
    method: 'post',
    data: http.addData(data, false, 'multipart/form-data')
  })
}








