Page({
  data: {
    shop_id: ''
  },
  onShow() {
    this.setData({
      shop_id: wx.getStorageSync('shop_id')
    })
  }
})
