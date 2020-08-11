<template>
  <div class="coupon_title">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "CouponTitle"
  }
</script>

<style scoped>
  .coupon_title{
    color: #fff;
    display:  flex;
    padding:.24rem;
    line-height: .56rem;
    align-items: center;
  }
  .coupon_title .left{
    font-size: .40rem;
    font-weight: bold;
  }
  .coupon_title  .right{
    flex: 1;
    font-size: .32rem;
    text-align: right;
  }
</style>
