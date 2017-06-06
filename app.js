// 引入 QCloud 小程序增强 SDK
var qcloud = require('./vendor/qcloud-weapp-client-sdk/index');
var config = require('./config');
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

App({
  onShow: function () {
    qcloud.setLoginUrl(config.service.loginUrl);
    this.doLogin()
    this.getCartBadge()
    if (!wx.getStorageSync('shop_id')) {
      wx.setStorageSync('shop_id', '1')
    }
    if (wx.getStorageSync('adult') === "") {
      setTimeout(function () {
        wx.showModal({
          title: '是否已满21岁？',
          content: '本平台均为免税品，持国际机票的旅客,可免8.75%商品消费税. 未年满21周岁的顾客不可浏览或购买烟酒. 畅销产品，低价保障！',
          success: function (res) {
            if (res.confirm) {
              wx.setStorageSync('adult', 1)
            } else if (res.cancel) {
              wx.setStorageSync('adult', 0)
            }
          }
        })
      }, 1000)
    }
  },
  doLogin: function() {
      showBusy('正在登录');
      // 登录之前需要调用 qcloud.setLoginUrl() 设置登录地址，不过我们在 app.js 的入口里面已经调用过了，后面就不用再调用了
      qcloud.login({
          success(result) {
              showSuccess('登录成功');
              console.log('登录成功', result);
              qcloud.request({
                url: 'https://15580083.qcloud.la/V2/weapp/getUid',
                success(response) {
                  console.log(response)
                  wx.setStorageSync('uid', response.data.data)
                }
              })
          },
          fail(error) {
              showModel('登录失败', error);
          }
      });
  },
  getCartBadge: function() {
    var _this = this
    wx.request({
      url: 'https://15580083.qcloud.la/V2/weapp/getCartNumber',
      data: {
        uid: wx.getStorageSync('uid'),
        shop_id: wx.getStorageSync('shop_id')
      },
      success(res) {
        _this.cartBadgeNum = res.data.data
        wx.setStorageSync('cartBadgeNum', res.data.data)
      },
      fail(error) {
        showModel('获取数据失败', error)
      }
    });
  },
  cartBadgeNum: 0
})
