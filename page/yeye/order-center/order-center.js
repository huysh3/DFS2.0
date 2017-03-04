import services from '../../../util/services'

var domain = 'https://15580083.qcloud.la/'
var qcloud = require('../../../vendor/qcloud-weapp-client-sdk/index');

var pageObject = {
  data: {
    unfinishedOrderList: '',
    historyOrderList: '',
    indexOrderList: [
      {
        "order_id": "1",
        "name": "亮泽真皮织锦手提包",
        "order_banner": "http://o7at6h6ej.bkt.clouddn.com/%E7%9A%AE%E5%8C%852.png",
        "total_fee": "198",
        "created_at": "2017-03-01 21:22",
        "shop": {
          "carousels": [
            "http://o7at6h6ej.bkt.clouddn.com/%E7%9A%AE%E5%8C%852.png",
            "http://o7at6h6ej.bkt.clouddn.com/%E7%9A%AE%E5%8C%852.png",
            "http://o7at6h6ej.bkt.clouddn.com/%E7%9A%AE%E5%8C%852.png"
          ],
          "name": "Mask King",
          "city": "广州",
          "area": "白云机场",
          "address": "1号航站楼2层",
        }
      },
      {
        "order_id": "2",
        "name": "亮泽真皮织锦手提包",
        "order_banner": "http://o7at6h6ej.bkt.clouddn.com/%E7%9A%AE%E5%8C%852.png",
        "total_fee": "198",
        "created_at": "2017-03-01 21:22",
        "shop": {
          "carousels": [
            "http://o7at6h6ej.bkt.clouddn.com/%E7%9A%AE%E5%8C%852.png",
            "http://o7at6h6ej.bkt.clouddn.com/%E7%9A%AE%E5%8C%852.png",
            "http://o7at6h6ej.bkt.clouddn.com/%E7%9A%AE%E5%8C%852.png"
          ],
          "name": "Mask King",
          "city": "广州",
          "area": "白云机场",
          "address": "1号航站楼2层",
        }
      }
    ],
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
      url: domain + 'Home/weapp/test',
      login: true,
      success(res) {
        console.log(res)
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
