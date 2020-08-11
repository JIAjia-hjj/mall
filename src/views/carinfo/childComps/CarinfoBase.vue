<template>
  <div>
      <div class="carinfo_base1">
        <div class="title">{{carInfo.title}} </div>
        <div class="guide_price">厂商指导价：{{carInfo.guide_price_des}}
          <span :class="carInfo.identifying=='国VI'?'hs':'ls'" :hidden="carInfo.identifying==''?true:false">{{carInfo.identifying}}</span>
        </div>
        <div class="tag">
          <span class="tag_item" v-for="item in carInfo.laber" :key="item.name">{{item.name}}</span>
        </div>
      </div>
      <div class="xx_br" style="text-align: center">
        <img src="https://sprogram.xxfgo.com/images/appserve/xx_br.png"  style="width: 6.92rem;margin: 0 auto"/>
      </div>
      <div class="carinfo_base2 by_bottom">
        <div class="price">
          <div class="price_item downpayments">
            首付
            <span class="money"><span class="icon_yuan">¥</span>{{carInfo.minimum_downpayments}}</span>万元
          </div>
        </div>
      </div>

  </div>
</template>

<script>
  export default {
    name: "CarinfoBase",
    props: {
      carInfo: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    components:{
   
    }
  }
</script>

<style scoped>
  .carinfo_base {
    color: #333;
  }
  
  .carinfo_base1 {
    padding: .20rem .48rem .40rem;
  }
  
  .carinfo_base1 .title {
    font-size: .32rem;
    height: .44rem;
    line-height: .44rem;
    font-weight: bold;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    
  }
  
  .carinfo_base1 .guide_price {
    font-size: .24rem;
    color: #999;
    margin: .12rem 0 .24rem;
  }
  
  .carinfo_base1 .tag .tag_item {
    /* background-color: #fa0; */
    color: #FFAA00;
    border:.01rem solid #FFAA00;
    font-size: .24rem;
    display: inline-block;
    min-width: 1.00rem;
    text-align: center;
    border-radius: .10rem;
    margin-right: .24rem;
    padding: .10rem .12rem;
  }
  
  .carinfo_base2 {
    padding: .40rem .24rem .24rem;
  }
  
  .carinfo_base2 .price {
    background-color: #f5f5f9;
    width: 7.02rem;
    height: 1.12rem;
    line-height: 1.12rem;
    font-size: .36rem;
    display: flex;
    border-radius: .20rem;
  }
  
  .carinfo_base2 .price .price_item {
    flex: 1;
    text-align: center;
    position: relative;
    font-weight: bold;
  }
  
  .carinfo_base2 .price .money {
    color: #fa0;
    font-size: .64rem;
    padding: 0 .12rem;
    font-family: 'DINbek', sans-serif;
  }
  
  .carinfo_base2 .price .icon_yuan {
    font-size: .40rem;
    font-weight: normal;
    padding-right:.03rem;
  }
  .hs {
    color: #FFAA00;
    font-size: .24rem;
    border:.01rem solid #FFAA00;
    border-radius:.08rem;
    padding: 0 .12rem;
    margin-left: .12rem;
    font-weight: 400;
  }

  .ls {
    color: #0099FF;
    font-size: .24rem;
    border:.01rem solid #0099FF;
    border-radius:.08rem;
    padding: 0 .12rem;
    margin-left: .12rem;
    font-weight: 400;
  }


  
</style>
