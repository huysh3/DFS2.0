// 引入 QCloud 小程序增强 SDK
var qcloud = require('./vendor/qcloud-weapp-client-sdk/index');
var config = require('./config');

// 显示繁忙提示
var showBusy = text => wx.showToast({
    title: text,
    icon: 'loading',
    duration: 10000
});

// 显示成功提示
var showSuccess = text => wx.showToast({
    title: text,
    icon: 'success'
});

// 显示失败提示
var showModel = (title, content) => {
    wx.hideToast();
    wx.showModal({
        title,
        content: JSON.stringify(content),
        showCancel: false
    });
};

App({
  onShow: function () {
    qcloud.setLoginUrl(config.service.loginUrl);
    this.doLogin()
  },
  doLogin: function() {
      showBusy('正在登录');
      // 登录之前需要调用 qcloud.setLoginUrl() 设置登录地址，不过我们在 app.js 的入口里面已经调用过了，后面就不用再调用了
      qcloud.login({
          success(result) {
              showSuccess('登录成功');
              console.log('登录成功', result);
          },
          fail(error) {
              showModel('登录失败', error);
          }
      });
  },
  globalData: {
    hasLogin: false,
    session_id: '',
    userinfo: '',
    user: ''
  }
})
