var domain = 'https://15580083.qcloud.la/'
var qcloud = require('../../../vendor/qcloud-weapp-client-sdk/index');

Page({
  data: {
    qrcodeState: false,
    qrCodeSrc: '../../../image/QRCode1.png'
  },
  onShow: function() {
    var _this = this
  },
  judgeQrcode: function(e) {
    var _this = this
    if (e.detail.value === '347892') {
      wx.hideKeyboard()
      _this.setData({
        qrcodeState: true,
        qrCodeSrc: '../../../image/QRCode2.png'
      })
    }
    setTimeout(function() {
      _this.setData({
        qrCodeSrc: '../../../image/QRCode1.png'
      })
    }, 30000)
  }
})
