var domain = 'https://15580083.qcloud.la/'
var qcloud = require('../../../vendor/qcloud-weapp-client-sdk/index');

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

Page({
  data: {
    indexList: [],
    orderInfo: {},
    tabStatus: wx.getStorageSync('tabStatus')
  },
  onShow() {
    this.setData({
      tabStatus: wx.getStorageSync('tabStatus')
    })    
  },
  onLoad(options) {
    var _this = this
    qcloud.request({
      url: domain + 'Home/weapp/order_info?order_id=' + options.order_id,
      login: true,
      success(res) {
        console.log(res.data)
        _this.setData({
          orderInfo: res.data
        })
      }
    })
  },
  routerGoHome: function() {
    wx.redirectTo({
      url: '../about-DFS/about-DFS'
    })
  }
})
