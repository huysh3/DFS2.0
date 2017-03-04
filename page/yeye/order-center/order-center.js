import services from '../../../util/services'

var domain = 'https://15580083.qcloud.la/'
var qcloud = require('../../../vendor/qcloud-weapp-client-sdk/index');

var pageObject = {
  data: {
    unfinishedOrderList: '',
    historyOrderList: '',
    indexOrderList: [],
    orderList: [],
    leftPartClass: 'header-left-part active',
    rightPartClass: 'header-right-part',
    tabState: 'left'
  },
  onShow: function() {
    var _this = this
    this.getOrderList()
  },
  onLoad: function() {
  },
  getOrderList: function() {
    var orderLists = []
    var _this = this
    qcloud.request({
      url: domain + 'Home/weapp/history_order_list',
      login: true,
      success(res) {
        console.log(res)
        _this.setData({
          historyOrderList: res.data
        })
        qcloud.request({
          url: domain + 'Home/weapp/unfinished_order_list',
          login: true,
          success(res) {
            console.log(res)
            _this.setData({
              unfinishedOrderList: res.data
            })
            if (_this.data.tabState == 'right') {
              _this.setData({indexOrderList: _this.data.historyOrderList})
            } else {
              _this.setData({indexOrderList: _this.data.unfinishedOrderList})
            }            
          }
        })        
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
}

Page(pageObject)
