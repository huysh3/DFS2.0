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

// 显示失败提示
var showModel = (title, content) => {
    wx.hideToast();
    wx.showModal({
        title,
        content: JSON.stringify(content),
        showCancel: false
    });
};

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
    price: '',
    total_price: '',
    inputCaptcha: '',
    counter: 1,
    carousels: [
      'https://om536p71r.qnssl.com/tips_pic%20white.png',
      'https://om536p71r.qnssl.com/new_Slide2.png'
    ],
    modalStatus: false
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
      url: domain + 'Home/order/addCart',
      method: 'get',
      data: {
        product_id: _this.data.product_id,
        shop_id: _this.data.shop_id,
        price: _this.data.price,
        number: _this.data.counter
      },
      success(res) {
        if (res.data == 'success') {
          wx.hideToast();
          _this.setData({
            orderList: '',
            total_price: 0,
            modalStatus: true
          })
          setTimeout(function() {
            _this.setData({
              modalStatus: false
            })
          }, 2000)
        } else {
          showModel('加车失败', res.data);
        }
      },
      fail(error) {
        showModel('请求失败', 'error');
      }
    })
  },
  decr: function() {
    var _this = this
    if (_this.data.counter > 0) {
      this.setData({
        counter: _this.data.counter - 1,
        total_price: _this.data.counter * this.data.price
      })
    }
  },
  incr: function() {
    var _this = this
    this.setData({
      counter: _this.data.counter + 1,
      total_price: _this.data.counter * this.data.price
    })
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
            product_id: response.data.id,
            price: response.data.price
          })
          _this.setData({product: response.data})
        },
        fail: (err) => {
        }
    });
  },
  previewImgs: function(e) {
    var _this = this
    console.log(e.currentTarget.dataset.url)
    wx.previewImage({
      current: e.currentTarget.dataset.url,
      urls: _this.data.product.banner_image_urls
    })
  },
  phoneCall: function() {
    var _this = this
    wx.makePhoneCall({
      phoneNumber: _this.data.product.shop.contact_phone //仅为示例，并非真实的电话号码
    })
  }
}

Page(pageObject)
