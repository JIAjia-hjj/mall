<template>

    <div class="list">
      <nav-bar class="home_nav">
        <div slot="left"></div>
        <div slot="center">个人中心</div>
        <div slot="right"></div>
      </nav-bar>
      <div class="my_login">
        <!-- 未登录 -->
        <div class="my_info" v-if="userInfo.isUserInfo">
          <div class="photo" :class="{'border_none':marketerInfo&&marketerInfo.avatar}" >
            <div class="text_name"  @click="getUserInfo" >
              <img :src="userInfo.headimgurl" style="width:1.20rem" />
            </div>
          </div>
          <div class="info_text">
            <div  @click="getUserInfo"  class="text_name">Hi~ 欢迎来到喜相逢</div>
            <div class="text_txt"> {{phone!='未绑定'?'点击头像授权展示个性头像':'登录获取更多优惠信息'}}</div>
          </div>
          <button class="login_btn" >立即登录</button>
        </div>
        <!-- 营销 -->
        <div class="my_info" v-else-if="userInfo.isMarketer&&userInfo.phone!='未绑定'">
          <div class="photo" :class="{'border_none':marketerInfo&&marketerInfo.avatar}" >
            <img :src="marketerInfo&&marketerInfo.avatar?marketerInfo.avatar:'https://sprogram.xxfgo.com/imgs/appserve/nologin_photo.png'" style="width:1.20rem;height:1.20rem"/>
          </div>
          <div class="info_text">
            <div class="text_name oneline">
              {{marketerInfo&&marketerInfo.name}}
            </div>
            <div class="text_txt">
              喜相逢高级购车顾问
              <span class="iconfont icon_renzheng"></span>
            </div>
          </div>
        </div>
        <!-- 用户未授权手机号 -->
        <div class="my_info" v-else-if="userInfo.phone=='未绑定'">
          <div class="photo" :class="{'border_none':marketerInfo&&marketerInfo.avatar}" >>
            <img :src="$store.state.userInfo.headimgurl" style="width:1.20rem;height:1.20rem;"/>
          </div>
          <div class="info_text">
            <div  class="text_name">{{userInfo.nickname}}</div>
            <div class="text_txt"> 登录获取更多优惠信息</div>
          </div>
          <button class="login_btn">立即登录</button>
        </div>
        <!-- 用户 -->
        <div class="my_info" v-else>
          <div class="photo" :class="{'border_none':marketerInfo&&marketerInfo.avatar}" >>
      
            <img :src="userInfo.headimgurl" style="width:1.20rem;height:1.20rem;"/>
          </div>
          <div class="info_text">
            <div class="text_user oneline">{{userInfo.nickname}}</div>
    
          </div>
        </div>
  
      </div>
  
      <div class="my_block">
        <div class="my_tab" v-if="!userInfo.isMarketer || userInfo.phone=='未绑定'">
          <div class="tab_item tab_nome"   @click="jumpPage"  data-title="优惠卡券" data-url="/pages/mycoupon/mycoupon">
            <span class="iconfont icon_youhui"></span>
            <div class="text">优惠卡券</div>
          </div>
          <div class="tab_item"   @click="jumpPage"  data-title="3步选车" data-url="">
            <div class="item_text border_none">
              <span class="iconfont icon_selectcar"></span>
              <div class="text">3步选车</div>
            </div>
          </div>
          <div class="tab_item"   @click="jumpPage"  data-title="关于我们" data-url="/pages/about/about">
            <span class="iconfont icon_about"></span>
            <div class="text">关于我们</div>
          </div>
        </div>
      </div>
      <div class="mareter_block">
        <div class="my_tab"  v-if="userInfo.isMarketer">
          <router-link class="tab_item" to="/myindex">
            <span class="iconfont icon_zhuye"></span>
            <div class="text">我的主页</div>
          </router-link>
          <router-link class="tab_item" to="/mycode">
            <span class="iconfont icon_carimg"></span>
            <div class="text">车型库</div>
          </router-link>
          <router-link class="tab_item" to="/mycode">
            <span class="iconfont icon_img"></span>
            <div class="text">我的图库</div>
          </router-link>
          <router-link class="tab_item" to="/mycode">
            <span class="iconfont icon_erweima"></span>
            <div class="text">小程序码</div>
          </router-link>
        </div>
      </div>
      <div class="my_list">
        <!-- 用户显示推荐有礼、常见问题 -->
        <div class="my_item" v-if="!userInfo.isMarketer && userInfo.phone!='未绑定'"   @click="jumpPage"  data-title="推荐有礼" data-url="/activity/recommend/recommend">
          <div class="item_text">
            <span class="iconfont icon_liwu"></span>
            <span class="txt">推荐有礼</span>
            <span class="tip">奖励1000元现金</span>
          </div>
        </div>
        <div class="my_item" v-if="!userInfo.isMarketer && userInfo.phone!='未绑定'"  @click="jumpPage" data-title="常见问题" data-url="/pages/problem/problem">
          <div class="item_text">
            <span class="iconfont icon_problem"></span>
            <span class="txt">常见问题</span>
          </div>
        </div>
        <!-- 营销人员显示我的客户-->
        <div class="my_item my_kehu" style="font-size:.44rem;" v-if="userInfo.isMarketer && userInfo.phone!='未绑定'"   @click="jumpPage"  data-title="我的客户" data-url="/pages/mycustomer/mycustomer">
          <div class="item_text" style="font-size:0.28rem">
            <span class="iconfont icon_kehu"></span>
            <span class="txt">我的客户</span>
            <span class="bubble_tip"	v-if="addMyCustomeNum!=0">{{addMyCustomeNum}}</span>
          </div>
        </div>
        <div class="my_item my_yijian"  @click="jumpPage()"  data-title="意见反馈">
          <div class="item_text"  style="border: none">
            <span class="iconfont icon_yijian"></span>
            <span class="txt">意见反馈</span>
          </div>
        </div>
  
      </div>
      <div class="my_exit nulogo"  @click="exit" v-if="userInfo.phone!=='未绑定'">退出登录</div>
  
      <!-- 提示 -->
      <tip ref="tip"></tip>
      <main-tab-bar></main-tab-bar>
    </div>

</template>

<script>
  import {getCarList} from 'network/list'
  import Tip from 'components/common/tip/Tip'
  import NavBar from 'components/common/navbar/NavBar'
  import MainTabBar from 'components/content/mainTabBar/MainTabBar'
  
  export default {
    name: "Profile",
    components:{
      Tip,
      NavBar,
      MainTabBar
    },
    data(){
      return{
        nowTime:'',
        addMyCustomeNum:0,
        isShowLoginReject:false,//拒绝登录授权弹框
        swiperCurrent: 0,
        bannerList:null
      }
    },
    computed:{
      marketerInfo(){
        console.log(this.$store.state.marketerInfo);
        return this.$store.state.marketerInfo
      },
      userInfo(){
        return this.$store.state.userInfo
      }
    },
    methods:{
      getUserInfo(){
      
      },
      jumpPage(){
      
      },
      exit(){
        this.$router.replace('/login');
      }
    },
    created() {
      console.log('this.$store.userInfo');
      console.log(this.$store.state.userInfo);
    },

  }
</script>

<style scoped>
  /* pages/my/my.wxss */
  
  button {
    background-color: transparent;
  }
  
  .my_login {
    background-color: #fff;
  }
  
  .my_login .login_btn{
    position: absolute;
    top:.24rem;
    right:.48rem;
    display: inline-block;
    padding: 0 .20rem;
    height: .56rem;
    line-height: .56rem;
    color: #fff;
    font-size: .24rem;
    background-color: #FFAA00;
    border-radius: .28rem;
  }
  
  .login_click {
    height: .72rem;
    line-height: .72rem;
    padding: 0 .48rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: rgba(255, 86, 89, 0.1);
    margin-top:.01rem;
  }
  
  .login_click .tip {
    color: #FF563B;
    font-size: .28rem;
  }
  
  .login_click .btn {
    display: inline-block;
    padding: 0 .20rem;
    height: .56rem;
    line-height: .56rem;
    color: #fff;
    font-size: .24rem;
    background-color: #FF563B;
    border-radius: .28rem;
  }
  
  .my_info {
    background-color: #fff;
    padding: .24rem .48rem 0;
    height: 1.68rem;
    display: flex;
  }
  
  .my_info .photo {
    width: 1.20rem;
    height: 1.20rem;
    border-radius: 50%;
    background: #f5f5f9;
    border:.01rem solid #e4e4e4;
    overflow: hidden;
  }
  
  .my_info .photo img {
    margin: -0.01rem;
  }
  
  .my_info .info_text {
    padding: .16rem .24rem;
    font-size: .32rem;
  }
  
  .info_text .text_name {
    display: block;
    color: #333;
    font-size: .36rem;
    line-height: .36rem;
    font-weight: bold;
    text-align: left;
    width: 4.24rem;
  }
  
  .info_text .text_txt {
    color: #999;
    margin-top: .21rem;
    font-size: .28rem;
  }
  
  .icon_renzheng {
    font-size: .28rem;
    color: #fa0;
  }
  
  .text_user {
    height: .80rem;
    line-height: .96rem;
    font-size: .36rem;
    font-weight: bold;
    width: 4.24rem;
    display: block;
  }
  
  .my_list {
    margin-top: .24rem;
    margin-bottom: .24rem;
  }
  
  .my_list .my_item::after {
    border: none;
  }
  
  .my_list .my_yijian {
    border-bottom:.01rem solid #e4e4e4;
  }
  
  .nulogo {
    border-bottom:.01rem solid #e4e4e4;
  }
  
  .my_list .my_item {
    text-align: left;
    font-size: .28rem;
    position: relative;
    display: flex;
    justify-content: space-between;
    background-color: #fff;
    height: .90rem;
    
  }
  
  .my_list .my_item .item_text {
    display:flex;
    align-items: center;
    width: 100%;
    margin-left: .48rem;
    padding-right: .48rem;
    border-bottom: 1px solid #E4E4E4;
    position: relative;
    font-size: .28rem;
    color: #333;
  }
  
  .my_list .item_text .iconfont {
    margin-right: .24rem;
    color: #333;
    border-radius:.06rem;
    font-size: .40rem;
    display: inline-block;
    line-height: .40rem;
    height: .40rem;
    width: .40rem;
    text-align: center;
  }
  
  .my_list .item_text::after {
    font-family: iconfont;
    content: '\e61c';
    line-height: .90rem;
    width: .30rem;
    position: absolute;
    top: 0;
    right: .38rem;
    color: #999;
    font-size: .34rem;
  }
  
  .my_exit {
    width: 100%;
    background-color: #fff;
    padding: .26rem 1.60rem;
    text-align: center;
    color: #333;
    font-size: .32rem;
  }
  
  .bubble_tip {
    position: absolute;
    top: .27rem;
    right: .91rem;
    background-color: #ff4040;
    display: inline-block;
    height: .40rem;
    min-width: .40rem;
    line-height: .40rem;
    border-radius: .20rem;
    color: #fff;
    font-size: .28rem;
    text-align: center;
    padding: 0 .10rem;
  }
  .my_list .item_text .txt{
    flex: 1;
  }
  .my_list .item_text .tip{
    padding-right:.28rem;
    color: #999;
    font-size: .28rem;
  }
  .my_tab {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    border-bottom:.01rem solid #e4e4e4;
  }
  
  .my_tab .tab_item {
    height: 2.12rem;
    padding: .48rem 0;
    flex: 1;
    position: relative;
    text-align: center;
  }
  .my_tab .tab_item::before {
    content: '';
    width:0.01rem;
    height: .60rem;
    background-color: #E4E4E4;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
  }
  .my_tab .tab_nome::before{
    width:0;
    height:0;
  }
  .mareter_block .tab_item::before{
    width:0;
    height: 0;
  }
  .my_tab .tab_item .iconfont {
    display: inline-block;
    height: .64rem;
    line-height: .64rem;
    text-align: center;
    width: .64rem;
    border-radius: 9.99rem;
    color: #fff;
    font-size: .64rem;
  }
  
  .icon_zhuye,.icon_youhui {
    background-image: linear-gradient(to bottom, #ff8585, #ff4040);
  }
  
  .icon_carimg {
    background-image: linear-gradient(to bottom, #fa0, #f70);
  }
  
  .icon_img,.icon_selectcar {
    background-image: linear-gradient(to bottom, #47b5ff, #09f);
  }
  
  .icon_erweima,.icon_about{
    background-image: linear-gradient(to bottom, #d161ff, #b400ff);
  }
  
  .my_tab .tab_item .text {
    line-height: .40rem;
    font-size: .28rem;
    color: #666;
    padding-top: .12rem;
  }
  
  .my_banner {
    height: 1.20rem;
  }
  .banner_btn{
    border-radius:0
  }
  .banner_btn image{
    margin: 0 auto;
  }
  .swiper-box {
    width: 7.50rem;
    background-color: #fff;
    position: relative;
  }
  
  .dots {
    position: absolute;
    bottom: .12rem;
    display: flex;
    left: 50%;
    transform: translateX(-50%);
    
  }
  
  .dots .dot.active {
    width: .40rem;
    background: #FFFFFF;
  }
  
  .dots .dot {
    width: .20rem;
    height:.08rem;
    background: #F6F6F6;
    background-color: rgba(246, 246, 246, 0.5);
    border-radius:.04rem;
    transition: all .6s;
  }
</style>
