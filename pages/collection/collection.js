var validate = require('../../utils/validate.js');
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

    let times = Date.parse(new Date())
    let uuid = validate.guid()
    let md5Temp = validate.md5Sign(times, uuid)

    if (md5Temp.length > 16) {
      md5Temp = md5Temp.substring(md5Temp.length - 16)
    }
    wx.request({
      url: 'https://ntx.qqtn.com/index/api?action=8',
      method: 'GET',
      data: {
        'sid':sid,
        'p': page,
        'num': 1000,
        'timestamp': times,
        'randstr': uuid,
        'corestr': md5Temp
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

    if ((index + 1) % 1000 == 0) {
      selectPage = (index + 1) / 1000;
    } else {
      selectPage = ((index + 1) / 1000) + 1
    }

    wx.navigateTo({
      url: '../imagecdetail/imagecdetail?currentIndex=' + index + '&page=' + parseInt(selectPage) + '&sid=' + sid
    })
  }
})