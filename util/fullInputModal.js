var domain = 'https://15580083.qcloud.la/'

var callPay = function(order_id) {
  var _this = this
  wx.request({
      url: domain + 'Test/Wechatpay/callPay',
      // url: domain + 'Pay/Wechatpay/callPay',
      data: {
          order_id: order_id,
          uid: wx.getStorageSync('uid'),
          shop_id: wx.getStorageSync('shop_id')
      },
      success(res) {
          wx.hideToast();
          console.log(res.data.data.timeStamp)
          if (res.data.result == 'success') {
              wx.requestPayment({
                  'timeStamp': res.data.data.timeStamp,
                  'nonceStr': res.data.data.nonceStr,
                  'package': res.data.data.package,
                  'signType': res.data.data.signType,
                  'paySign': res.data.data.paySign,
                  'success': function() {
                      // 支付成功
                      wx.setStorageSync('cartBadgeNum', 0)
                      _this.setData({
                          orderList: '',
                          total_price: 0,
                          total_price_rmb: 0,
                          "footbarState.cartBadgeNum": 0
                      })
                      _this.setData({
                          "modalProps.text": '订单已经生成，请到夏威夷T广场免税店4层提货处提货，如有任何问题请与客服联系。谢谢惠顾！',
                          doneModalStatus: true
                      })
                  },
                  'fail': function(res) {
                      showModel('支付失败', '请重新尝试支付')
                  }
              })
          } else {
              showModel('拉起支付失败', res.data.result)
          }
      }
  })
}

module.exports.callPay = callPay
