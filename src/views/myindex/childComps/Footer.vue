<template>
  <div class="footer">
    
    <div class="footer_btn">
      <div class="contact">
        <span class="iconfont icon_zhuyex"></span>
        <div class="text">前往首页</div>
      </div>
      <div class="car_btn">车辆上架</div>
    </div>
  
  </div>
</template>

<script>
  export default {
    name: "Footer"
  }
</script>

<style scoped>
  .footer {
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
  
  .footer .contact {
    width: 1.94rem;
    background-color: #fff;
    color: #999;
    font-size: .20rem;
    padding-top: .10rem;
    border-top: 0.01rem solid rgb(232, 232, 232);
  }
  
  .footer .car_btn {
    flex: 1;
    background-color: #fa0;
    color: #fff;
    font-size: .28rem;
    line-height: .90rem;
    border-radius: 0;
  }
</style>
