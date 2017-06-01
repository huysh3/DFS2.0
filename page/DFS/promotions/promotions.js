var domain = 'https://15580083.qcloud.la/'
var qcloud = require('../../../vendor/qcloud-weapp-client-sdk/index');

// 显示繁忙提示
var showBusy = text => wx.showToast({
    title: text,
    icon: 'loading',
    duration: 10000
});

// 显示成功提示
var showSuccess = text => wx.showToast({
    title: text,
    icon: 'success'
});

// 显示失败提示
var showModel = (title, content) => {
    wx.hideToast();
    wx.showModal({
        title,
        content: JSON.stringify(content),
        showCancel: false
    });
};

Page({
  data: {
    promotion_list: []
  },
  onLoad() {
    var _this = this
    wx.request({
      url: domain + 'V2/weapp/promotion_list',
      data: {
        shop_id: wx.getStorageSync('shop_id')
      },
      success(res) {
        _this.setData({
          promotion_list: res.data.data
        })
      },
      fail(error) {
      }
    })
  }
})
