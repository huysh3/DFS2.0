var domain = 'https://15580083.qcloud.la/'
var qcloud = require('../../../vendor/qcloud-weapp-client-sdk/index');

var pageObject = {
  data: {
    "lists": [],
    "tabStatus": wx.getStorageSync('tabStatus'),
    "class_name": ''
  },
  onShow: function() {
    this.setData({
      "tabStatus": wx.getStorageSync('tabStatus')
    })
  },
  onLoad: function(options) {
    this.setData({
      'class_name': options.class_name
    })
    wx.setNavigationBarTitle({
      title: '商品列表'
    })
    this.getProductList(options)
  },
  onPullDownRefresh: function() {
    this.getProductList()
    wx.showToast({
      title: '刷新成功',
      icon: 'success',
      duration: 1000
    })
  },
  getProductList: function(options) {
    var _this = this
    qcloud.request({
      // login: true,
      url: domain + 'Home/weapp/product_list',
      data: {
        class_name: options.class_name
        //class_name: 'Bags'
      },
      success(res) {
        _this.setData({lists: res.data})
      },
      fail(error) {
      }
    })
  },
  routerGoHome: function() {
    wx.redirectTo({
      url: '../about-DFS/about-DFS'
    })
  },
  onShareAppMessage: function () {
    var _this = this
    return {
      title: 'DFS购物商品列表',
      path: '/page/DFS/product-list/product-list?class_name=' + _this.data.class_name,
      success: function(res) {
        // 分享成功
      },
      fail: function(res) {
        // 分享失败
      }
    }
  }
}

Page(pageObject)