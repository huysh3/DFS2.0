import services from '../../../util/services'
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

var pageObject = {
  data: {
    "product": {},
    imgUrls: [],
    indicatorDots: true,
    countdown: 60,
    user: '',
    autoplay: true,
    interval: 5000,
    duration: 400,
    modalState: false,
    inputPhoneNumber: '',
    hasSend: false,
    shop_id: '',
    product_id: '',
    inputCaptcha: ''
  },
  onLoad: function(options) {
    wx.setNavigationBarTitle({title: '套餐详情'})
    this.getProductInfo(options)
  },
  buyBtnEvent: function() {
    showBusy('正在通信..');
    var _this = this
    qcloud.request({
      login: true,
      url: domain + 'Home/order/pay',
      method: 'get',
      data: {
        product_id: _this.data.product_id,
        shop_id: _this.data.shop_id
      },
      success(res) {
        if (res.data == 'success') {
          showSuccess('加入购物车');
        } else {
          showModel('请求失败', error);
        }
      },
      fail(error) {
        showModel('请求失败', error);
      }
    })
  },
  checkMobile: function(str) {
    var re = /^1\d{10}$/;
    if (re.test(str)) {
      return true;
    } else {
      return false;
    }
  },
  countDownEvent: function() {
    var _this = this
    var sendPhoneCodeInterval = setInterval(function() {
      if (_this.data.countdown == 0) {
        clearInterval(sendPhoneCodeInterval)
        _this.setData({
          countdown: 60,
          hasSend: false
        })
      } else {
        _this.setData({
          countdown: _this.data.countdown - 1
        })
      }
    }, 1000)
  },
  // routerGoOrderConfirm: function() {
  //   var _this = this
  //   wx.navigateTo({
  //     url: '/page/yeye/order-confirm/order-confirm?product_id=' + _this.data.product.id
  //   })
  // },
  // onPullDownRefresh: function() {
  //   wx.showToast({
  //     title: '刷新成功',
  //     icon: 'success',
  //     duration: 1000
  //   })
  // },
  // onShareAppMessage: function () {
  //   return {
  //     title: '夜夜 | 精选套餐',
  //     desc: '撸起袖子加油干',
  //     path: 'page/yeye/product-list/product-list'
  //   }
  // },
  getProductInfo: function(options) {
    var _this = this
    qcloud.request({
        url: domain + 'Home/weapp/product_info',
        data: {
           product_id : options.product_id
        },
        method: 'get',
        success: (response) => {
          _this.setData({
            shop_id: response.data.shop.id,
            product_id: response.data.id
          })
          _this.setData({product: response.data})
        },
        fail: (err) => {
        }
    });
  },
  onShareAppMessage: function(options) {
    var _this = this
    return {
      title: _this.data.product.name,
      desc: '撸起袖子加油干' + _this.data.product.id,
      path: 'page/yeye/product/product?product_id=' + _this.data.product.id
    }
  },
  phoneCall: function() {
    var _this = this
    wx.makePhoneCall({
      phoneNumber: _this.data.product.shop.consumer_contact_phone //仅为示例，并非真实的电话号码
    })
  }
}

Page(pageObject)
