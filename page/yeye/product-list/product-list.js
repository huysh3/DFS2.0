var domain = 'https://15580083.qcloud.la/'
var qcloud = require('../../../vendor/qcloud-weapp-client-sdk/index');

var pageObject = {
  data: {
    "lists": []
  },
  onLoad: function(options) {
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
      login: true,
      url: domain + 'Home/weapp/product_list',
      data: {
        class_name: options.class_name
        //class_name: 'Bags'
      },
      success(res) {
        console.log(res.data)
        _this.setData({lists: res.data})
      },
      fail(error) {
      }
    })

  }
}

Page(pageObject)
