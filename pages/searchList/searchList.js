var validate = require('../../utils/validate.js');
var keyword
var page = 1
var list
var typeName = ''
var is_no_data = false
var app = getApp()
Page({
  data: {
    is_load_more: false,
    no_data: is_no_data
  },
  onLoad: function(e) {
    console.log(e.keyword)
    keyword = e.keyword

    wx.showLoading({
      title: '加载中',
    })

    var Page$this = this;
    this.getData(Page$this);
    wx.setNavigationBarTitle({
      title: keyword
    })
    app.searchPage = this
  },

  onReady() {
    this.setData({
      statusBarHeight: getApp().globalData.statusBarHeight,
      titleBarHeight: getApp().globalData.titleBarHeight,
      title_txt:''
    })
  },
  backPage: function (e) {
    wx.navigateBack()
  },
  getData: function(that) {
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
      url: 'https://ntx.qqtn.com/api/my/search',
      method: 'GET',
      data: { 
        'page': page,
        'keyword': keyword,
        'page_size': 48,
        'timestamp': times,
        'randstr': uuid,
        'corestr': md5Temp,
        'is_login': wx.getStorageSync('user_info') ? 1 : 0
      },
      success: function(res) {
        console.log(res.data.data.list.length)
        wx.hideLoading()
        wx.stopPullDownRefresh();
        list = res.data.data.list;

        // if (list.length % 3 > 0) {
        //   for (var i = 0; i < list.length; i++) {
        //     if (i == list.length - 1) {
        //       list[i].fixStyles = 'margin-right : auto; margin-left:5rpx;'
        //     }
        //   }
        // }
        if (res.data.data.list == null || res.data.data.list.length == 0){
          is_no_data = true
        }else{
          is_no_data = false
        }
        that.setData({
          array: list,
          no_data:is_no_data
        });
      },
      fail: function(res) {
        wx.hideLoading()
        wx.stopPullDownRefresh()
      }
    })
  },
  onPullDownRefresh: function() {
    var Page$this = this;
    this.getData(Page$this);
  },
  onReachBottom: function() {

    var Page$this = this;
    page++;
    let times = Date.parse(new Date())
    let uuid = validate.guid()
    let md5Temp = validate.md5Sign(times, uuid)

    if (md5Temp.length > 16) {
      md5Temp = md5Temp.substring(md5Temp.length - 16)
    }
    wx.request({
      url: 'https://ntx.qqtn.com/api/my/search',
      method: 'GET',
      data: {
        'page': page,
        'keyword': keyword,
        'page_size': 48,
        'timestamp': times,
        'randstr': uuid,
        'corestr': md5Temp
      },
      success: function(res) {
        wx.hideLoading()
        list = list.concat(res.data.data.list);
        console.log(list.length)

        // if (list.length % 3 > 0) {
        //   for (var i = 0; i < list.length; i++) {
        //     if (i == list.length - 1) {
        //       list[i].fixStyles = 'margin-right : auto; '
        //     }
        //   }
        // }
        Page$this.setData({
          array: list,
          is_load_more: false
        });
      },
      fail: function(res) {
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

  refreshData(status) {
    this.data.array[this.currentIndex].is_keep = status
    console.log(this.data.array[this.currentIndex])
    this.setData({
      array: this.data.array
    })
  },

  imagedetail: function(e) {
    var index = e.currentTarget.dataset.index
    var is_keep = e.currentTarget.dataset.keep
    var selectPage = 0;
    this.currentIndex = index
    if ((index + 1) % 48 == 0) {
      selectPage = (index + 1) / 48;
    } else {
      selectPage = ((index + 1) / 48) + 1
    }

    wx.navigateTo({
      url: '../searchdetail/searchdetail?currentIndex=' + index + '&page=' + parseInt(selectPage) + '&keyword=' + keyword + '&is_keep=' + is_keep
    })
  }
})