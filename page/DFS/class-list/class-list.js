var domain = 'https://15580083.qcloud.la/'
var qcloud = require('../../../vendor/qcloud-weapp-client-sdk/index');

Page({
  data: {
    "lists": '',
    "promotionStatus": false
  },
  onShow: function() {
    var _this = this
    qcloud.request({
      login: true,
      url: domain + 'Home/weapp/class_list',
      success(res) {
        console.log(res.data)
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
    wx.switchTab({
      url: '../about-DFS/about-DFS'
    })
  }
})
