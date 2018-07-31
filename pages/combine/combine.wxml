<import src='/pages/common/common_bar.wxml' />

<!--引用自定义导航栏模板-->
<template is="bar" data='{{statusBarHeight:statusBarHeight,titleBarHeight:titleBarHeight,left_type:1,title_txt:"头像达人"}}' />
<view style='padding-top:{{statusBarHeight + titleBarHeight}}px;'>
  <canvas  class="myCanvas" canvas-id="myCanvas" style="height:300px;;width:100%;margin-top:40px;" bindtap='preimage'/>
  <button bind:tap="savePic" class='result_btn'>保存至相册</button>
</view>
