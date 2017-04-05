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
    tabStatus: 'orderCenter'
  },
  onShow: function() {
    var _this = this
    this.getCartList()
    wx.setStorageSync('tabStatus', 'orderCenter')
  },
  onLoad: function() {
  },
  getCartList: function() {
    var orderLists = []
    var _this = this
    qcloud.request({
      url: domain + 'Home/weapp/cart_list',
      login: true,
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
  handleConfirmBtn: function() {
    if (this.data.orderList.length == 0) {
      showModel('尚无商品', '请先去商品目录挑选商品');
      return false;
    }
    this.setData({
      inputModalState: true
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

    qcloud.request({
      url: domain + 'Home/order/confirmOrder?phone=' + _this.data.inputPhoneNumber,
      login: true,
      success(res) {
        if(res.data == 'success') {
          // showSuccess('订单已提交');
          wx.hideToast();
          _this.setData({
            orderList: '',
            total_price: 0,
            doneModalStatus: true
          })
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
    qcloud.request({
      url: domain + 'Home/order/deleteOrder',
      login: true,
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
          _this.setData({
            orderList: newOrderList,
            total_price: temp,
            total_price_rmb: temp_rmb
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
