import Vue from 'vue'
import App from './App'
import store from './store/index'
// import Util from './utils/common'          //common
import dataApi from './utils/axios'       //http数据请求

Vue.prototype.$dataApi = dataApi;

Vue.config.productionTip = false
App.mpType = 'app'

Vue.prototype.$store = store
const app = new Vue(App)
app.$mount()
