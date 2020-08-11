<template>
  <div class="swiper">
    <swiper :options="swiperOption" class='swiper-box'>
      <swiper-slide v-for="item in 3">
        
        <h3>{{item}}</h3>
      </swiper-slide>
      <!--<div class="swiper-pagination" slot="pagination"></div>-->
    </swiper>
  </div>

</template>

<script>
  import { swiper, swiperSlide } from "vue-awesome-swiper";
  require("swiper/dist/css/swiper.css");
  
  export default {
    name: "Swiper",
    components:{
      swiper,
      swiperSlide
    },
    props:{
      // bannerList:{
      //   type:Array,
      //   default:[]
      // }
    },
    data(){
      return{
        swiperOption: {//swiper3
          autoplay: 3000,
          speed: 1000,
        }
      }
    },
    mounted(){
    },
    created() {
   
    }
  }
</script>

<style scoped>
  /*/deep/  .el-carousel__indicators--horizontal {*/
    /*bottom: 42px;*/
  
  /*}*/

</style>
