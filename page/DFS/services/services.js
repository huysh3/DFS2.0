Page({
  phoneCall: function() {
    wx.makePhoneCall({
      phoneNumber: '13602455397' //仅为示例，并非真实的电话号码
    })
  },
  routerGoHome: function() {
    wx.switchTab({
      url: '../about-DFS/about-DFS'
    })
  }  
})
