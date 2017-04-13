var domain = 'https://15580083.qcloud.la/'
var qcloud = require('../../../vendor/qcloud-weapp-client-sdk/index');

Page({
  data: {
    "lists": '',
    coupon_status: '',
    footbarState: {
      tabStatus: 'aboutDFS',
      cartBadgeNum: wx.getStorageSync('cartBadgeNum')
    },
    mockJson: {
      banner_img: [
        {
          img_url: '',
          navigator_url: '/page/DFS/coupon-on/coupon-on'
        },
        {
          img_url: '',
          navigator_url: ''
        },
        {
          img_url: '',
          navigator_url: ''
        },
      ],
      selected_products: [
        {
          product: {}
        },
        {
          product: {}
        },
        {
          product: {}
        }
      ],
      perfume: [
        {
          product: {}
        },
        {
          product: {}
        },
        {
          product: {}
        },
        // ...
      ],
      bags: [
        {
          product: {}
        },
        {
          product: {}
        },
        {
          product: {}
        },
        // ...
      ]
    }
  },
  onShow: function() {
    var _this = this
    this.setData({ "footbarState.cartBadgeNum": wx.getStorageSync('cartBadgeNum') })
    wx.setStorageSync('tabStatus', 'aboutDFS')
    wx.request({
      url: domain + 'Home/coupon/coupon_status',
      data: {
        uid: wx.getStorageSync('uid')
      },
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
      path: '/page/DFS/home/home',
      success: function(res) {
        // 分享成功
      },
      fail: function(res) {
        // 分享失败
      }
    }
  }
})
