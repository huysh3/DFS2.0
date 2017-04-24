var domain = 'https://15580083.qcloud.la/'
var qcloud = require('../../../vendor/qcloud-weapp-client-sdk/index');

Page({
    data: {
        inputValue: '',
        resultList: []
    },
    onShow: function() {

    },
    bindKeyInput: function(e) {
        this.setData({
            inputValue: e.detail.value
        })
    },    
    handleSearchEvent: function() {
        var _this = this
        wx.request({
            url: domain + 'Test/weapp/productSearch',
            data: {
                shop_id: wx.getStorageSync('shop_id'),
                name: _this.data.inputValue
            },
            success(res) {
                console.log(res.data)
                _this.setData({
                    resultList: res.data
                })
            }
        })
        console.log(this.data.inputValue)
    }
})