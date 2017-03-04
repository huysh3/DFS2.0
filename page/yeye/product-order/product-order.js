import services from '../../../util/services'
var domain = 'https://15580083.qcloud.la/'
var qcloud = require('../../../vendor/qcloud-weapp-client-sdk/index');

var pageObject = {
  data: {
    unfinishedOrderList: '',
    historyOrderList: '',
    indexOrderList: '',
    orderInfo: '',
    order_id: '',
    useTime: '',
    menu_content: '',
    product_id: '',
    canUse: true
  },
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '我的订单'
    })
    this.getOrderById(options)
    this.setData({
      product_id: options.product_id
    })
  },
  useVoucher: function() {
    var _this = this
    wx.showModal({
      title: '确认收货',
      content: '请确认你本人已经到店，并已拿到相关商品',
      success: function(res) {
        if (res.confirm) {
          qcloud.request({
            url: domain + 'Home/order/order_finish',
            login: true,
            data: {
              order_id: _this.data.order_id
            },
            success(res) {
              if (res.data == 'success') {
                _this.setData({
                  canUse: false
                })
              }
              console.log(res)
            }
          })
        }
      }
    })

  },
  getOrderById: function(options) {
    var _this = this
    _this.setData({
      order_id: options.order_id
    })
    qcloud.request({
      url: domain + 'Home/weapp/order_info',
      data: {
        order_id: options.order_id
      },
      success(res) {
        _this.setData({
          orderInfo: res.data
        })
        if (res.data.finished_time) {
          _this.setData({
            useTime: res.data.finished_time,
            canUse: false
          })
        }
      }
    })
  },
  phoneCall: function() {
    var _this = this
    wx.makePhoneCall({
      phoneNumber: _this.data.orderInfo.shop.contact_phone
    })
  },
  refundCall: function() {
    wx.makePhoneCall({
      phoneNumber: ''
    })
  }
}

Page(pageObject)
