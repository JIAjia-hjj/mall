<template>
  <div class="xxf_credit" @click="displayCreditFrame">
    <div class="credit_item">
      <span class="iconfont icon_creditx1"></span>
      <div class="text">两证一卡</div>
    </div>
    <div class="credit_item">
      <span class="iconfont icon_creditx2"></span>
      <div class="text">90%通过率</div>
    </div>
    <div class="credit_item">
      <span class="iconfont icon_creditx3"></span>
      <div class="text">29分钟提车</div>
    </div>
    <div class="credit_item">
      <span class="iconfont icon_creditx4"></span>
      <div class="text">全国直营</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Creadit",
    methods:{
      displayCreditFrame(){
      
      }
      
    }
  }
</script>

<style scoped>
  
  .xxf_credit{
    padding: 0.22rem 0.2rem 0.18rem;
    display: flex;
    justify-content: space-around;
    background-color: #fff;
    /*border-bottom:0.01rem solid #e4e4e4;*/
  }
  .xxf_credit .text{
    margin-top: 0.02rem;
  }
  .credit_item{
    flex: 1;
    text-align: center;
    font-size: 0.28rem;
  }
  .credit_item .text{
    font-size: 0.24rem;
    color: #333333;
    margin-top: 0.08rem;
  }
  .credit_item .iconfont{
    display: inline-block;
    height: 0.6rem;
    line-height: 0.6rem;
    font-size:0.64rem;
    
  }
  .credit_item .icon_creditx1{
    color: #FF7700;
  }
  .credit_item .icon_creditx2{
    color: #FFAA00;
  }
  .credit_item .icon_creditx3{
    color: #0099FF;
  }
  .credit_item .icon_creditx4{
    color: #20D432;
  }
  
  
</style>
