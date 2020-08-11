<template>
  <!-- 券的规则 -->
  <div class="frame" @click="closeFrame">
    <div class="coupon_rule"  @click.stop="noUseClick">
      <div class="title">使用规则</div>
      <span class="iconfont icon_quxiao"  @click="closeFrame"></span>
      <div class="rule_box">
        
        <div class="rule_item d_flex">
          <span class="rule_title">优惠卷类型</span>
          <span class="rule_content oneline coupon_title">{{couponItem.title}}</span>
        </div>
        <div class="rule_item d_flex">
          <span class="rule_title">适用车型</span>
          <span class="rule_content oneline"> {{couponItem.carJsonList == ''||couponItem.carJsonList == [] ? '所有车型' : couponItem.carJsonList.name}}</span>
        </div>
        <div class="rule_item d_flex">
          <span class="rule_title">适用条件</span>
          <span class="rule_content oneline">满{{couponItem.conditions}}元可用</span>
        </div>
        <div class="rule_item d_flex">
          <span class="rule_title">有效时间</span>
          <span class="rule_content oneline">{{couponItem.timeDetail}}</span>
        </div>
        
        <div class="rule_item rule_item_rule">
          <span class="rule_title">优惠券规则</span>
          <div class="rule_content coupon_description">
            <div v-html="couponItem.description"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "CouponRule",
    props:{
      couponItem:{
        type:Object,
        default(){
          return {}
        }
      }
    },
    methods:{
      noUseClick(e){
        e.preventDefault();
  
      },
      closeFrame(){
        this.$emit('closeFrame');
      }
    }
  }
</script>

<style scoped>
  .frame {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 999;
    overflow: hidden;
    width: 7.50rem;
    margin: 0 auto;
  }
  
  .coupon_rule {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 7.50rem;
    height: 10.20rem;
    background: #fff;
    border-radius: .12rem .12rem 0 0;
  }
  
  .coupon_rule .title {
    width: 6.54rem;
    margin: 0 auto;
    height: 1.10rem;
    line-height: 1.10rem;
    color: #333;
    font-size: .32rem;
    text-align: center;
    border-bottom: 1px solid #e4e4e4;
    font-weight: bold;
  }
  
  .coupon_rule .icon_quxiao {
    position: absolute;
    font-size: .24rem;
    color: #999;
    padding: .40rem .50rem;
    top: 0;
    right: 0;
  }
  
  .coupon_rule .rule_box {
    padding: 0 .30rem 0.24rem .24rem;
    height: 9.12rem;
    overflow-y: scroll;
  }
  .coupon_rule .rule_item{
    padding-top: .25rem;
  }
  .coupon_rule  .rule_item_rule{
    margin-top: .25rem;
    position: relative;
  }
  .coupon_rule  .rule_item_rule::before{
    content: '';
    width: 6.54rem;
    height:.01rem;
    background-color: #e4e4e4;
    position: absolute;
    top: 0;
    left: 50%;
    margin-left: -3.27rem;
    font-weight: bolder;
  }
  .coupon_rule .d_flex .rule_content{
    padding-top: 0;
    max-width: 5rem;
  }
  .coupon_rule   .rule_content{
    padding-top: .12rem;
  }
  .coupon_rule .rule_title {
    color: #333;
    font-size: .32rem;
    font-weight: bold;
    height: .44rem;
    display: inline-block;
    line-height: .44rem;
  }
  
  .coupon_rule .rule_content {
    color: #666 !important;
    font-size: .28rem !important;
  }
  .coupon_rule .rule_content.coupon_title{
    color:#666 !important;
  }
  .coupon_rule .rule_content.coupon_description{
    line-height: .48rem;
  }
  .d_flex{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
