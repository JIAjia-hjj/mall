<template>
  <div class="car_item">
    <div class="car_img">
      <img class="recommend_icon" :src="carItem.recommend_icon" />
      <img class="cover_img" :src="carItem.cover_img" @load="imageLoad"/>
    </div>
    <div class="car_info">
      <div class="brand">
        <span class="brand_text">{{carItem.jiequ_brand_name}}</span>
        <span class="brand_identifying" :class="{'identifying5':carItem.identifying=='国V','identifying6':carItem.identifying=='国VI'}">{{carItem.identifying}}</span>
      </div>
      
      <div class="name">{{carItem.name}}</div>
      <div class="first_price">首付: <span> {{carItem.minimum_downpayments}}</span> 万</div>
    </div>
  </div>

</template>

<script>
  export default {
    name: "CarItem",
    props:{
      carItem:{
        type:Object,
        default(){
          return {}
        }
      }
    },
    methods:{
      imageLoad(){
        this.$bus.$emit('itemImageLoad');
        console.log('imageLoad')
      }
    }
    
  }
</script>

<style scoped>
  .car_item {
    display: flex;
    padding: 0 0.22rem 0 0.52rem;
    position: relative;
    width: 100%;
    height: 2.40rem;
    background-color: #fff;
  }
  .car_item::after {
    content: '';
    height: 1px;
    background-color: rgb(232, 232, 232);
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0.48rem;
  }

  .car_img {
    width: 2.84rem;
    display: block;
  }
  .car_img .cover_img {
    margin:0.35rem auto;
    width: 2.5rem;
  }
  .car_img .recommend_icon{
    position: absolute;
    /*z-index: 2;*/
    width:0.8rem;
    margin-top: 0.06rem;
  }
  .car_info {
    padding: .48rem 0 .18rem 0;
    margin-left: .40rem;
    width: 3.34rem;
  }

  .car_info .brand {
    color: #333;
    font-size: .36rem;
    font-weight: bold;
    height: .46rem;
    display: flex;
    align-items: center;
  }

  .car_info .brand .brand_text {
    display: inline-block;
    max-width: 2.26rem;
    overflow-x: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .car_info .brand  .brand_identifying{
    display: inline-block;
    width: .60rem;
    height: .32rem;
    line-height: .30rem;
    /*color: #09f;*/
    /*border: 1px solid #09f;*/
    font-size: .22rem;
    border-radius:.08rem;
    margin-left: .12rem;
    font-weight: 400;
    text-align: center;
  }
  .car_info .brand .identifying5{
    color: #09f;
    border: 1px solid #09f;
  }
  .car_info .brand .identifying6{
    color: #fa0;
    border: 1px solid #fa0;
  }
  .car_info .name {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: .24rem;
    color: #999;
    margin-top: .10rem;
  }

  .car_info  .first_price {
    font-size: .32rem;
    font-weight: bold;
    margin: .1rem 0;
    color: #333;
  }

  .car_info .first_price span {
    font-size: .44rem;
    font-weight: bolder;
    color: #fa0;
  }

  .car_info .month_price {
    font-size: .20rem;
    color: #999;
  }

</style>
