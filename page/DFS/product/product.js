import services from '../../../util/services'
var domain = 'https://15580083.qcloud.la/'
var qcloud = require('../../../vendor/qcloud-weapp-client-sdk/index');
var app = getApp()

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
    inputPhoneNumber: '',
    hasSend: false,
    shop_id: '',
    product_id: '',
    price: '',
    total_price: '',
    inputCaptcha: '',

    fullInputModalState: false,
    inputConsignee: '',
    inputPSP: '',
    inputFLT: '',
    inputYear: '',
    inputMonth: '',
    inputDay: '',

    counter: 1,
    carousels: [
      'https://om536p71r.qnssl.com/tips_pic%20white.png',
      'https://om536p71r.qnssl.com/new_Slide2.png'
    ],
    modalProps: {
      title: '操作成功',
      text: ''
    },
    modalStatus: false
  },
  onLoad: function(options) {
    wx.setNavigationBarTitle({title: '商品详情'})
    this.getProductInfo(options)
  },
  buyBtnEvent: function() {
    showBusy('正在通信..');
    var _this = this
    wx.request({
      // url: domain + 'Home/order/addCart',
      url: domain + 'V1/order/addCart',
      method: 'get',
      data: {
        product_id: _this.data.product_id,
        shop_id: _this.data.shop_id,
        price: _this.data.price,
        number: _this.data.counter,
        shop_id: wx.getStorageSync('shop_id'),        
        uid: wx.getStorageSync('uid')
      },
      success(res) {
        if (res.data.code == '1') {
          wx.hideToast();
          _this.setData({
            orderList: '',
            total_price: 0,
            'modalProps.title': '已加入购物车',
            'modalProps.text': '请到购物车进行商品结算',
            modalStatus: true
          })
          wx.setStorageSync('cartBadgeNum', parseInt(wx.getStorageSync('cartBadgeNum')) + 1)
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
    if (_this.data.counter > 1) {
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
  modalHide() {
    this.setData({
      modalStatus: false
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
    wx.request({
        url: domain + 'V1/weapp/product_info',
        data: {
          product_id : options.product_id,
          adult: wx.getStorageSync('adult'),
          shop_id: wx.getStorageSync('shop_id')
        },
        method: 'get',
        success: (response) => {
          if (response.data.code != 1) {
            wx.showModal({
              title: '抱歉',
              content: response.data.msg,
              showCancel: false,
              success: function(res) {
                wx.navigateBack({
                  delta: 1
                })                
              }
            })            
          }
          _this.setData({
            shop_id: response.data.data.shop.id,
            product_id: response.data.data.id,
            price: response.data.data.price
          })
          _this.setData({product: response.data.data})
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
  },
  inputModalCancel: function() {
    this.setData({
      fullInputModalState: false
    })
  },
  buyNow: function() {
    var _this = this
    if (wx.getStorageSync('shop_id') == 1) {
      wx.request({
        url: domain + 'V1/order/buyNow',
        data: {
          product_id: _this.data.product_id,
          shop_id: _this.data.shop_id,
          price: _this.data.price,
          number: _this.data.counter,
          uid: wx.getStorageSync('uid')
        },
        success(res) {
          showBusy('正在通信..');
          _this.callPay(res.data)
        }
      })
    }
    if (wx.getStorageSync('shop_id') == 2) {
      _this.setData({
        fullInputModalState: true
      })
    }
  },
  confirmOrder() {
    var _this = this
    showBusy('正在通信..');
    _this.inputModalCancel()
    wx.request({
      url: domain + 'V1/order/buyNow',
      data: {
        product_id: _this.data.product_id,
        shop_id: _this.data.shop_id,
        price: _this.data.price,
        number: _this.data.counter,
        uid: wx.getStorageSync('uid'),
        consignee: _this.data.inputConsignee,
        psp_num: _this.data.inputPSP,
        flt_num: _this.data.inputFLT,
        birthdate: _this.data.inputYear + '-' + _this.data.inputMonth + '-' +  _this.data.inputDay          
      },
      success(res) {
        showBusy('正在通信..');
        _this.callPay(res.data.data)
      }
    })    
  },
  showBonusModal() {
    this.setData({
      bonusModalStatus: true
    })
  },
  hideBonusModal() {
    this.setData({
      bonusModalStatus: false
    })
  },
  bindConsigneeInput: function(e) {
    this.setData({ inputConsignee: e.detail.value })
  },
  bindPSPInput: function(e) {
    this.setData({ inputPSP: e.detail.value })
  },
  bindFLTInput: function(e) {
    this.setData({ inputFLT: e.detail.value })
  },
  bindYearInput: function(e) {
    this.setData({ inputYear: e.detail.value })
  },
  bindMonthInput: function(e) {
    // this.setData({ inputMonth: parseInt(e.detail.value) < 10 ? '0' + e.detail.value : e.detail.value })
    this.setData({ inputMonth: e.detail.value })
  },
  bindDayInput: function(e) {
    this.setData({ inputDay: e.detail.value })
  },  
  callPay(order_id) {
    var _this = this
    wx.request({
        url: domain + 'V1/Wechatpay/callPay',
        data: {
            order_id: order_id,
            shop_id: wx.getStorageSync('shop_id'),
            uid: wx.getStorageSync('uid')
        },
        success(res) {
            wx.hideToast();
            if (JSON.parse(res.data.data).result == 'success') {
                wx.requestPayment({
                    'timeStamp': JSON.parse(res.data.data).data.timeStamp,
                    'nonceStr': JSON.parse(res.data.data).data.nonceStr,
                    'package': JSON.parse(res.data.data).data.package,
                    'signType': JSON.parse(res.data.data).data.signType,
                    'paySign': JSON.parse(res.data.data).data.paySign,
                    'success': function() {
                        // 支付成功
                        _this.setData({
                            "modalProps.title": '支付成功',
                            "modalProps.text": '订单已经生成，请到夏威夷T广场免税店4层提货处提货，如有任何问题请与客服联系。谢谢惠顾！',
                            modalStatus: true
                        })
                    },
                    'fail': function(res) {
                        showModel('支付失败', '请重新尝试支付')
                    }
                })
            } else {
                showModel('拉起支付失败', JSON.parse(res.data.data).result)
            }
        }
    })
  }
}

Page(pageObject)
