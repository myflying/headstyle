<!--home.wxml-->
<swiper indicator-dots="{{indicatorDots}}"
    autoplay="{{autoplay}}" interval="{{interval}}" duration="{{duration}}">
    <block wx:for="{{banner}}"  wx:key="id" wx:for-item="item">
      <swiper-item>
          <image src="{{item.simg}}" class="slide-image" mode='widthFix' bindtap='banner' data-sid='{{item.sid}}' data-item='{{item}}'/>
      </swiper-item>
    </block>
</swiper>

<view class='type-content'>
    <view class='type-item' wx:for="{{typedata}}" wx:key="id" wx:for-item="item" bindtap='category' data-index='{{index}}' data-item="{{item}}">
        <image class='type-image' src='../../images/{{item.imageUrl}}' mode='widthFix'></image>
        <text>{{item.typeName}}</text>
    </view>
</view>
<view class='img-list'>
 <block wx:for="{{array}}" wx:key="id" wx:for-item="item">
    <view wx:if='{{ (index) % 15 == 0}}' class='ad'><ad unit-id="adunit-bc2708a82ac831ef" class="ad-show"></ad></view>
    <view class='img-item' style="{{item.fixStyles}}"  bindtap='imagedetail' data-index='{{index}}'>
       <image src='{{item.hurl}}' class='item-img' mode='widthFix'></image>
    </view>
 </block>
 <view class='load_more' wx:if="{{is_load_more}}"><image src='/images/load_more.gif' class='load_more_image'></image></view>
</view>

<!--弹窗下载APP-->
<view class="modal-mask" catchtouchmove="preventTouchMove" bindtap='hideModal' wx:if="{{showModal}}"></view>
<view class="modal-dialog" wx:if="{{showModal}}">
    <view class='modal-top'>
      <view class="modal-title">个性头像</view>
      <view class="modal-content">
          <view class='model-content-item'><image src='/images/logo.png' class='close-image'></image></view>
          <view class='model-content-item'><text class='app-name'>个性头像</text></view>
          <view class='down-tip'>
            <view class='model-content-item'><text>去应用商店和AppStore搜索</text></view>
            <view class='model-content-item'><text>"个性头像"</text></view>
            <view class='model-content-item'><text>下载APP做时尚达人吧</text></view>
          </view>
      </view>
    </view>
    <view class="modal-footer" bindtap='hideModal'>
        <image src='/images/close_icon.png' class='close-image'></image>
    </view>
</view>