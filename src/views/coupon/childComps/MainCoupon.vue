<template>
  
  <div class="main_coupon" :class="isScrollRight?'scroll_left':'scroll_right'">
    <coupon-title v-show="couponType=='general'">
      <div slot="left">通用券</div>
      <div slot="right">一券在手，全场通用</div>
    </coupon-title>
    <coupon-title  v-show="couponType=='special'">
      <div slot="left">专用券</div>
      <div slot="right">爆款车型，享受折上折</div>
    </coupon-title>
    <div  class="coupon_box" >
      <div class="coupon_list">
        <div class="coupon_item p_re" v-for="(item,index) in carList" :key="item.id">
          <img v-if="item.receive==0" :src="'https://sprogram.xxfgo.com/images/appserve/coupon/'+couponType+'_bg'+index%3+'.png'"  style="width:5.65rem"/>
          <img v-if="item.receive==1" :src="'https://sprogram.xxfgo.com/images/appserve/coupon/'+couponType+'_receive.png'"  style="width:5.65rem"/>
          <div class="coupon_content p_ab">
            <div class="info" :class="{receive_info:item.receive==1}">
              <div class="title">{{item.title}}</div>
              <div class="amount">
                <span class="icon_yuan">¥</span>{{item.amount}}
              </div>
              <div class="conditions">满{{item.conditions}}元可用</div>
              <div class="time">有效时间：{{item.time}}</div>
            </div>
            <div class="rule_btn p_ab" v-show="item.receive==0&&couponType=='special'"  @click="showCouponRule(item)">规则说明</div>
            <div class="p_ab" :class="couponType=='special'?'special_btn':'general_btn'"  @click="receiveCoupon(item)">
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 券的规则 -->
    <coupon-rule v-if="isShowCouponRule" :couponItem="nowCouponClickItem" @closeFrame="closeFrame"></coupon-rule>
  </div>
</template>

<script>
  import CouponTitle from './CouponTitle'
  import CouponRule from 'components/content/couponItem/CouponRule'
  export default {
    name: "MainCoupon",
    components:{
      CouponTitle,
      CouponRule
    },
    props:{
      carList:{
        type:Array,
        default(){
          return []
        }
      },
      couponType:{
        type: String,
        default:''
      }
    },
    data(){
      return{
        isScrollRight:false,
        isShowCouponRule:false,
        nowCouponClickItem:{},
      }
    },
    methods:{
      receiveCoupon(item){
        item.type=this.couponType;
        this.$emit('receiveCoupon',item)
      },
      showCouponRule(item){
        this.nowCouponClickItem=item;
        this.isShowCouponRule=true;
      },
      closeFrame(){
        this.isShowCouponRule=true;
      }
      
    }
    
  }
</script>

<style scoped>
  .main_coupon .coupon_box{
    position: absolute;
    top: 0;
    left: 0;
    width: 7.30rem;
    height:4.23rem;
    white-space:nowrap;
    border-radius: .30rem;
    overflow-x: scroll;
    overflow-y: hidden;
  }
  .main_coupon.scroll_right::after{
    position: absolute;
    content: '';
    top: 0;
    right: 0;
    width: 0;
    height:4.23rem;
    box-shadow: 0 0 .45rem .20rem rgba(196, 51, 0, 0.8);
    z-index: 2;
    animation:boxShow 2s both;
    -webkit-animation:boxShow 2s both;
  }
  .main_coupon.scroll_left::before{
    position: absolute;
    content: '';
    top: 0;
    left: 0;
    width: 0;
    height:4.23rem;
    box-shadow: 0 0 .45rem .18rem rgba(196, 51, 0, 0.8);
    z-index: 2;
    animation:boxShow 2s both;
    -webkit-animation:boxShow 2s both;
  }
  
  @keyframes boxShow{
    0%{
      opacity:0.2;
    }
    100%{
      opacity: 1;
    }
  }
  .main_coupon .coupon_list{
    /* display: flex; */
    padding:0 .10rem;
    position: absolute;
    top: 1.08rem;
  }
  .main_coupon .coupon_item {
    margin: 0 .18rem;
    display: inline-block;
    position: relative;
    
  }
  .main_coupon .coupon_item img{
    position: relative;
    z-index: 1;
  }
  .main_coupon .coupon_item::before{
    content: '';
    width: 5.10rem;
    height:2.08rem;
    position: absolute;
    top:.20rem;
    left: 50%;
    transform: translateX(-50%);
    box-shadow: 0 0 .50rem .30rem rgba(196, 51, 0, 0.63);
    z-index: 0;
  }

  .coupon_content {
    top: 0;
    left: 0;
    width: 5.60rem;
    height: 2.61rem;
    padding: .20rem;
    /* display: flex; */
    z-index: 1;
  }
  .coupon_content .info{
    width:2.90rem;
    height: 2.12rem;
    padding:.04rem 0 0 .20rem;
    color: #fff;
  }
  .coupon_content .title {
    font-size: .40rem;
    font-weight: bold;
  }
  .coupon_content .amount {
    /*font-family: 'DINbek', sans-serif;*/
    /* font-family: '黑体', sans-serif;  */
    font-size: .77rem;
    font-weight: bold;
    padding: 0.03rem 0;
    /*line-height: .77rem;*/
  }

  .coupon_content .amount .icon_yuan {
    font-family: 'PingFang SC','苹方', sans-serif;
    font-size: .51rem;
    padding-right:.08rem;
    font-weight: normal;
  }
  .coupon_content .conditions{
    color: #00fff6;
    font-size: .24rem;
  }
  .coupon_content .time {
    color: #00fff6;
    font-size: .20rem;
    padding: 0.1rem 0;
  }
  .coupon_content .receive_info{
    color: #666;
  }
  .coupon_content .receive_info .conditions{
    color: #666;
  }
  .coupon_content .receive_info .time{
    color: #666;
  }

  .coupon_content .general_btn{
     border: 1px solid #fff;
    width: 1.95rem;
    height: .80rem;
    top: .87rem;
    right: .25rem;
    
  }
  .coupon_content .special_btn{
     border: 1px solid #fff;
    width: 1.95rem;
    height: .80rem;
    top: .56rem;
    right: .30rem;
  }
  .coupon_content .rule_btn{
    font-size: .20rem;
    color: #fff;
    top: .20rem;
    right: .50rem;
    -webkit-transform-origin-x:0;
    -webkit-transform: scale(0.90);
  }

</style>
