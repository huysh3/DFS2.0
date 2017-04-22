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
    classList: [],
    shopList: [],
    beauty_list: [],
    selected_list: [],
    bags_list: [],
    shopInfo: {},
    autoplay: true,
    interval: 5000,
    duration: 400,    
    shopListState: false
  },
  onShow: function() {
    this.init()
  },
  init: function() {
    this.setData({ "footbarState.cartBadgeNum": wx.getStorageSync('cartBadgeNum') })
    wx.setStorageSync('tabStatus', 'aboutDFS')    
    this.getShopInfo()
    this.getShopList()
    this.getSlideShow()
    this.getCouponStatus()
  },
  getCouponStatus: function() {
    var _this = this
    wx.request({
      url: domain + 'Home/coupon/coupon_status',
      data: {
        shop_id: wx.getStorageSync('shop_id'),
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
  getShopList: function() {
    var _this = this
    wx.request({
      url: domain + 'Test/weapp/shopList',
      success(res) {
        console.log(res.data)
        _this.setData({
          shopList: res.data
        })
      }
    })
  },
  changeShopListState: function() {
    var state = this.data.shopListState
    state = !state
    this.setData({
      shopListState: state
    })
  },
  changeShop: function(event) {
    wx.setStorageSync('shop_id', event.currentTarget.dataset.id)
    this.changeShopListState()
    this.init()
  },
  getSlideShow: function() {
    var _this = this
    wx.request({
      url: domain + 'Test/Slideshow/getSlideShow',
      data: {
        shop_id: wx.getStorageSync('shop_id')
      },
      success(res) {
        console.log(res.data)
        if (!res.data.length) {
          _this.setData({
            selected_list: [],
            beauty_list: [],
            bags_list: [],
            watch_list: [],
            food_list: [],
            classList: []
          })
        }
        _this.setData({
          selected_list: res.data.special,
          beauty_list: res.data.Beauty,
          bags_list: res.data.Bags,
          watch_list: res.data['Watches/jewelry'],
          food_list: res.data['LocalFood/Snacks'],
          classList: res.data.class
        })
      }
    })
  },
  getShopInfo: function() {
    var _this = this
    wx.request({
      url: domain + 'Test/weapp/shopInfo',
      data: {
        shop_id: wx.getStorageSync('shop_id')
      },
      success(res) {
        console.log(res.data)
        _this.setData({
          shopInfo: res.data
        })
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
