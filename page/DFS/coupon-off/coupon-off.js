Page({
  data: {
    tabStatus: wx.getStorageSync('tabStatus'),
    shop_id: ''
  },
  onShow: function() {
    this.setData({
      tabStatus: wx.getStorageSync('tabStatus'),
      shop_id: wx.getStorageSync('shop_id')
    })
  }
})
