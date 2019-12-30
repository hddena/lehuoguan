<template>
  <div>
    <div><camera device-position="back" flash="off" binderror="error" style="width: 100%; height: 300px;"></camera></div>
    <h1 @click="onCamera">打开摄像头</h1>
    <div class="userinfo" @click="bindViewTap">
      <img class="userinfo-avatar" v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" background-size="cover" />
      <img class="userinfo-avatar" src="/static/images/user.png" background-size="cover" />
      <h1>Title</h1>
      <div class="userinfo-nickname">
        <card :text="userInfo.nickName"></card>
      </div>
    </div>

    <div class="opendata">
      <open-data type="userAvatarUrl"></open-data>
      <open-data type="userNickName"></open-data>
    </div>
    <div class=userIn>

      <button open-type="getUserInfo" @getuserinfo="bindGetUserInfo">授权登录</button>

      <button open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">获取微信手机号</button>


      <button v-if="!hasUserInfo && canIUse" open-type="getUserInfo" bindgetuserinfo="getUserInfo"> 1获取头像昵称 </button>

      <block v-else>
        <image bindtap="getUserInfo" class="userinfo-avatar" :src="userInfo.avatarUrl" mode="cover"></image>
        <text class="userinfo-nickname">{{userInfo.nickName}}</text>
      </block>

    </div>
    <div class="usermotto">
      <div class="user-motto">
        <card :text="motto"></card>
      </div>
    </div>

    <form class="form-container">
      <input type="text" class="form-control" :value="motto" placeholder="v-model" />
      <input type="text" class="form-control" v-model="motto" placeholder="v-model" />
      <input type="text" class="form-control" v-model.lazy="motto" placeholder="v-model.lazy" />
    </form>

    <a href="/pages/counter/main" class="counter">去往Vuex示例页面</a>

    <div class="all">
        <div class="left">
        </div>
        <div class="right">
        </div>
    </div>
    <!-- 使用组件 -->
    <tab-bar :selectNavIndex="0"></tab-bar>
  </div>
</template>

<script>
//import Util from '@/util/common.js'
import Util from '@/utils/common'          //common
import card from '@/components/card'
import tabBar from '@/common/tabBar'

export default {
  data () {
    return {
      motto: 'Hello miniprograme',

      userInfo: {
        nickName: 'mpvue',
        avatarUrl: 'http://mpvue.com/assets/logo.png'
      },
      listData:'',

    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    newsList:null
    }
  },

  components: {
    card,
    tabBar
  },
  mounted: function() {
    let t = this ;
    t.$nextTick(function() {
      t.getTestData();
      t.getSetting();
      //console.log(t.$dataApi);
      t.getDetail();

    });
  },
  methods: {
    getDetail(){
      let t = this;
      Util.detail(t,'81419924-565e-4285-a1ee-1c13a786bc62').then((value) => { // 获取当前用户信息（会员）
        //t.newsList = value.data;
        console.log(value.data);
      });
    },

    getTestData () {
      let t = this;
      Util.testData(t,'e24c07e9-c24b-4275-8c7e-4809bb77dec3').then((value) => { // 获取当前用户信息（会员）
        // console.log(value.data);
      });
    },


    bindViewTap () {

      let id = 123654
      const url = '../parameter/main?id=' + id;

      mpvue.navigateTo({ url });
/*
      console.log(mpvuePlatform);
      if (mpvuePlatform === 'wx') {
        mpvue.switchTab({ url });
      } else {
        mpvue.navigateTo({ url });
      }
      */
    },

    // 获取用户信息 https://blog.csdn.net/SupperPigger/article/details/90482065
    bindGetUserInfo(e) {
      console.log(e.mp.detail);
      // console.log(e.mp.detail.rawData)
      if (e.mp.detail.rawData){
        //用户按了允许授权按钮
        console.log('用户按了允许授权按钮')
      } else {
        //用户按了拒绝按钮
        console.log('用户按了拒绝按钮')
      }
    },
    getPhoneNumber(e) {
      console.log(e.mp.detail)
      console.log(e.mp.detail.errMsg)
      console.log(e.mp.detail.iv)
      console.log(e.mp.detail.encryptedData)
    },
    clickHandle (ev) {
      console.log('clickHandle:', ev)
      // throw {message: 'custom test'}
    },
    onCamera(){
      wx.createCameraContext();
      console.log('onCamera');
    },


    getSetting(){
      //console.log('getSetting');
      wx.getSetting({
        success: function(res){
          if (res.authSetting['scope.userInfo']) {
            wx.getUserInfo({
              success: function(res) {
                console.log(res.userInfo);
                //用户已经授权过
                console.log('用户已经授权过')
              }
            })
          }else{
            console.log('用户还未授权过')
          }
        }
      })

    },
    getUserInfo1(){
      console.log('click事件首先触发')
      // 判断小程序的API，回调，参数，组件等是否在当前版本可用。  为false 提醒用户升级微信版本
      // console.log(wx.canIUse('button.open-type.getUserInfo'))
      if(wx.canIUse('button.open-type.getUserInfo')){
        // 用户版本可用
      }else{
        console.log('请升级微信版本')
      }
    },



  created () {
    // let app = getApp()
  }
}
}
</script>

<style scoped>
.userinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.userinfo-avatar {
  width: 128rpx;
  height: 128rpx;
  margin: 20rpx;
  border-radius: 50%;
}

.userinfo-nickname {
  color: #aaa;
}

.usermotto {
  margin-top: 150px;
}

.form-control {
  display: block;
  padding: 0 12px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
}
.all{
  width:7.5rem;
  height:1rem;
  background-color:blue;
}
.all:after{
  display:block;
  content:'';
  clear:both;
}
.left{
  float:left;
  width:3rem;
  height:1rem;
  background-color:red;
}

.right{
  float:left;
  width:4.5rem;
  height:1rem;
  background-color:green;
}
</style>
