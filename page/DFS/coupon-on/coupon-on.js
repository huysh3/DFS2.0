var domain = 'https://15580083.qcloud.la/'
var qcloud = require('../../../vendor/qcloud-weapp-client-sdk/index');

Page({
  data: {
    qrcodeState: false,
    qrCodeSrc: '../../../image/QRCode1.png',
    inputStatus: true
  },
  onShow: function() {
    var _this = this
  },
  judgeQrcode: function(e) {
    var _this = this
    if (e.detail.value === '330') {
      wx.hideKeyboard()
      qcloud.request({
        login: true,
        url: domain + 'Home/Coupon/couponChange',
        success(res) {
          _this.setData({
            qrcodeState: true,
            qrCodeSrc: 'https://om536p71r.qnssl.com/truecouponqrcode.png',
            inputStatus: false
          })
        },
        fail(error) {
          console.log(error)
        }
      })
    }
    setTimeout(function() {
      _this.setData({
        qrCodeSrc: '../../../image/QRCode1.png'
      })
    }, 30000)
  }
})
