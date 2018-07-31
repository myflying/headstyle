var validate = require('../../utils/validate.js');
const common = require('../../utils/common.js')
var keyword
var page = 1
var list
var typeName = ''
Page({
  data: {
    is_load_more: false
  },
  onLoad: function (e) {
    
    wx.showLoading({
      title: '加载中',
    })

    var Page$this = this;
    this.getData(Page$this);
   
  },

  onReady() {
    this.setData({
      statusBarHeight: getApp().globalData.statusBarHeight,
      titleBarHeight: getApp().globalData.titleBarHeight,
      title_txt: '我的收藏'
    })
  },

  getData: function (that) {
    page = 1
    list = null;
    
    var that = this
    let url = "https://ntx.qqtn.com/api/my/keepList"
    var rdata = {
      'page': page,
      'page_size':48
    }
    let header = common.gethead(rdata)
    wx.request({
      url: url,
      data: rdata,
      method: 'POST',
      header: header,
      success: function (res) {
        console.log(res.data.data)
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

    var that = this;
    page++;

    let url = "https://ntx.qqtn.com/api/my/keepList"
    var rdata = {
      'page': page,
      'page_size': 48
    }
    let header = common.gethead(rdata)
    wx.request({
      url: url,
      data: rdata,
      method: 'POST',
      header: header,
      success: function (res) {
        wx.hideLoading()
        list = list.concat(res.data.data);
        console.log(list.length)

        that.setData({
          array: list,
          is_load_more: false
        });
      },
      fail: function (res) {
        wx.hideLoading()
        that.setData({
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
      url: '../keepdetail/keepdetail?currentIndex=' + index + '&page=' + parseInt(selectPage)
    })
  },
  backPage: function (e) {
    wx.navigateBack()
  },
})