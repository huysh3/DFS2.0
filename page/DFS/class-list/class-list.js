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
    },
    class_url: {
      'LocalFood/Snacks': 'http://ww4.sinaimg.cn/large/006tKfTcgy1fesmb1e06wj30af0960vc.jpg',
      'Beauty': 'http://ww3.sinaimg.cn/large/006tKfTcgy1fesmbrnemij30af09640b.jpg',
      'Watches/jewelry': 'http://ww1.sinaimg.cn/large/006tKfTcgy1fesmbvx2ibj30ae096q4q.jpg',
      'Bags': 'http://ww4.sinaimg.cn/large/006tKfTcgy1fesmc0dfepj30af096q4q.jpg'
    }
  },
  onShow: function() {
    var _this = this
    wx.setStorageSync('tabStatus', 'classList')
    this.setData({ "footbarState.cartBadgeNum": wx.getStorageSync('cartBadgeNum') })
    app.getCartBadge()
    wx.request({
      // login: true,
      // url: domain + 'Home/weapp/class_list',
      url: domain + 'Test/weapp/class_list',
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
      url: '../home/home'
    })
  }
})
