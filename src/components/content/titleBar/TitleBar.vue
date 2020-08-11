<template>
  
  <div class="title">
    <div class="title_bar">
      <div class="title_left">
        <slot name="left"></slot>
      </div>
      <div class="title_right">
        <slot name="right"></slot>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "Title"
  }
</script>

<style scoped>
  /* 头部样式 */
  .title{
   
    background-color: #fff;
  }
  .title_bar {
    margin-left: 0.48rem;
    border-bottom: 0.01rem solid #E4E4E4;
    padding: 0.24rem 0.32rem 0.24rem 0.18rem;
    display: flex;
    justify-content: space-between;
    align-content: center;
   
  }
  .title_left {
    font-weight: bold;
    font-size: 0.32rem;
    position: relative;
  }
  
  .title_left::before {
    content: '';
    height: 0.32rem;
    width: 0.06rem;
    background-color: #fa0;
    display: inline-block;
    margin-right: 0.1rem;
    position: absolute;
    top: 0;
    left: -0.15rem;
  }
  
  .title_right {
    color: #999;
    font-size: 0.28rem;
    margin-top: 0.04rem;
  }
  .title_right .iconfont{
    font-size: 0.28rem;
  }
</style>
