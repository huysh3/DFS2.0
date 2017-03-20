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
    total_price: '0'
  },
  onShow: function() {
    var _this = this
    this.getCartList()
  },
  onLoad: function() {
  },
  getCartList: function() {
    var orderLists = []
    var _this = this
    qcloud.request({
      url: domain + 'Home/weapp/unfinished_order_list',
      login: true,
      success(res) {
        if (res.data.length == 0) {
          return false;
        }
        var temp = 0
        res.data.map(function(index) {
          temp = temp + parseInt(index.order.price)
        })
        _this.setData({
          orderList: res.data,
          total_price: temp
        })
        console.log(_this.data.orderList)
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
  confirmOrder: function() {
    showBusy('正在通信..');
    var _this = this
    if (_this.data.orderList.length == 0) {
      showModel('尚无商品', '请先去商品目录挑选商品');
      return false;
    }
    qcloud.request({
      url: domain + 'Home/order/confirmOrder',
      login: true,
      success(res) {
        if(res.data == 'success') {
          showSuccess('订单已提交');
          _this.setData({
            orderList: '',
            total_price: 0
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
          _this.setData({
            orderList: newOrderList
          })
          showSuccess('删除完成')
        }
      },
      error(res) {
        console.log(res)
      }
    })
  },
  emptyCart: function() {
    var _this = this
    qcloud.request({
      url: domain + 'Home/order/emptyCart',
      login: true,
      success(res) {
        if(res.data == 'success') {
          showSuccess('购物车已清空');
          _this.setData({
            orderList: '',
            total_price: 0
          })
        }
      }
    })
  },
  routerGoHome: function() {
    wx.switchTab({
      url: '../about-DFS/about-DFS'
    })
  }  
}

Page(pageObject)
