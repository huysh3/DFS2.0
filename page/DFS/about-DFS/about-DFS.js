var domain = 'https://15580083.qcloud.la/'
var qcloud = require('../../../vendor/qcloud-weapp-client-sdk/index');

Page({
  data: {
    "lists": '',
    coupon_status: '',
    footbarState: {
      tabStatus: 'aboutDFS',
      cartBadgeNum: wx.getStorageSync('cartBadgeNum')
    }
  },
  onShow: function() {
    var _this = this
    this.setData({ "footbarState.cartBadgeNum": wx.getStorageSync('cartBadgeNum') })
    wx.setStorageSync('tabStatus', 'aboutDFS')
    qcloud.request({
      // login: true,
      url: domain + 'Home/coupon/coupon_status',
      success(res) {
        _this.setData({
          coupon_status: res.data.coupon_status
        })
      },
      fail(error) {
      }
    })
  },
  onShareAppMessage: function () {
    return {
      title: 'DFS购物微信小程序',
      path: '/page/DFS/about-DFS/about-DFS',
      success: function(res) {
        // 分享成功
      },
      fail: function(res) {
        // 分享失败
      }
    }
  }
})
