var validate = require('../../utils/validate.js');
const common = require('../../utils/common.js')
var page = 1;
var list;
var total_count = 0;
var load_success = true;
var current_index = 0;
var select_index = 0;
var shareUrl;
var img_id;
//获取应用实例
const app = getApp()
var cid;
Page({
  data: {
    currentTab: 0,
    is_play: false,
    is_add_keep_img: '../../images/keep_normal.png'
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: app.globalData.appShareInfo ? app.globalData.appShareInfo.name : "@你快来换个新头像吧",
      path: '/pages/index/index',
      imageUrl: shareUrl
    }
  },
  onLoad: function (options) {

    console.log(app.globalData.userInfo)

    //console.log(options.currentIndex)
    current_index = options.currentIndex
    cid = 15;
    page = 1

    select_index = 0;

    if (options.page != null) {
      page = options.page
    }

    list = null;
    total_count = 0;
    var Page$this = this;
    load_success = false;
    wx.showLoading({
      title: '加载中',
      mask: true
    })

    if (page > 1 && current_index >= (page - 1) * 48) {
      current_index = current_index - (page - 1) * 48
    }

    console.log('detail -index --->' + current_index)

    this.getPreData(Page$this);
  },
  onReady() {
    this.setData({
      statusBarHeight: getApp().globalData.statusBarHeight,
      titleBarHeight: getApp().globalData.titleBarHeight
    })
  },
  getPreData: function (that) {
    
    var that = this
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
        load_success = true
        console.log(res.data.data)

        if (res.data.data) {
          if (list != null) {
            list = list.concat(res.data.data)
          } else {
            list = res.data.data
          }
        }

        if (list != null && list.length > 0) {
          total_count = list.length
          list = list.slice(current_index, list.length)
          shareUrl = list[select_index].ico
          img_id = list[select_index].cid
          that.setData({
            images: list
          });
        }

        console.log('请求后total_count--->' + total_count)
      },
      fail: function (res) {
        wx.hideLoading()
        load_success = false
        console.log('load fail')
      }
    })
  },
  bindChange: function (e) {
    //console.log("total--->" + total_count)
    console.log("current--->" + e.detail.current)
    this.setData({
      currentTab: e.detail.current
    })

    select_index = parseInt(e.detail.current)

    var temp_index = parseInt(current_index)
    var last_current_index = temp_index + parseInt(e.detail.current)

    console.log("total_count--->" + total_count + '---last_current_index--->' + last_current_index)

    console.log('bindchange url' + list[select_index].ico)

    shareUrl = list[select_index].ico

    if (last_current_index >= total_count - 1 && load_success) {
      page++;
      console.log('load next' + page)
      current_index = 0;
      var Page$this = this;
      wx.showLoading({
        title: '加载中',
        mask: true
      })

      this.getPreData(Page$this);
    }
  },
  preimage: function (e) {

    console.log('select_index--->' + select_index)

    var purl = list[select_index].ico

    if (purl != null && purl.indexOf('https') == -1) {
      purl = purl.replace('http', 'https');
    }
    wx.previewImage({
      urls: [purl],
      current: purl
    })
  },
  imageedit: function (e) {

    var url = list[select_index].ico

    if (url != null && url.indexOf('https') == -1) {
      url = url.replace('http', 'https');
    }
    console.log('url---' + url)
    wx.getImageInfo({
      src: url,
      success: function (res) {
        console.log('respath---' + res.path)
        app.globalData.bgPic = res.path;
        wx.navigateTo({
          url: '../imageeditor/imageeditor',
        })
      }
    })
  },
  downimage: function (e) {

    var downUrl = list[select_index].ico

    if (downUrl != null && downUrl.indexOf('https') == -1) {
      downUrl = downUrl.replace('http', 'https');
    }
    console.log('downUrl---' + downUrl)

    //文件下载
    wx.downloadFile({
      url: downUrl,
      success: function (res) {
        console.log(res);
        //图片保存到本地
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: function (data) {
            console.log("save success--->" + data);
            wx.showToast({
              title: '图片已保存',
            })
          },
          fail: function (err) {
            console.log(err);
            if (err.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
              console.log("用户一开始拒绝了，我们想再次发起授权")
              console.log('打开设置窗口')
              wx.openSetting({
                success(settingdata) {
                  console.log(settingdata)
                  if (settingdata.authSetting['scope.writePhotosAlbum']) {
                    console.log('获取权限成功，给出再次点击图片保存到相册的提示。')
                  } else {
                    console.log('获取权限失败，给出不给权限就无法正常使用的提示')
                  }
                }
              })
            }
          }
        })
      },
      fail: function (res) {
        console.log(res)
      }
    })
  },
  backPage: function (e) {
    wx.navigateBack()
  },
  toHome: function (e) {
    wx.redirectTo({
      url: '/pages/index/index',
    })
  },
  addKeep: function (e) {
    var that = this
    let url = "https://ntx.qqtn.com/api/my/setKeepInfo"
    var rdata = {
      'img_id': img_id
    }
    let header = common.gethead(rdata)
    wx.request({
      url: url,
      data: rdata,
      method: 'POST',
      header: header,
      success: function (res) {
        console.log(res.data.code)
        if (res.data) {
          if (res.data.code == 1) {
            wx.showToast({
              title: '收藏成功',
            })
            that.setData({
              is_add_keep_img: '../../images/is_keeped.png'
            })
          } else {
            wx.showToast({
              title: res.data.msg,
            })
          }
        }
      }
    })
  }
})