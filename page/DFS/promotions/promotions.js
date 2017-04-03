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
    promotion_list: [],
    img_list: [
      {
        url: "https://om536p71r.qnssl.com/In_Store_Promotions1.jpg",
        height: "577rpx"
      },
      {
        url: "https://om536p71r.qnssl.com/In_Store_Promotions2.jpg",
        height: "440rpx"
      },
      {
        url: "https://om536p71r.qnssl.com/In_Store_Promotions3.jpg",
        height: "443rpx"
      },
      {
        url: "https://om536p71r.qnssl.com/In_Store_Promotions4.jpg",
        height: "634rpx"
      },
      {
        url: "https://om536p71r.qnssl.com/In_Store_Promotions5.jpg",
        height: "240rpx"
      },
      {
        url: "https://om536p71r.qnssl.com/In_Store_Promotions6.jpg",
        height: "590rpx"
      },
      {
        url: "https://om536p71r.qnssl.com/In_Store_Promotions7.jpg",
        height: "357rpx"
      },
      {
        url: "https://om536p71r.qnssl.com/In_Store_Promotions8.jpg",
        height: "319rpx"
      },
      {
        url: "https://om536p71r.qnssl.com/In_Store_Promotions9.jpg",
        height: "292rpx"
      },
      {
        url: "https://om536p71r.qnssl.com/In_Store_Promotions10.jpg",
        height: "282rpx"
      },
      {
        url: "https://om536p71r.qnssl.com/In_Store_Promotions10.jpg",
        height: "299rpx"
      }
    ]
  },
  onLoad() {
    var _this = this
    qcloud.request({
      login: true,
      url: domain + 'Home/weapp/promotion_list',
      success(res) {
        _this.setData({
          promotion_list: res.data
        })
      },
      fail(error) {
      }
    })
  }
})
