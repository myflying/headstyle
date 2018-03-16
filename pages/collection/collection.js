
var sid
var page = 1
var list
var typeName
Page({
  data:{
    is_load_more: false,
    top_img: '/images/def_head.png'
  },
  onLoad:function(e){
    console.log(e.sid)
    sid = e.sid
    wx.showLoading({
      title: '加载中',
    })
    var Page$this = this;
    this.getData(Page$this);
  },
  getData: function (that) {
    page = 1
    list = null;
    var Page$this = this;
    wx.request({
      url: 'https://tx.qqtn.com/apajax.asp?action=8',
      method: 'GET',
      data: {
        'sid':sid
      },
      success: function (res) {
        wx.hideLoading()
        wx.stopPullDownRefresh();
        if (res.data.data != null && res.data.data.length > 0) {
          list = res.data.data[0].list
          wx.setNavigationBarTitle({
            title: res.data.data[0].title
          })
          that.setData({
            array: list,
            top_img: list[0].hurl,
            title: res.data.data[0].title,
            des: res.data.data[0].description
          });
        }
      },
      fail: function (res) {
        wx.hideLoading()
        wx.stopPullDownRefresh()
      }
    })
  },
  onPullDownRefresh: function () {
    var Page$this = this;
    this.getData(Page$this);
  }
})