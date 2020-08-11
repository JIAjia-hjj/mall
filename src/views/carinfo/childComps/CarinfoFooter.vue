<template>
  <div class="carinfo_footer">

      <div class="footer_btn">
        <div class="contact" @click="showShare">
          <span class="iconfont icon_share"></span>
          <div class="text">一键分享</div>
        </div>
        <div class="lower">获取最低价</div>
      </div>

  </div>
</template>

<script>
  export default {
    name: "CarinfoFooter",
    methods:{
      showShare(){

      }
    }
  }
</script>

<style scoped>
  .carinfo_footer {
    width: 100%;
    height: .90rem;
  }
  .footer_btn{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
    z-index: 6;
    height: .90rem;
    display: flex;
    margin: 0 auto;
    max-width: 750px;
  }
  
  .carinfo_footer .contact {
    width: 1.94rem;
    background-color: #fff;
    color: #999;
    font-size: .20rem;
    padding-top: .10rem;
    border-top: 0.01rem solid rgb(232, 232, 232);
  }
  
  .carinfo_footer .lower {
    flex: 1;
    background-color: #fa0;
    color: #fff;
    font-size: .28rem;
    line-height: .90rem;
    border-radius: 0;
  }
  /*@supports (bottom: constant(safe-area-inset-bottom)) or (bottom: env(safe-area-inset-bottom)) {*/
    /*.carinfo_footer {*/
      /*height: constant(1.90rem + env(safe-area-inset-bottom));*/
      /*height: calc(1.90rem+ env(safe-area-inset-bottom));*/
    /*}*/
  
    /*.footer_btn{*/
      /*padding-bottom: constant(safe-area-inset-bottom);*/
      /*padding-bottom: env(safe-area-inset-bottom);*/
    /*}*/
  
  /*}*/
</style>
