// 官方文档 https://developers.weixin.qq.com/miniprogram/dev/api/network/request/wx.request.html

// https://blog.csdn.net/Vanilla1119/article/details/88665019
//axios.js文件
//注意这里需这么导入，否则可能报错
// import axios from '../../node_modules/axios/dist/axios'
import axios from 'axios'
import qs from 'qs'

//定义请求地址
const host = 'http://store.cmsya.com/';

// 时间戳
//const NewTimeStamp = new Date().getTime()

// axios全局设置
const dataApi = axios.create({
 baseURL: process.env.BASE_API,
 timeout: 1000 * 60 * 10,
 responseType: 'json'
})

// axios.defaults.timeout = 30000

//dataApi.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
//dataApi.defaults.headers.post['Content-Type'] = 'multipart/form-data';
// dataApi.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
//dataApi.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest'
// dataApi.defaults.withCredentials=true;//让ajax携带cookie

//划重点！ 由于微信小程序需要用微信官方请求接口，因此需要用adapter自定义
dataApi.defaults.adapter = function (config) {
// let baseURL = process.env.BASE_API

//let data = config.method === 'get' ? config.params : qs.stringify(config.data)
//let headers = config.headers != 'get' ? config.params : qs.stringify(config.data)

// 发交易之前显示加载中
wx.showLoading({
 title: '拼命加载中...'
})
return new Promise((resolve, reject) => {
 wx.request({
   url: host + config.url,
   method: config.method,
   data: config.params,
   header: config.headers,
   success: (res) => {
     return resolve(res)
   },
   fail: (err) => {
     return reject(err)
   },
   complete: res => {
     wx.hideLoading()
     // TODO:
     }
   })
 })
}

// axios请求拦截
dataApi.interceptors.request.use(
 config => {
 // 若是有做鉴权token , 就给头部带上token
 // let token = window.sessionStorage.getItem(__TOKEN_KEY__)
 // if (token) {
 //   config.headers.Authorization = `Bearer ${token}`
 // }
   return config
 },
 error => {
   sendError(error)
   return Promise.reject(error.data)
 }
)

// axios 响应拦截，对响应的状态处理
dataApi.interceptors.response.use(
//   function (response) {
//     console.log(response.data.data) // 响应成功
//     return response
//   },
//   function (error) {
//     // console.log(error); //响应失败
//     return Promise.reject(error)
//   })
 res => {
 // 200,204为处理成功
 //注意这里statusCode有可能微信的ts声明文件里未定义，需要去声明文件里定义一下
   if ([200, 204].indexOf(res.statusCode) === -1) {
     console.log('res.status', res)
     sendError(res)
     return Promise.reject(res.data)
   }
   return res
 },
 error => {
   sendError(error)
   return Promise.reject(error)
 })

 export default dataApi   // axios 暴露

//封装fetch并暴露
export function fetch (options) {
 return new Promise((resolve, reject) => {
   Axios(options)
     .then(response => {
       resolve(response)
     })
     .catch(error => {
       reject(error)
     })
 })
}
/**
* 此处为捕获到的异常，可以将此异常提交给Vuex的Store或者使用微信组件弹出
*
* @param {any} error
*/
function sendError (error) {
 let type = new Date().getMilliseconds()
 let data = []
 var msg = '发生错误'
 console.log(msg)
 if (error.data) {
   data = error.data.errors
   msg = error.data.message
 } else if (error.response) {
   data = error.response.data
   msg = data.message
 } else {
   msg = error.message
 }
 let errorData = {
   type,
   data,
   message: msg
 }
 console.log(errorData)
 // 1。store.dispatch('error/appendError', errorData)
 // 2。弹出
 wx.showToast({
   title: errorData.message,
   icon: 'none',
   duration: 3000,
   complete: (res) => {
   }
 })
}
