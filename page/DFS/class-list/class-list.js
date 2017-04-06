var domain = 'https://15580083.qcloud.la/'
var qcloud = require('../../../vendor/qcloud-weapp-client-sdk/index');
var app = getApp()

Page({
  data: {
    "lists": '',
    "promotionStatus": false,
    footbarState: {
      tabStatus: 'classList',
      cartBadgeNum: app.cartBadgeNum
    }
  },
  onShow: function() {
    var _this = this
    wx.setStorageSync('tabStatus', 'classList')
    this.setData({ "footbarState.cartBadgeNum": wx.getStorageSync('cartBadgeNum') })
    app.getCartBadge()
    qcloud.request({
      // login: true,
      url: domain + 'Home/weapp/class_list',
      success(res) {
        _this.setData({lists: res.data})
        setTimeout(function() {
          _this.setData({
            promotionStatus: true
          })
        }, 300)
      },
      fail(error) {
      }
    })
  },
  routerGoHome: function() {
    wx.redirectTo({
      url: '../about-DFS/about-DFS'
    })
  }
})
