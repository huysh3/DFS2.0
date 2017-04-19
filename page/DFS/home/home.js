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
    beauty_list: [],
    selected_list: [],
    bags_list: []
  },
  onShow: function() {
    var _this = this
    this.setData({ "footbarState.cartBadgeNum": wx.getStorageSync('cartBadgeNum') })
    wx.setStorageSync('tabStatus', 'aboutDFS')
    this.getBanner()
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
    this.getSlideShow()
  },
  getSlideShow: function() {
    var _this = this
    wx.request({
      url: domain + 'Test/Slideshow/getSlideShow',
      success(res) {
        console.log(res.data)
        _this.setData({
          selected_list: res.data.special,
          beauty_list: res.data.Beauty,
          bags_list: res.data.Bags,
          watch_list: res.data['Watches/jewelry'],
          food_list: res.data['LocalFood/Snacks']
        })
      }
    })
  },
  getBanner: function() {
    var _this = this
    wx.request({
      url: domain + 'Test/Banner/getBanner',
      success(res) {
        console.log(res.data)

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
  },
  viewLocation: function() {
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function(res) {
        var latitude = 21.287834
        var longitude = -157.840876
        console.log(res)
        wx.openLocation({
          latitude: latitude,
          longitude: longitude,
          scale: 28
        })
      }
    })    
  }
})
