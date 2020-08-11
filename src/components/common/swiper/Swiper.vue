<template>
  <swiper class="home_banner" ref="mySwiper" :options="swiperOptions" >
    <swiper-slide v-for="item in bannerList" :key="item.img">
      <slot name="swiperContent"></slot>
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination" ></div>
  </swiper>
</template>

<script>
	export default {
		name: "Swiper",
    props: {
     loop:{
       type:Boolean,
       default:false
     },
      pagination:{
        type:Boolean,
        default(){
          return {

          }
        }
      }
    },
    data() {
		  return {
        swiperOptions: {
          loop:this.loop,
          pagination: {
            el: '.swiper-pagination',
            clickable :true,
          },
        },
      }
    },
    mounted() {
    
    },
    methods: {}
	}
</script>

<style scoped>

</style>
