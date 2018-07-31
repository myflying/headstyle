const common = require('/utils/common.js')

App({
  onLaunch: function() {
    var vm = this
    
    wx.getSystemInfo({
      success: function (res) {
        let totalTopHeight = 68
        if (res.model.indexOf('iPhone X') !== -1) {
          totalTopHeight = 88
        } else if (res.model.indexOf('iPhone') !== -1) {
          totalTopHeight = 64
        }
        vm.globalData.statusBarHeight = res.statusBarHeight
        vm.globalData.titleBarHeight = totalTopHeight - res.statusBarHeight
      },
      failure() {
        vm.globalData.statusBarHeight = 0
        vm.globalData.titleBarHeight = 0
      }
    })

    //获取分享的信息
    wx.request({
      url: 'https://ntx.qqtn.com/api/my/shareInfo',
      method: 'GET',
      data: {},
      success: function (res) {
        console.log(res.data)
        //vm.globalData.appShareInfo = res.data.data

        var index = Math.floor(Math.random() * 2);
        if (res.data.data && res.data.data.share_ico) {
          var simgs = res.data.data.share_ico;
          var stitles = res.data.data.share_name;
          
          if (simgs && simgs.length > 1 && stitles && stitles.length > 1) {
            //simg = simgs[index]
            //stitle = stitles[index]
            vm.globalData.appShareName = stitles[index]
            vm.globalData.appShareIco = simgs[index]
          }
        }
      }
    })    
  },

  onGotUserInfo: function (that) {
    let t = this
    wx.login({
      success: function (res) {
        wx.getUserInfo({
          lang: "zh_CN",
          success: function (userRes) {
            console.log("用户已授权")
            //console.log(userRes)
            if (null != userRes && null != userRes.userInfo) {
              var userData = userRes.userInfo;
              t.globalData.userInfo = userData;
              wx.setStorageSync('user_info', userData)

              //获取用户的encryptedData，向服务器发起注册
              let url = "https://ntx.qqtn.com/api/login/login"
              let data = {
                code: res.code,
                encryptedData: userRes.encryptedData,
                iv: userRes.iv,
                app_type: 'wx',
                app_id: 1
              }
              let header = common.gethead(data)
              wx.request({
                url: url,
                //注册
                data: data,
                method: 'POST',
                header: header,
                success: function (result) {
                  console.log('token--->' + result.data.data.token.token)
                  saveToken(result.data.data.token.token) //缓存token
                  //getUserInfo();
                  wx.showToast({
                    title: '登录成功',
                  })
                  that.setData({
                    is_login: true,
                    nick_name: userData.nickName,
                    user_head: userData.avatarUrl
                  })

                },
                fail: function (res) {

                },
              })
            }
          },
          fail: function (res) {

          }
        })
      },
      fail: function (res) { }
    })
  },
  globalData: {
    userInfo: null,
    bgPic: null,
    currentHatId: 1,
    appShareName:null,
    appShareIco:null,
    imglist:null,
    hatImgPath:null
  }
})

function saveToken(token) {
  wx.setStorageSync('token', token)
}