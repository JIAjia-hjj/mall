<template>
  <div>
    <div class="coupon_item">
      <slot name="couponbg"></slot>
      <div class="coupon_content">
        
        <div class="amount noused_color" :style="{fontSize:couponItem.amount.length>4||couponItem.amount>9999?'.58rem':'.72rem'}" >
          <span class="icon_yuan">¥</span>{{couponItem.amount}}
        </div>
        <div class="info">
          <div class="type">
            <span class="title towline">{{couponItem.title}}</span>
            <span class="rule_btn"  @click="showCouponRule(couponItem.id)">使用规则</span>
          </div>
          <div class="conditions">满{{couponItem.conditions}}元可用</div>
          <div class="time">有效期：{{couponItem.timeDetail}}</div>
        </div>
        <div  class="receive_btn">
          <slot name="receive"></slot>
        </div>
    
      </div>
    </div>
    <!-- 券的规则 -->
    <coupon-rule v-if="isShowCouponRule" :couponItem="couponItem" @closeFrame="closeFrame"></coupon-rule>
  </div>


</template>

<script>
  import CouponRule from './CouponRule'
  export default {
    name: "CouponItem",
    props:{
      couponItem:{
        type:Object,
        default(){
          return {}
        }
      }
    },
    components:{
      CouponRule
    },
    data(){
      return {
        isShowCouponRule:false
      }
    },
    methods:{
      closeFrame(){
        this.isShowCouponRule=false;
      },
      showCouponRule(){
        this.isShowCouponRule=true;
      }
    },
    created() {

    }
  }
</script>

<style scoped>
  .coupon_item {
    position: relative;
    display: inline-block;
    width: 7.38rem;
    height: 2.10rem;
    overflow: hidden;
    margin: 0.06rem;
  }
  
  .coupon_content {
    position: absolute;
    top: .17rem;
    left: .19rem;
    display: flex;
    width: 7.02rem;
    height: 1.80rem;
  }
  
  .coupon_content .amount {
    font-family: 'DINbek', sans-serif;
    font-size: .72rem;
    line-height: 1.80rem;
    font-weight: bold;
    color: #fff;
    width: 2.26rem;
    text-align: center;
  }
  
  .coupon_content .amount .icon_yuan {
    font-size: .28rem;
    padding-right:.08rem;
  }
  
  .coupon_content .info {
    flex: 1;
    padding: .12rem;
  }
  
  .coupon_content .info .type {
    height: .80rem;
    position: relative;
  }
  
  .coupon_content .info .title {
    font-size: .28rem;
    color: #333;
    font-weight: bold;
    width: 2.30rem;
    line-height: .40rem;
  }
  
  .towline{
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  
  .coupon_content .info .rule_btn {
    font-size: .20rem;
    color: #999;
    position: absolute;
    top: -.08rem;
    right: 0;
    padding: .12rem;
    -webkit-transform-origin-x: 0;
    -webkit-transform: scale(0.80);
  }
  
  .coupon_content .info .usecar {
    font-size: .24rem;
    color: #999;
    padding-top:.04rem;
  }
  .coupon_content .info .conditions{
    font-size: .24rem;
    color: #999;
    padding-top:.04rem;
  }
  
  .coupon_content .info .time {
    color: #c8c8c8;
    font-size: .20rem;
    padding-top:.08rem;
    -webkit-transform-origin-x: 0;
    -webkit-transform: scale(0.80);
    white-space: nowrap;
    width: 3rem;
  }
  
  .coupon_content .receive_btn {
    width: 1.16rem;
    font-size: .20rem;
    line-height: 1.80rem;
    text-align: center;
  }
  
  
  
  
  
</style>
