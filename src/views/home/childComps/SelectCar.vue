<template>
  <div class="select_car">
    <title-bar>
      <div slot="left">代步优选</div>
      <a  slot="right" href="/list" style="color: #999;">更多车型<span class="iconfont icon_fanhui" style="padding-left: 0.05rem"></span></a>
    </title-bar>
    <div class="select">
      <div class="select_box">
        <router-link class="select_item" v-for="(item,index) in selectcarList" :key="item.id" v-if="index<5" :to="'/carinfo'+item.id">
          <img :src="require('assets/img/home/select'+index+'.png')" alt="" style="width:6.2rem">
          <div class="item">
            <div class="item_top">
              <div class="brand ">{{item.jiequ_brand_name}}</div>
              <div class="name">{{item.name}}</div>
            </div>
            <div class="item_bottom">
              <img :src="item.cover_img" alt="" class="img">
              <div class="info">
                <div class="first_price">首付:<span> {{item.minimum_downpayments}}</span> 万</div>
                <div class="btn">立即开走>></div>
              </div>
            </div>
          </div>
        </router-link>
      </div>
   
    </div>
  </div>
</template>

<script>
  import TitleBar from 'components/content/titleBar/TitleBar'
  export default {
    name: "SelectCar",
    props:{
      selectcarList:{
        type:Array,
        default(){
          return []
        }
      }
    },
    components:{
      TitleBar,
      
    }
  }
</script>

<style scoped>
  .select_car{
    background-color: #fff;
  }
  .select{
    white-space: nowrap;
    width: 100%;
   
    
    padding: .25rem .24rem .25rem .24rem;
  }
  .select_box{
    overflow-x: auto;
    overflow-y: hidden;
  }
  .select_item{
    height: 2.8rem;
    width:6.20rem;
    display: inline-block;
    color: #fff;
    margin-left: .24rem;
    position: relative;
  }
  .select_item0{
    margin-left: 0;
  }
  .select_item .item{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
  .select_item .item_top{
    padding:.14rem 0 0 1.56rem;
  }
  .select_item .item_top .brand{
    font-size: .28rem;
    font-weight: bold;
    padding-right: .20rem;
  }
  .select_item .item_top .name{
    font-size: .20rem;
    margin-top:.06rem;
  }
  .select_item .item_bottom{
    display: flex;
  }
  .select_item .item_bottom .img{
    width:3.43rem;
    bottom: 49px;
    position: relative;
    margin-top: 10%;
    
  }
  .select_item .item_bottom .info{
    margin-top: .20rem;
    font-weight: bold;
  }
  .select_item .item_bottom .info .first_price{
    font-size: .32rem;
  }
  .select_item .item_bottom .info .first_price text{
    font-size: .48rem;
    font-weight: bolder;
  }
  .select_item .item_bottom .info .btn{
    margin-top:.24rem;
    width: 2.02rem;
    height: .52rem;
    line-height: .46rem;
    text-align: center;
    border-radius:.26rem;
    font-size: .28rem;
    font-weight: bolder;
    border:.03rem solid #fff;
    background-color: rgba(255, 255, 255, 0.2);
  }
</style>
