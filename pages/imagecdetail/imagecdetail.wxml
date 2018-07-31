
<import src='/pages/common/common_bar.wxml' />

<!--引用自定义导航栏模板-->
<template is="bar" data='{{statusBarHeight:statusBarHeight,titleBarHeight:titleBarHeight,left_type:1,title_txt:"头像达人"}}' />

<view class='body_view'>
  <swiper class='wx-swiper' autoplay='{{is_play}}' current="{{currentTab}}" bindchange="bindChange">
    <swiper-item class='wx-swiper-item' wx:key='id' wx:for="{{images}}" wx:for-item="item">
      <image class='wx-image' src='{{item.hurl}}' mode='widthFix'></image>
    </swiper-item>
  </swiper>
</view>

<view class='bottom-content'>
  <view class="bottom-tab">
    <view class="bottom-tab-item" bindtap="toHome">
      <image class='category-img' src='../../images/category_home.png'></image>
      <text class='category-txt'>首页</text>
    </view>
    <view class="bottom-tab-item" bindtap="addKeep">
      <image class='category-img' src='{{is_add_keep_img}}'></image>
      <text class='category-txt'>收藏</text>
      <button class='keep-btn' wx:if='{{canIUse && !is_login}}' open-type="getUserInfo" bindgetuserinfo='onGotUserInfo'></button>
    </view>

    <view class="bottom-tab-item">
        <!--空出来的美化图片位置-->
    </view>

    <view class="bottom-tab-item" bindtap="downimage">
      <image class='category-img' src='../../images/down_img.png'></image>
      <text class='category-txt'>保存</text>
    </view>

    <view class="bottom-share-item">
      <view class='bottom-tab-item'>
        <image class='category-img' src='../../images/category_share.png'></image>
        <text class='category-txt'>分享</text>
      </view>
      <view>
        <button class='share-btn' open-type='share'></button>
      </view>
    </view>
  </view>

  <view class="beau-item" bindtap='imageedit'>
    <image class='beautify-img' src='../../images/beau_img.png'></image>
    <text class='beau-txt'>美化</text>
  </view>

</view>