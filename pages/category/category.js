
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
       
        if (list.length % 3 > 0) {
          for (var i = 0; i < list.length; i++) {
            if (i == list.length - 1) {
              list[i].fixStyles = 'margin-right : auto; margin-left:5rpx;'
            }
          }
        }

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

        if (list.length % 3 > 0) {
          for (var i = 0; i < list.length; i++) {
            if (i == list.length - 1) {
              list[i].fixStyles = 'margin-right : auto; '
            }
          }
        }
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
  imagedetail: function (e) {
    var index = e.currentTarget.dataset.index

    var selectPage = 0;

    if ((index + 1) % 50 == 0) {
      selectPage = (index + 1) / 50;
    } else {
      selectPage = ((index + 1) / 50) + 1
    }

    wx.navigateTo({
      url: '../imagedetail/imagedetail?currentIndex=' + index + '&page=' + parseInt(selectPage) + '&cid='+cid
    })
  }
})