<template>
  <div>
    <title-bar>
      <span slot="left">购车流程</span>
      <router-link class="right" to="/list">轻松4步，马上提车</router-link>
    </title-bar>
    <div class="process">
      <div class="process_item">
        <span class="iconfont icon_daodian"></span>
        <div class="txt">预约到店</div>
        <div class="iconfont icon_jiantou"></div>
      </div>

      <div class="process_item">
        <span class="iconfont icon_qianyue"></span>
        <div class="txt">洽谈签约</div>
        <div class="iconfont icon_jiantou"></div>
      </div>
      <div class="process_item">
        <span class="iconfont icon_zhifu"></span>
        <div class="txt">首付支付</div>
        <div class="iconfont icon_jiantou"></div>
      </div>
      <div class="process_item">
        <span class="iconfont icon_tiche"></span>
        <div class="txt">马上提车</div>
      </div>
    </div>
  </div>
</template>

<script>
  import TitleBar from 'components/content/titleBar/TitleBar'
  export default {
    name: "CarinfoProcess",
    components:{
      TitleBar
    }
  }
</script>

<style scoped>
  .process {
    padding: .25rem 0;
    display: flex;
    justify-content: space-around;
  }
  
  .process .process_item {
    flex: 1 1;
    text-align: center;
    position: relative;
  }
  
  .process .process_item .iconfont {
    display: inline-block;
    height: .72rem;
    line-height: .72rem;
    font-size: .72rem;
    color: #666;
  }
  
  .process .process_item .icon_qianyue {
    font-size: .50rem;
    padding-top:.08rem;
  }
  
  .process .process_item .text {
    margin-top: .10rem;
    color: #333;
    font-size: .28rem;
  }
  
  .process .process_item .icon_jiantou {
    position: absolute;
    top: .10rem;
    right: -.16rem;
    font-size: .26rem;
    color: #999;
  }


  /* 头部样式 */
  .public_title {
    margin-left: .24rem;
    border-bottom:.01rem solid #E4E4E4;
    padding: .24rem .32rem .24rem .18rem;
    display: flex;
    justify-content: space-between;
    align-content: center;
    background-color: #fff;
  }
  .title_left {
    font-weight: bold;
    font-size: .32rem;
    position: relative;
  }

  .title_left::before {
    content: '';
    height: .32rem;
    width:.06rem;
    background-color: #fa0;
    display: inline-block;
    margin-right: .10rem;
    position: absolute;
    top:.07rem;
    left: -.15rem;
  }

  .title_right {
    color: #999;
    font-size: .28rem;
    margin-top:.04rem;
  }
  .title_right .iconfont{
    font-size: .28rem;
  }
</style>
