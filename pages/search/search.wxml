<import src='/pages/common/common_bar.wxml'/>

<!--引用自定义导航栏模板-->
<template is="bar" data='{{statusBarHeight:statusBarHeight,titleBarHeight:titleBarHeight,left_type:1,title_txt:"",is_input:is_input}}'/>
<view style='padding-top:{{statusBarHeight + titleBarHeight}}px;' class='content-view'>
  <view class='every-one'><text>大家都在搜</text></view>
  <view class='hot-view'>
    <view class='hot-txt' wx:for='{{hotarray}}' wx:key='{{id}}' wx:item='{{item}}' data-keyword='{{item.keyword}}' bindtap='hotWordSearch'>
      <text>{{item.keyword}}</text>
    </view>
  </view>
</view>