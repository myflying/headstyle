const app = getApp();
var dotsFirst = true;
var list;
var types;
var banners;
var page = 1;
var cids = [15,13,14,2,21,18,64,-1]
Page({
  data: {
    array: [],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    is_load_more: false,
    showModal: false,
    typedata: [{
      'typeName': '情侣头像',
      'imageUrl': 'type01.png'
    }, {
      'typeName': '男生头像',
      'imageUrl': 'type02.png'
    }, {
      'typeName': '女生头像',
      'imageUrl': 'type03.png'
    }, {
      'typeName': '个性头像',
      'imageUrl': 'type04.png'
    }, {
      'typeName': '明星头像',
      'imageUrl': 'type05.png'
    }, {
      'typeName': '动漫头像',
      'imageUrl': 'type06.png'
    }, {
      'typeName': '游戏头像',
      'imageUrl': 'type07.png'
    }, {
      'typeName': '更多头像',
      'imageUrl': 'type08.png'
    }]
  },
  getHomeData: function (that) {
    page = 1;
    list = null;
    var Page$this = this;
    wx.request({
      url: 'https://tx.qqtn.com/apajax.asp?action=0&ctype=0&num=10',
      method: 'GET',
      data: {
        'p': page
      },
      success: function (res) {
        wx.hideLoading()
        wx.stopPullDownRefresh();
        list = res.data.data;
        banners = res.data.special;
        
        that.setData({
          array: list,
          banner: banners
        });
      },
      fail: function (res) {
        wx.hideLoading()
        wx.stopPullDownRefresh()
      }
    })
  },

  onLoad: function () {
    page = 1;
    list = null;
    
    wx.showLoading({
      title: '加载中',
    })
    
    var Page$this = this;
    this.getHomeData(Page$this);
    wx.setNavigationBarTitle({
      title: '个性头像'
    })
  },

  onPullDownRefresh: function () {
    var Page$this = this;
    this.getHomeData(Page$this);
  },

  onReachBottom: function () {

    var Page$this = this;
    page++;

    wx.request({
      url: 'https://tx.qqtn.com/apajax.asp?action=0&ctype=0&num=50',
      method: 'GET',
      data: {
        'p': page
      },
      success: function (res) {
        list = list.concat(res.data.data);
        console.log(list.length)
        Page$this.setData({
          array: list,
          is_load_more: false
        });
      },
      fail: function (res) {
        Page$this.setData({
          is_load_more: false
        })
      }
    })
    this.setData({
      is_load_more: true
    })
  },
  category:function(e){
    var cindex = e.currentTarget.dataset.index
    //console.log(cids[cindex])
    if (cids[cindex] < 0) {
      wx.showToast({
        title: '更多',
      })
      return;
    }
    
    wx.navigateTo({
      url: '../category/category?cid=' + cids[cindex] + '&typeName=' + this.data.typedata[cindex].typeName
    })
  },
  banner:function(e){
    var sid = e.currentTarget.dataset.sid
    wx.navigateTo({
      url: '../collection/collection?sid='+ sid
    })
  },
  imagedetail : function(e){
    var index = e.currentTarget.dataset.index
    
    var selectPage = 0;

    if ((index+1) % 50 == 0){
      selectPage = (index + 1) / 50;
    }else{
      selectPage = ((index + 1) / 50) + 1
    }

    wx.navigateTo({
      url: '../imagedetail/imagedetail?currentIndex=' + index + '&page=' + parseInt(selectPage)
    })
  }
})