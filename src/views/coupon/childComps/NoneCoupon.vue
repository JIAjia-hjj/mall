
<template>
  <div>
    <router-link class="kaquan_btn"  to="/mycoupon">
      <span class="iconfont icon_kaquan"></span>我的卡包券
    </router-link>
    <div class="no_coupon" >
      <img class="nocoupon_icon" src="https://sprogram.xxfgo.com/images/appserve/coupon/nocoupon_icon.png" style="width:1.4rem"/>
      <div class="coupon_txt1">优惠券都被领完了</div>
      <div class="coupon_txt2">先去选车页面挑选自己心仪的车型吧！</div>
      <router-link class="coupon_btn" to="/list">
        马上选车
      </router-link>
    </div>
  </div>
</template>
<script>
  export default {
    name: "NoneCoupon"
  }
</script>

<style scoped>
  .kaquan_btn{
    line-height: .96rem;
    font-size: .28rem;
    color:#999;
    width: 2.52rem;
    float: right;
  }
  .icon_kaquan{
    padding-right:.08rem;
    font-size: .38rem;
    vertical-align: middle;
    
  }
  .no_coupon {
    text-align: center;
    width: 100%;
    position: absolute;
    top: 50%;
    transform: translateY(-66%);
    left: 0;
  }
  .no_coupon .nocoupon_icon{
    margin: 0 auto;
  }
  .no_coupon .coupon_txt1{
    color: #666;
    font-size: .32rem;
    padding-top:.12rem;
    line-height:.64rem;
  }
  .no_coupon .coupon_txt2{
    color: #999;
    font-size: .24rem;
    
  }
  .no_coupon .coupon_btn {
    display: block;
    color: #fff;
    font-size: .28rem;
    background: #FFAA00;
    width: 2.00rem;
    margin: .48rem auto 0;
    height: .72rem;
    line-height: .72rem;
    border-radius: .12rem;
  }

</style>
