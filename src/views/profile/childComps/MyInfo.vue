<template>
  <div>
    <!-- 未登录 -->
    <div class="my_info" v-if="!isUserInfo">
      <div class="photo marketerInfo.avatar?'':'border_none'">
        <button class="span_name"  @click="getUserInfo" hover-class="none">
          <img src="https://sprogram.xxfgo.com/imgs/appserve/nologin_photo.png" style="width:1.20rem" />
        </button>
      </div>
      <div class="info_span">
        <button  @click="getUserInfo"  class="span_name">Hi~ 欢迎来到喜相逢</button>
        <div class="span_txt"> {{phone!='未绑定'?'点击头像授权展示个性头像':'登录获取更多优惠信息'}}</div>
      </div>
      <button class="login_btn"   data-url="/pages/bindphone/bindphone">立即登录</button>
    </div>
    <!-- 营销 -->
    <div class="my_info" v-else-if="isMarketer&&phone!='未绑定'">
      <div class="photo marketerInfo.avatar?'':'border_none'">
        <img :src="marketerInfo.avatar?marketerInfo.avatar:'https://sprogram.xxfgo.com/images/appserve/nologin_photo.png'" style="width:1.20rem;height:1.20rem"/>
      </div>
      <div class="info_span">
        <div class="span_name oneline">
          marketerInfo.name
        </div>
        <div class="span_txt">
          喜相逢高级购车顾问
          <span class="iconfont icon_renzheng"></span>
        </div>
      </div>
    </div>
    <!-- 用户未授权手机号 -->
    <div class="my_info" v-else-if="phone=='未绑定'">
      <div class="photo marketerInfo.avatar?'':'border_none'">
        <img :src="headimgurl" style="width:1.20rem;height:1.20rem;" mode="aspectFill"/>
      </div>
      <div class="info_span">
        <div  class="span_name">{{nickname}}</div>
        <div class="span_txt"> 登录获取更多优惠信息</div>
      </div>
      
      <button class="login_btn" open-type="getPhoneNumber"  data-url="/pages/bindphone/bindphone">立即登录</button>
    </div>
    <!-- 用户 -->
    <div class="my_info" v-else>
      <div class="photo marketerInfo.avatar?'':'border_none'">
      
        <img :src="headimgurl" style="width:1.20rem;height:1.20rem;" mode="aspectFill"/>
      </div>
      <div class="info_span">
        <div class="span_user oneline">{{nickname}}</div>
    
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "MyInfo",
    data(){
      return{
        phone: '未绑定',
        openid:'',
        isMarketer:false,
        marketerInfo:null,
        isUserInfo:'',
        businessId:false,
        nowTime:'',
        addMyCustomeNum:0,
        headimgurl:'',
        nickname:'',
        isShowLoginReject:false,//拒绝登录授权弹框
        swiperCurrent: 0,
        bannerList:null
      }
    }
  }
</script>

<style scoped>

</style>
