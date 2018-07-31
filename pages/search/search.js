var validate = require('../../utils/validate.js');
var keyword
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;

    let times = Date.parse(new Date())
    let uuid = validate.guid()
    let md5Temp = validate.md5Sign(times, uuid)

    if (md5Temp.length > 16) {
      md5Temp = md5Temp.substring(md5Temp.length - 16)
    }

    wx.request({
      url: 'https://ntx.qqtn.com/api/my/searchHistory',
      method: 'GET',
      data: {
        'page': 1,
        'page_size': 8,
        'timestamp': times,
        'randstr': uuid,
        'corestr': md5Temp
      },
      success: function(res) {
        console.log(res.data.data.list)

        res.data.data.list.forEach(function (value, index, array) {
          console.log(array[index]['keyword'])
          if (array[index]['keyword'].length>4){
            array[index]['keyword'] = array[index]['keyword'].substring(0,4)+"..."
          }
        });

        that.setData({
          hotarray: res.data.data.list
        })
      }
    })
  },

  onReady() {
    this.setData({
      statusBarHeight: getApp().globalData.statusBarHeight,
      titleBarHeight: getApp().globalData.titleBarHeight
    })
  },
  backPage: function(e) {
    wx.navigateBack()
  },
  keywordInput: function(e) {
    console.log(e.detail.value)
    keyword = e.detail.value

    if (keyword) {
      this.setData({
        is_input: keyword
      })
    }
  },
  clear: function(e) {
    this.setData({
      is_input: ""
    })
  },
  search: function(e) {
    if (keyword) {
      wx.navigateTo({
        url: '/pages/searchList/searchList?keyword=' + keyword
      })
    } else {
      wx.showToast({
        title: '请输入关键词搜索',
      })
    }
  },

  hotWordSearch: function(e) {
    console.log(e.currentTarget.dataset.keyword)
    keyword = e.currentTarget.dataset.keyword
    wx.navigateTo({
      url: '/pages/searchList/searchList?keyword=' + keyword
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: app.globalData.appShareName ? app.globalData.appShareName : "@你快来换个新头像吧",
      path: '/pages/index/index',
      imageUrl: app.globalData.appShareIco ? app.globalData.appShareIco : "/images/share_def.png"
    }
  }
})