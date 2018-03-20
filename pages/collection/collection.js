
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
          
          if (list.length % 3 > 0) {
            for (var i = 0; i < list.length; i++) {
              if (i == list.length - 1) {
                list[i].fixStyles = 'margin-right : auto;'
              }
            }
          }

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
  },
  imagedetail: function (e) {
    var index = e.currentTarget.dataset.index

    var selectPage = 0;

    if ((index + 1) % 50 == 0) {
      selectPage = (index + 1) / 50;
    } else {
      selectPage = ((index + 1) / 50) + 1
    }

    wx.navigateTo({
      url: '../imagecdetail/imagecdetail?currentIndex=' + index + '&page=' + parseInt(selectPage) + '&sid=' + sid
    })
  }
})