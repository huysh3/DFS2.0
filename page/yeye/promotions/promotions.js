Page({
  data: {
    coupon_status: ''
  },
  onShow() {
    var _this = this
    qcloud.request({
      login: true,
      url: domain + 'Home/coupon/coupon_status',
      success(res) {
        console.log(res.data)
        _this.setData({
          coupon_status: res.data.coupon_status
        })
      },
      fail(error) {
      }
    })
  }
})
