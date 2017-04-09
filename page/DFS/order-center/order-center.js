import services from '../../../util/services'

var domain = 'https://15580083.qcloud.la/'
var qcloud = require('../../../vendor/qcloud-weapp-client-sdk/index');

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
    unfinishedOrderList: '',
    historyOrderList: '',
    indexOrderList: [],
    orderList: [],
    leftPartClass: 'header-left-part active',
    rightPartClass: 'header-right-part',
    tabState: 'left',
    total_price: '0',
    total_price_rmb: '0',
    inputPhoneNumber: '',
    doneModalStatus: false,
    inputModalState: false,
    needPay: false,
    modalProps: {
      text: ''
    },
    footbarState: {
      tabStatus: 'orderCenter',
      cartBadgeNum: wx.getStorageSync('cartBadgeNum')
    }
  },
  onShow: function() {
    var _this = this
    this.getCartList()
    wx.setStorageSync('tabStatus', 'orderCenter')
    this.setData({ "footbarState.cartBadgeNum": wx.getStorageSync('cartBadgeNum') })
  },
  onLoad: function() {
  },
  getCartList: function() {
    var orderLists = []
    var _this = this
    wx.request({
      url: domain + 'Home/weapp/cart_list',
      data: {
        uid: wx.getStorageSync('uid')
      },
      success(res) {
        if (res.data.length == 0) {
          return false;
        }
        var temp = 0
        var temp_rmb = 0
        res.data.map(function(index) {
          temp = temp + parseInt(index.order.price)
          temp_rmb = temp_rmb + parseInt(index.product.RMB) * parseInt(index.order.number)
        })
        _this.setData({
          orderList: res.data,
          total_price: temp,
          total_price_rmb: temp_rmb
        })
      },
      error(res) {
        console.log(res.data)
      }
    })
  },
  showHistoryOrderList: function() {
    this.setData({indexOrderList: this.data.historyOrderList})
    this.setData({
      rightPartClass: 'header-right-part active',
      leftPartClass: 'header-right-part',
      tabState: 'right'
    })
  },
  showUnfinishedOrderList: function() {
    this.setData({indexOrderList: this.data.unfinishedOrderList})
    this.setData({
      rightPartClass: 'header-right-part',
      leftPartClass: 'header-right-part active',
      tabState: 'left'
    })
  },
  // 需要支付
  // 无需手机号弹窗
  handleConfirmBtn: function() {
    var _this = this
    if (this.data.orderList.length == 0) {
      showModel('尚无商品', '请先去商品目录挑选商品');
      return false;
    }
    showBusy('正在通信..');
    wx.request({
      url: domain + 'Home/order/combineOrder',
      data: {
        uid: wx.getStorageSync('uid')
      },
      success(res) {
        if(res.data) {
          wx.setStorageSync('cartBadgeNum', 0)
          _this.setData({
            orderList: '',
            total_price: 0,
            total_price_rmb: 0,
            "footbarState.cartBadgeNum": 0
          })
          _this.callPay(res.data)
        }
      }
    })
  },
  // 无需支付
  // 预购订单用confirm，手机号弹窗
  handleCombineBtn: function() {
    if (this.data.orderList.length == 0) {
      showModel('尚无商品', '请先去商品目录挑选商品');
      return false;
    }
    this.setData({
      inputModalState: true,
      needPay: false
    })
  },
  inputModalCancel: function() {
    this.setData({
      inputModalState: false
    })
  },
  bindKeyInput: function(e) {
    this.setData({
      inputPhoneNumber: e.detail.value
    })
  },
  confirmOrder: function() {
    this.setData({
      inputModalState: false
    })
    showBusy('正在通信..');
    var _this = this
    wx.request({
      url: domain + 'Home/order/confirmOrder',
      data: {
        phone: _this.data.inputPhoneNumber,
        uid: wx.getStorageSync('uid')
      },
      success(res) {
        if(res.data) {
          // showSuccess('订单已提交');
          wx.setStorageSync('cartBadgeNum', 0)
          _this.setData({
            orderList: '',
            total_price: 0,
            total_price_rmb: 0,
            "footbarState.cartBadgeNum": 0
          })
          wx.hideToast();
          _this.setData({
            "modalProps.text": '预定商品库存有限，请到夏威夷T广场免税店4层提货处完成付款步骤确保顺利提货，售完即止，如有任何问题请与客服联系。',
            doneModalStatus: true
          })
        }
      }
    })
  },
  callPay(order_id) {
    var _this = this
    wx.request({
      url: domain + 'Pay/Wechatpay/callPay',
      data: {
        order_id: order_id,
        uid: wx.getStorageSync('uid')
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
            'success':function(){
              // 支付成功
              _this.setData({
                "modalProps.text": '订单已经生成，请到夏威夷T广场免税店4层提货处提货，如有任何问题请与客服联系。谢谢惠顾！',
                doneModalStatus: true
              })
            },
            'fail':function(res){
              showModel('支付失败', '请到【我的】中查看订单并尝试支付')
            }
          })
        } else {
          showModel('拉起支付失败', res.data.result)
        }
      }
    })
  },
  emptyCartEvent() {
    var _this = this
    wx.showModal({
      title: '确认清空购物车？',
      content: '清空购物车后，商品需要重新选购',
      success: function(res) {
        if (res.confirm) {
          _this.emptyCart()
        }
      }
    })
  },
  deleteOrder(event) {
    var _this = this
    var targetId = event.currentTarget.dataset.id
    showBusy('通信中..')
    wx.request({
      url: domain + 'Home/order/deleteOrder',
      data: {
        id : targetId
      },
      success(res) {
        var newOrderList = []
        if (res.data == 'success') {
          _this.data.orderList.map(function(item) {
            if (item.order.id == targetId) {
            } else {
              newOrderList.push(item)
            }
          })
          var temp = 0
          var temp_rmb = 0
          newOrderList.map(function(index) {
            temp = temp + parseInt(index.order.price)
            temp_rmb = temp_rmb + parseInt(index.product.RMB) * parseInt(index.order.number)
          })
          wx.setStorageSync('cartBadgeNum', parseInt(wx.getStorageSync('cartBadgeNum')) - 1)
          _this.setData({
            orderList: newOrderList,
            total_price: temp,
            total_price_rmb: temp_rmb,
            "footbarState.cartBadgeNum": wx.getStorageSync('cartBadgeNum')
          })
          showSuccess('删除完成')
        }
      },
      error(res) {
        console.log(res)
      }
    })
  },
  modalHide() {
    this.setData({
      doneModalStatus: false
    })
  },
  routerGoHistoryOrders() {
    wx.navigateTo({
      url: "../history-orders/history-orders"
    })
  },
  routerGoHome: function() {
    wx.redirectTo({
      url: '../about-DFS/about-DFS'
    })
  }
}

Page(pageObject)
