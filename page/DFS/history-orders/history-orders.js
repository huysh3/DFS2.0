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
    orderList: [],
    tabStatus: 'historyOrders'
  },
  onShow() {
    var _this = this
    wx.setStorageSync('tabStatus', 'historyOrders')
    qcloud.request({
      url: domain + 'Home/weapp/order_list',
      // login: true,
      success(res) {
        _this.setData({
          indexList: res.data
        })
      }
    })
  },
  routerGoOrder() {
    wx.navigateTo({
      url: "../history-order/history-order"
    })
  },
  routerGoHome: function() {
    wx.redirectTo({
      url: '../about-DFS/about-DFS'
    })
  }
})
