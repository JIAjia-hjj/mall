<template>
  <div class="bottom_tip">
    <span class="bottom_txt">已经到底了</span>
  </div>
</template>

<script>
  export default {
    name: "BottomTip"
  }
</script>

<style scoped>
  .bottom_tip {
    text-align: center;
    color: #bebebe;
    font-size: .28rem;
    line-height: .90rem;
    position: relative;
    letter-spacing:.11rem;
  }
  
  .bottom_txt::before {
    content: '';
    width: 30%;
    height: 1px;
    background-color:#bebebe;
    position: absolute;
    top: .45rem;
    left: .30rem;
    font-weight: bolder;
  }
  
  .bottom_txt::after {
    content: '';
    width: 30%;
    height: 1px;
    background-color:#bebebe;
    position: absolute;
    top: .45rem;
    right: .30rem;
  }
</style>
