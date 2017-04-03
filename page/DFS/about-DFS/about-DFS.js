var domain = 'https://15580083.qcloud.la/'
var qcloud = require('../../../vendor/qcloud-weapp-client-sdk/index');

Page({
  data: {
    "lists": '',
    coupon_status: ''
  },
  onShow: function() {
    var _this = this
    wx.setStorageSync('tabStatus', 'aboutDFS')
    qcloud.request({
      login: true,
      url: domain + 'Home/coupon/coupon_status',
      success(res) {
        _this.setData({
          coupon_status: res.data.coupon_status
        })
      },
      fail(error) {
      }
    })
  }
})
