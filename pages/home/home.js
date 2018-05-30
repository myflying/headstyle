var validate = require('../../utils/validate.js');
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
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    console.log("shareUrl--->" + shareUrl)
    return {
      title: '你快来换个新头像吧',
      path: '/pages/home/home',
      imageUrl: shareUrl,
      success: function (res) {
        // 转发成功
        console.log('转发成功')
      },
      fail: function (res) {
        // 转发失败
        console.log('转发失败')
      }
    }
  },

  getHomeData: function (that) {
    page = 1;
    list = null;
    var Page$this = this;

    let times = Date.parse(new Date())
    let uuid = validate.guid()
    let md5Temp = validate.md5Sign(times, uuid)
    
    if(md5Temp.length > 16){
      md5Temp = md5Temp.substring(md5Temp.length - 16)
    }
    
    wx.request({
      url: 'https://ntx.qqtn.com/index/api?action=0',
      method: 'GET',
      data: {
        'p': page,
        'num':48,
        'timestamp': times,
        'randstr': uuid,
        'corestr': md5Temp
      },
      success: function (res) {
        console.log(res.data)
        wx.hideLoading()
        wx.stopPullDownRefresh();
        list = res.data.data;
        banners = res.data.special;
        
        if (list.length % 3 > 0) {
          for (let i = 0; i < list.length; i++) {
            if (i == list.length - 1) {
              list[i].fixStyles = 'margin-right : auto; margin-left:5rpx;'
            }
          }
        }

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
      title: '头像达人'
    })
  },

  onPullDownRefresh: function () {
    var Page$this = this;
    this.getHomeData(Page$this);
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
        'num': 48,
        'timestamp': times,
        'randstr': uuid,
        'corestr': md5Temp
      },
      success: function (res) {
        list = list.concat(res.data.data);
        console.log(list.length)
        if (list.length % 3 > 0) {
          for (var i = 0; i < list.length; i++) {
            
            if (i == list.length - 1) {
              list[i].fixStyles = 'margin-right : auto;margin-left:5rpx;'
            }
          }
        }
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
      this.setData({
        showModal: true
      });
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
    console.log(index)
    var selectPage = 0;

    if ((index+1) % 48 == 0){
      selectPage = (index + 1) / 48;
    }else{
      selectPage = ((index + 1) / 48) + 1
    }
    console.log('selpage--->' + selectPage)
    wx.navigateTo({
      url: '../imagedetail/imagedetail?currentIndex=' + index + '&page=' + parseInt(selectPage)
    })
  },
  /**
     * 弹出框蒙层截断touchmove事件
     */
  preventTouchMove: function () { },
  /**
   * 隐藏模态对话框
   */
  hideModal: function () {
    console.log("hide");
    this.setData({
      showModal: false
    });
  },
  /**
   * 对话框取消按钮点击事件
   */
  onCancel: function () {
    this.hideModal();
  },
  /**
   * 对话框确认按钮点击事件
   */
  onConfirm: function () {
    this.hideModal();
  }
})