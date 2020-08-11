<template>
  <div class="my_info">
    <div class="photo">
      <img :src="marketerInfo&&marketerInfo.avatar?marketerInfo.avatar:''" style="width:1.20rem;height:1.20rem"/>
    </div>
    <div class="info_text">
      <div class="text_name oneline">
        {{marketerInfo&&marketerInfo.name}}
      </div>
      <div class="text_txt">
        喜相逢高级购车顾问
        <span class="iconfont icon_renzheng"></span>
      </div>
      <a class="callphone" :href="'tel:'+marketerInfo&&marketerInfo.mobile" >
        <span class="iconfont icon_dianhua"></span>
        <span class="callphone_txt">电话咨询</span>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "MyInfo",
    props:{
      marketerInfo:{
        type:Object,
        default(){
          return {}
        }
      }
    }
  }
</script>

<style scoped>
  .my_info {
    background-color: #fff;
    padding: .24rem .48rem 0;
    height: 1.68rem;
    display: flex;
    
  }
  
  .my_info .photo {
    width: 1.20rem;
    height: 1.20rem;
    border-radius: 50%;
    background: #f5f5f9;
    border:.01rem solid #e4e4e4;
    overflow: hidden;
  }
  
  .my_info .photo img {
    margin: -0.01rem;
  }
  
  .my_info .info_text {
    padding: .16rem .24rem;
    font-size: .32rem;
  }
  .info_text .text_name {
    display: block;
    color: #333;
    font-size: .36rem;
    line-height: .36rem;
    font-weight: bold;
    text-align: left;
    width: 4.24rem;
  }

  .info_text .text_txt {
    color: #333;
    margin-top: .21rem;
    font-size: .28rem;
  }
  .icon_renzheng {
    font-size: .28rem;
    color: #fa0;
  }

  .my_info .callphone {
    position: absolute;
    top: 0;
    right: 0;
    font-size: .24rem;
    color: #333;
    padding: .32rem .24rem;
  }

  .my_info .callphone .icon_dianhua {
    font-size: .24rem;
    color: #333;
    padding-right: .12rem;
  }
</style>
