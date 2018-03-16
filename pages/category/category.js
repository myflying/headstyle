
var cid
var page = 1
var list
var typeName
Page({
  data:{
    is_load_more: false
  },
  onLoad:function(e){
    console.log(e.cid)
    cid = e.cid
    typeName = e.typeName

    wx.showLoading({
      title: '加载中',
    })

    var Page$this = this;
    this.getData(Page$this);
    wx.setNavigationBarTitle({
      title: typeName
    })
  },
  getData: function (that) {
    page = 1
    list = null;
    var Page$this = this;
    wx.request({
      url: 'https://tx.qqtn.com/apajax.asp?action=0&ctype=0&num=50',
      method: 'GET',
      data: {
        'p': page,
        'cid':cid
      },
      success: function (res) {
        wx.hideLoading()
        wx.stopPullDownRefresh();
        list = res.data.data;
       
        that.setData({
          array: list,
        });
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
  },
  onReachBottom: function () {

    var Page$this = this;
    page++;

    wx.request({
      url: 'https://tx.qqtn.com/apajax.asp?action=0&ctype=0&num=50',
      method: 'GET',
      data: {
        'p': page,
        'cid': cid
      },
      success: function (res) {
        wx.hideLoading()
        list = list.concat(res.data.data);
        console.log(list.length)
        Page$this.setData({
          array: list,
          is_load_more: false
        });
      },
      fail: function (res) {
        wx.hideLoading()
        Page$this.setData({
          is_load_more: false
        })
      }
    })
    this.setData({
      is_load_more: true
    })
  },
})