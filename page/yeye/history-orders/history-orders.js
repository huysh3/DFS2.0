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
    orderList: []
  },
  onShow() {
    var _this = this
    qcloud.request({
      url: domain + 'Home/weapp/order_list',
      login: true,
      success(res) {
        _this.setData({
          indexList: res.data
        })
        // console.log(_this.data.orderList)

        // console.log(_this.data.indexList)
      }
    })
  },
  routerGoOrder() {
    wx.navigateTo({
      url: "../history-order/history-order"
    })
  },
  routerGoHome: function() {
    wx.switchTab({
      url: '../about-DFS/about-DFS'
    })
  }
})
