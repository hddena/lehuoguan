# mpvue

> A Mpvue project

## Build Setup

``` bash
# 初始化项目
vue init mpvue/mpvue-quickstart myproject
cd myproject

# 安装依赖
yarn

# 开发时构建
npm dev

# 打包构建
npm build

# 指定平台的开发时构建(微信、百度、头条、支付宝)
npm dev:wx
npm dev:swan
npm dev:tt
npm dev:my

# 指定平台的打包构建
npm build:wx
npm build:swan
npm build:tt
npm build:my

# 生成 bundle 分析报告
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).




# mpvue使用说明

http://mpvue.com/mpvue/

# 全局安装 vue-cli
$ npm install --global vue-cli

# 创建一个基于 mpvue-quickstart 模板的新项目
$ vue init mpvue/mpvue-quickstart my-project

# 安装依赖
$ cd my-project
安装【stylus】，下面的插件需要用到
$ npm install stylus -g
安装【axios】,api请求数据时需要用到
$ npm install --save axios
https://blog.csdn.net/Vanilla1119/article/details/88665019

npm install qs

$ npm install
# 启动构建
$ npm run dev

# 添加新页面
需要在根目录【app.json】添加新页面的路径
并需要重新运行一次【npm run dev】

# 【页面跳转】，微信小程序官方文档都有介绍
带【参数】传值跳转页面时必须使用【wx.navigateTo】，这个是重点
新页面可在【this.$root.$mp.query】查看
wx.switchTab(Object object) 只能跳转 tabBar 页面 ，还不能带参数
跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面




# 如果tabBar需要自定义需要重新改造，可参考下面案例
https://github.com/txn513/mpvue-tabBar.git
案例中有【stylus】、【stylus-loader】
需要安装【npm install stylus -g】

案例中还对【IphoneX】用vuex做了兼容的处理，还需要注意页面中是否有【vuex】的引入

如果需要修改页面中的标题需要在同级目录下的【main.js】中的“ navigationBarTitleText ” 上修改



Axure 项目原型图
https://fchqpn.axshare.com/

快速上手
http://mpvue.com/mpvue/quickstart.html

微信小程序开发文档
https://developers.weixin.qq.com/miniprogram/dev/api/open-api/user-info/wx.getUserInfo.html

mpvue——API请求封装(小程序原生)
https://www.cnblogs.com/wangyang0210/p/10436833.html
https://blog.csdn.net/qq_38867237/article/details/90374209

mpvue页面跳转及传值
https://cloud.tencent.com/developer/article/1401177

mpvue使用过程中注意事项和不支持的语法
https://www.jianshu.com/p/8aef9d6510f6

mpvue 微信小程序 获取用户权限open-type="getUserInfo"
https://blog.csdn.net/weixin_36934930/article/details/80706820