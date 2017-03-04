import services from '../../../util/services'

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
    this.getOrderList(options)
    this.getProductInfo(options)
    this.setData({
      product_id: options.product_id
    })
  },
  useVoucher: function() {
    var _this = this
    wx.showModal({
      title: '确认核销',
      content: '请确认你本人已经到店，套餐核销后不可撤销',
      success: function(res) {
        if (res.confirm) {
          // 核销
        }
      }
    })

  },
  getOrderList: function(options) {
    var orderLists = []
    var _this = this
    var order_id = options.order_id
    this.setData({order_id: options.order_id})
    services.fetch({
      url: '',
      method: 'GET'
    }).then(res => {
      this.setData({unfinishedOrderList: res.data.data})
      this.setData({indexOrderList: this.data.unfinishedOrderList})
      services.fetch({
        url: '',
        method: 'GET'
      }).then(res => {
        this.setData({historyOrderList: res.data.data})
        wx.stopPullDownRefresh()
        orderLists = this.data.unfinishedOrderList.concat(this.data.historyOrderList)
        var length = orderLists.length
        for (var i = 0; i < length; i ++) {
          if (orderLists[i].object.id == order_id) {
            this.setData({orderInfo: orderLists[i]})
          }
        }
        if (this.data.orderInfo.object.status) {
          this.setData({
            canUse: false,
            useTime: _this.data.orderInfo.object.use_at
          })
        } else {
          this.setData({canUse: true})
        }
      })
    })
  },
  getProductInfo: function(options) {
    console.log(options.product_id)
    // getProductInfo
  },
  phoneCall: function() {
    var _this = this
    wx.makePhoneCall({
      phoneNumber: _this.data.orderInfo.object.product.shop.consumer_contact_phone
    })
  },
  refundCall: function() {
    wx.makePhoneCall({
      phoneNumber: '15019904962'
    })
  }
}

Page(pageObject)
