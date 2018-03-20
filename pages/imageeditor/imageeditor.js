//index.js
//获取应用实例
const app = getApp()
var iurl;
Page({
  data: {
    bgPic:null,
    imgList:[1,2,3,4,5,6,7,8,9,10],
    currentHatId:1,

    hatCenterX:wx.getSystemInfoSync().windowWidth/2,
    hatCenterY:150,
    cancelCenterX:wx.getSystemInfoSync().windowWidth/2-50-2,
    cancelCenterY:100,
    handleCenterX:wx.getSystemInfoSync().windowWidth/2+50-2,
    handleCenterY:200,

    hatSize:100,

    scale:1,
    rotate:0,
    is_sticker:true
  },
  onLoad(options){
    //console.log(options.url)
    //iurl = options.url
    console.log(app.globalData.bgPic)

    this.setData({
      bgPic: app.globalData.bgPic,
      is_sticker:true
    })
    },
  
  onReady(){
    this.hat_center_x=this.data.hatCenterX;
    this.hat_center_y=this.data.hatCenterY;
    this.cancel_center_x=this.data.cancelCenterX;
    this.cancel_center_y=this.data.cancelCenterY;
    this.handle_center_x=this.data.handleCenterX;
    this.handle_center_y=this.data.handleCenterY;

    this.scale=this.data.scale;
    this.rotate=this.data.rotate;
    
    this.touch_target="";
    this.start_x=0;
    this.start_y=0;
  },
  touchStart(e){
    if(e.target.id=="hat"){
      this.touch_target="hat";
    }else if(e.target.id=="handle"){
      this.touch_target="handle"
    }else{
      this.touch_target=""
    };
    
    if(this.touch_target!=""){
      this.start_x=e.touches[0].clientX;
      this.start_y=e.touches[0].clientY;
    }
  },
  touchEnd(e){

    console.log('touchEnd');

      this.hat_center_x=this.data.hatCenterX;
      this.hat_center_y=this.data.hatCenterY;
      this.cancel_center_x=this.data.cancelCenterX;
      this.cancel_center_y=this.data.cancelCenterY;
      this.handle_center_x=this.data.handleCenterX;
      this.handle_center_y=this.data.handleCenterY;
    // }
    this.touch_target="";
    this.scale=this.data.scale;
    this.rotate=this.data.rotate;
  },
  touchMove(e){
      var current_x=e.touches[0].clientX;
      var current_y=e.touches[0].clientY;
      var moved_x=current_x-this.start_x;
      var moved_y=current_y-this.start_y;

      //console.log('mx--->' + moved_x + '--->my--->' + moved_y)

      if(this.touch_target=="hat"){
        var tempX = (parseInt(this.data.cancelCenterX) + parseInt(moved_x))
        var tempY = (parseInt(this.data.cancelCenterY) + parseInt(moved_y))
        console.log(tempX)
        if(tempX < 30 || tempX > 227 || tempY < 30 || tempY > 227){
          return;
        }
        this.setData({
          hatCenterX:this.data.hatCenterX+moved_x,
          hatCenterY:this.data.hatCenterY+moved_y,
          cancelCenterX:this.data.cancelCenterX+moved_x,
          cancelCenterY:this.data.cancelCenterY+moved_y,
          handleCenterX:this.data.handleCenterX+moved_x,
          handleCenterY:this.data.handleCenterY+moved_y
        })
      };
      if(this.touch_target=="handle"){
        this.setData({
          handleCenterX:this.data.handleCenterX+moved_x,
          handleCenterY:this.data.handleCenterY+moved_y,
          cancelCenterX:2*this.data.hatCenterX-this.data.handleCenterX - 5,
          cancelCenterY: 2 * this.data.hatCenterY - this.data.handleCenterY - 2
        });
        let diff_x_before=this.handle_center_x-this.hat_center_x;
        let diff_y_before=this.handle_center_y-this.hat_center_y;
        let diff_x_after=this.data.handleCenterX-this.hat_center_x;
        let diff_y_after=this.data.handleCenterY-this.hat_center_y;
        let distance_before=Math.sqrt(diff_x_before*diff_x_before+diff_y_before*diff_y_before);
        let distance_after=Math.sqrt(diff_x_after*diff_x_after+diff_y_after*diff_y_after);
        let angle_before=Math.atan2(diff_y_before,diff_x_before)/Math.PI*180;
        let angle_after=Math.atan2(diff_y_after,diff_x_after)/Math.PI*180;
        this.setData({
          scale:distance_after/distance_before*this.scale,
          rotate:angle_after-angle_before+this.rotate,
        })
      }
      this.start_x=current_x;
      this.start_y=current_y;
  },
  

  chooseImg(e){
    console.log(e);
    this.setData({
      is_sticker:true,
      currentHatId:e.target.dataset.hatId
    })
  },
  combinePic(){
    app.globalData.scale=this.scale;
    app.globalData.rotate = this.rotate;
    app.globalData.hat_center_x = this.hat_center_x;
    app.globalData.hat_center_y = this.hat_center_y;
    app.globalData.currentHatId = this.data.currentHatId;
    wx.navigateTo({
      url: '../combine/combine',
    })
  },
  deletesticker:function(e){
    this.setData({
      is_sticker:false
    })
  }
})