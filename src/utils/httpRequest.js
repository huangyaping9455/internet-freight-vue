import Vue from 'vue'
import axios from 'axios'
import router from '@/router'
import qs from 'qs'
import merge from 'lodash/merge'
import { clearLoginInfo } from '@/utils'

const http = axios.create({
  timeout: 5000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  }
})

/**
 * 请求拦截
 */
http.interceptors.request.use(config => {
  config.headers.Authorization = Vue.cookie.get('Authorization') // 请求头带上token
  // config.headers['Authorization'] = " " // 请求头带上token
  return config
}, error => {
  return Promise.reject(error)
})

/**
 * 响应拦截
 */
http.interceptors.response.use(response => {
  if (response.data && response.data.code === 401) { // 401, token失效
    clearLoginInfo()
    router.push({ name: 'login' })
  }
  return response
}, error => {
  return Promise.resolve(error.response)
})

/**
 * 请求地址处理
 * @param {*} actionName action方法名称
 */
http.addUrl = (actionName) => {
  // 非生产环境 && 开启代理, 接口前缀统一使用[/proxyApi/]前缀做代理拦截!
  return (process.env.NODE_ENV !== 'production' && process.env.OPEN_PROXY ? '/proxyApi' : window.SITE_CONFIG.baseUrl) + actionName
}

/**
 * get请求参数处理
 * @param {*} params 参数对象
 * @param {*} openDefultParams 是否开启默认参数?
 */
http.addParams = (params = {}, openDefultParams = false) => {
  const defaults = {
    t: new Date().getTime()
  }
  return openDefultParams ? merge(defaults, params) : params
}

/**
 * post请求数据处理
 * @param {*} data 数据对象
 * @param {*} openDefultdata 是否开启默认数据?
 * @param {*} contentType 数据格式
 *  json: 'application/json; charset=utf-8'
 *  form: 'application/x-www-form-urlencoded; charset=utf-8'
 */
http.addData = (data = {}, openDefultdata = false, contentType = 'json') => {
  const defaults = {
    t: new Date().getTime()
  }
  data = openDefultdata ? merge(defaults, data) : data
  if (contentType === 'multipart/form-data') return data // 如果是文件类型不需要序列化
  return contentType === 'json' ? JSON.stringify(data) : qs.stringify(data)
}

/**
 *
 * @param data
 * @param openDefultheader
 * @param contentType
 * @returns {string|*}
 */
http.addHeaders = (data = {}, openDefultheader = false, contentType = 'json') => {
  const defaults = {
    t: new Date().getTime()
  }
  data = openDefultheader ? merge(defaults, data) : data
  return contentType === 'json' ? JSON.stringify(data) : qs.stringify(data)
}

export default http
