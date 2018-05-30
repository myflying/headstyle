var validate = require('../../utils/validate.js');
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

    let times = Date.parse(new Date())
    let uuid = validate.guid()
    let md5Temp = validate.md5Sign(times, uuid)

    if (md5Temp.length > 16) {
      md5Temp = md5Temp.substring(md5Temp.length - 16)
    }

    wx.request({
      url: 'https://ntx.qqtn.com/index/api?action=0',
      method: 'GET',
      data: {
        'p': page,
        'cid':cid,
        'num': 48,
        'timestamp': times,
        'randstr': uuid,
        'corestr': md5Temp
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
    let times = Date.parse(new Date())
    let uuid = validate.guid()
    let md5Temp = validate.md5Sign(times, uuid)

    if (md5Temp.length > 16) {
      md5Temp = md5Temp.substring(md5Temp.length - 16)
    }
    wx.request({
      url: 'https://ntx.qqtn.com/index/api?action=0',
      method: 'GET',
      data: {
        'p': page,
        'cid': cid,
        'num': 48,
        'timestamp': times,
        'randstr': uuid,
        'corestr': md5Temp
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

    if ((index + 1) % 48 == 0) {
      selectPage = (index + 1) / 48;
    } else {
      selectPage = ((index + 1) / 48) + 1
    }

    wx.navigateTo({
      url: '../imagedetail/imagedetail?currentIndex=' + index + '&page=' + parseInt(selectPage) + '&cid='+cid
    })
  }
})