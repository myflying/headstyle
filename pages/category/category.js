var validate = require('../../utils/validate.js');
var app = getApp()
var cid
var page = 1
var list
var typeName
var adsarray = ['adunit-5fd971d74d692ee5']
Page({
  data: {
    is_load_more: false,
    ads: adsarray
  },
  onLoad: function(options) {
    //console.log(e.cid)
    cid = options.cid
    typeName = options.typeName

    wx.showLoading({
      title: '加载中',
    })

    var Page$this = this;
    this.getData(Page$this);
    wx.setNavigationBarTitle({
      title: typeName
    })

    app.categoryPage = this
  },
  onReady() {
    this.setData({
      statusBarHeight: getApp().globalData.statusBarHeight,
      titleBarHeight: getApp().globalData.titleBarHeight,
      title_txt: typeName
    })
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
      url: 'https://ntx.qqtn.com/api/my/index',
      method: 'GET',
      data: {
        'p': page,
        'cid': cid,
        'num': 48,
        'timestamp': times,
        'randstr': uuid,
        'corestr': md5Temp,
        'openid': wx.getStorageSync('user_info') ? wx.getStorageSync('user_info').openId : 0
      },
      success: function(res) {
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
      fail: function(res) {
        wx.hideLoading()
        wx.stopPullDownRefresh()
      }
    })
  },
  
  backPage: function (e) {
    wx.navigateBack()
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
      url: 'https://ntx.qqtn.com/api/my/index',
      method: 'GET',
      data: {
        'p': page,
        'cid': cid,
        'num': 48,
        'timestamp': times,
        'randstr': uuid,
        'corestr': md5Temp,
        'openid': wx.getStorageSync('user_info') ? wx.getStorageSync('user_info').openId : 0
      },
      success: function(res) {
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
  refreshData(status){
    this.data.array[this.currentIndex].is_keep = status
    console.log(this.data.array[this.currentIndex])
     this.setData({
       array: this.data.array
     })
  },
  imagedetail: function(e) {
    var index = e.currentTarget.dataset.index
    var is_keep = e.currentTarget.dataset.keep
    var share_title = e.currentTarget.dataset.sharetitle
    var selectPage = 0

    this.currentIndex = index

    if ((index + 1) % 48 == 0) {
      selectPage = (index + 1) / 48;
    } else {
      selectPage = ((index + 1) / 48) + 1
    }

    wx.navigateTo({
      url: '../imagedetail/imagedetail?currentIndex=' + index + '&page=' + parseInt(selectPage) + '&cid=' + cid + '&is_keep=' + is_keep + '&share_title=' + share_title
    })
  },

  toHome:function(e){
    wx.redirectTo({
      url: '/pages/index/index',
    })
  },

  toTop:function(e){
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 300
    })
  },
  
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: app.globalData.appShareName ? app.globalData.appShareName : "@你快来换个新头像吧",
      path: '/pages/index/index',
      imageUrl: app.globalData.appShareIco ? app.globalData.appShareIco : "/images/share_def.png"
    }
  },
})