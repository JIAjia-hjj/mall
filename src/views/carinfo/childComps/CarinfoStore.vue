<template>
  <div>
    <title-bar>
      <span slot="left">在您附近找一家门店</span>
      <span class="right" >已有 <span> {{reserveNum}}</span> 人预定</span>
    </title-bar>
    <div class="store">
      <div class="name">{{$store.state.location.storeName}}</div>
      <div class="credit">
        <div class="credit_item">
          <span class="iconfont icon_credit1"></span>
          <div class="txt">两证一卡</div>
        </div>
        <div class="credit_item">
          <span class="iconfont icon_credit2"></span>
          <div class="txt">90%通过率</div>
        </div>
        <div class="credit_item">
          <span class="iconfont icon_credit3"></span>
          <div class="txt">29分钟提车</div>
        </div>
        <div class="credit_item">
          <span class="iconfont icon_credit4"></span>
          <div class="txt">全国直营</div>
        </div>
      </div>
      <div class="btn_box">
        <div class="btn" @click="submit">免费到店试车</div>
      </div>
  
    </div>
  </div>
</template>

<script>
  
  import {getStoreInfo} from 'network/carinfo'
  
  import TitleBar from 'components/content/titleBar/TitleBar'
  export default {
    name: "CainfoStore",
    components:{
      TitleBar
    },
    data(){
      return{
        reserveNum:'',
        storeName:''
      }
    },
    methods:{
      submit(){
      
      }
    },
    mounted() {
    
    }
  }
</script>

<style scoped>
  .store {
    padding: .25rem .48rem 0;
  }
  
  .store .name {
    font-size: .28rem;
    font-weight: bolder;
    height: .40rem;
    line-height: .40rem;
  }
  
  .store .name::before {
    content: '\e618';
    font-family: 'iconfont';
    color: #fa0;
    padding:.18rem .10rem;
    font-size: .24rem;
  }
  .credit {
    display: flex;
    justify-content: space-between;
    padding: .50rem .20rem .20rem;
    position: relative;
  }

  .credit .credit_item {
    text-align: center;
    color: #333;
  }

  .credit .credit_item .iconfont {
    height: .60rem;
    line-height: .60rem;
    font-size: .40rem;
    display: inline-block;

  }

  .credit .credit_item .icon_credit1 {
    font-size: .34rem;
  }

  .credit .credit_item .txt {
    padding-top: .10rem;
    font-size: .24rem;
  }
  .store .btn_box {
    width: 6.54rem;
    border-top:.01rem solid #E4E4E4;
    margin-top: .48rem;
  }
  .store .btn{
    width: 100%;
    height: .96rem;
    line-height: .96rem;
    text-align: center;
    font-size: .32rem;
    font-weight: bold;
    color: #FFAA00;
  
  }
</style>
