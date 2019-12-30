import axios from 'axios'
import qs from 'qs'

const dataApi = axios.create();

//定义请求地址
const host = 'http://store.cmsya.com/';

// 时间戳
const NewTimeStamp = new Date().getTime();

dataApi.defaults.timeout = 30000;
dataApi.defaults.headers.post[ 'Content-Type' ] = 'application/x-www-form-urlencoded;charset=UTF-8';
// dataApi.defaults.withCredentials=true;//让ajax携带cookie

dataApi.defaults.adapter = function (config) {


  wx.showLoading({
    title: '加载中' // 数据请求前loading
  })

  return new Promise((resolve, reject) => {
    // console.log(config,'adapter')
    let data = config.method === 'get' ? config.params : qs.stringify(config.data)
    // wx小程序 发起请求相应 log 就可以看到熟悉的返回啦
    wx.request({
      url:host + config.url,
      method:config.method,
      data:data,
      success:(res)=>{ 
        wx.hideLoading()
        return resolve(res)
      },
      fail:(err)=>{
        wx.hideLoading()
        return reject(err)
      }
    })
  })
}
// axios 拦截器
function Instance () {
  //请求拦截器
  dataApi.interceptors.request.use(function ( request ) {
    // request.headers.token = 'token=11124654654687';
    // console.log(request) //请求成功
    return request
  }, function ( error ) {
    // console.log(error); //请求失败
    return Promise.reject(error);
  });
  
  // 添加响应拦截器
  dataApi.interceptors.response.use(function ( response ) {
    // console.log(response.data.data) //响应成功
    return response;
  }, function ( error ) {
    // console.log(error); //响应失败
    return Promise.reject(error);
  });
}

Instance()

function get (url,params) {
  return axios({
    method:'get',
    url:url,
    params:params
  })
}
function post (url,params) {
  return axios({
    method:'post',
    url:url,
    data:params
  })
}

export default dataApi
