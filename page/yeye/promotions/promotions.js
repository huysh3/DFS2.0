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
    coupon_status: ''
  },
  onShow() {
    var _this = this
    qcloud.request({
      login: true,
      url: domain + 'Home/coupon/coupon_status',
      success(res) {
        console.log(res.data)
        _this.setData({
          coupon_status: res.data.coupon_status
        })
      },
      fail(error) {
      }
    })
  }
})
