var page = 1;
var list;
var total_count = 0;
var load_success = true;
var current_index = 0;
var select_index = 0;

//获取应用实例
const app = getApp()

Page({
  data: {
    currentTab: 0,
    is_play: false
  },

  onLoad: function (options) {
    //console.log(options.currentIndex)
    current_index = options.currentIndex

    if (options.page != null) {
      page = options.page
    } else {
      page = 1
    }

    list = null;
    total_count = 0;
    var Page$this = this;
    load_success = false;
    wx.showLoading({
      title: '加载中',
      mask: true
    })

    if (page > 1 && current_index >= (page - 1) * 50) {
      current_index = current_index - (page - 1) * 50
    }

    this.getPreData(Page$this);
  },

  getPreData: function (that) {
    var Page$this = this;
    wx.request({
      url: 'https://tx.qqtn.com/apajax.asp?action=0&ctype=0&num=50',
      method: 'GET',
      data: {
        'p': page
      },
      success: function (res) {
        wx.hideLoading()
        load_success = true
        console.log('success')
        if (list != null) {
          list = list.concat(res.data.data)
        } else {
          list = res.data.data
        }

        total_count = list.length

        if (list != null && list.length > 0) {
          list = list.slice(page == 1 ? current_index : 0, list.length)
        }

        that.setData({
          images: list
        });
      },
      fail: function (res) {
        wx.hideLoading()
        load_success = false
        console.log('load fail')
      }
    })
  },
  bindChange: function (e) {
    console.log("total--->" + total_count)
    console.log("current--->" + e.detail.current)
    this.setData({ currentTab: e.detail.current })

    select_index = parseInt(e.detail.current)

    var temp_index = parseInt(current_index)
    var last_current_index = temp_index+ parseInt(e.detail.current)

    console.log("last_current_index--->" + last_current_index)

    console.log(list[select_index].hurl)

    if (last_current_index >= total_count - 1 && load_success) {
      page++;
      console.log('load next' + page)

      var Page$this = this;
      wx.showLoading({
        title: '加载中',
        mask: true
      })
      
      this.getPreData(Page$this);
    }
  },
  imageedit:function(e){

    var url = list[select_index].hurl
    app.globalData.bgPic = url;
    wx.navigateTo({
      url: '../imageeditor/imageeditor?url=' + url,
    })

    // wx.getImageInfo({
    //   src: url,
    //   success: function (res) {
    //     console.log(res.path)
    //     app.globalData.bgPic = res.path;
    //     wx.navigateTo({
    //       url: '../imageeditor/imageeditor?url=' + url,
    //     })
    //   }
    // })
  }
})