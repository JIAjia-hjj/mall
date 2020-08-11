<template>
  <!-- 专用券 -->
  <div class="coupon_special">
    <coupon-title>
      <div slot="left">专用券</div>
      <div slot="right">爆款车型，享受折上折</div>
    </coupon-title>
    <div class="coupon_list">
      <div class="coupon_item" v-for="(item,index) in specialCoupons" :key="item.id">
        <couponItem :couponItem="item">
          <img slot="couponbg" style="width:7.36rem"  :src="'https://sprogram.xxfgo.com/images/appserve/coupon/coupon_bg'+item.receive+'.png'" />
          <div slot="receive" class="receive_btn"  @click="receiveCoupon(item)">
            {{item.receive==0?'马上领取':'去使用'}}
          </div>
        </couponItem>
      </div>
    </div>
  </div>
</template>

<script>
  import CouponTitle from './CouponTitle'
  import CouponItem from 'components/content/couponItem/CouponItem'
  export default {
    name: "SpecialCoupon",
    components:{
      CouponTitle,
      CouponItem
    },
    props:{
      specialCoupons:{
        type:Array,
        default(){
          return []
        }
      }
    },
    methods:{
      receiveCoupon(item){
        item.type='special';
        this.$emit('receiveCoupon',item)
      }
    }
  }
</script>

<style scoped>
  .coupon_special .coupon_item{
    position: relative;
    margin-bottom:.04rem;
  }
  
  .coupon_special .coupon_item::after{
    content: '';
    display: block;
    width:7.02rem;
    height: 1px;
    position: absolute;
    bottom: 0;
    right: 0;
    background-color: #fff;
  }
  .coupon_special .coupon_item:last-child{
    margin-bottom: -.10rem;
  }
  .coupon_special .coupon_item:last-child::after{
    height: 0;
  }
  
  .coupon_special .receive_btn{
    width: 1.16rem;
    font-size: .20rem;
    line-height: 1.80rem;
    text-align: center;
    color: #FFAA00;
  }
</style>
