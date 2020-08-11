<template>
  <div>
    <nav-bar>
      <div slot="center">我的小程序码</div>
      <div slot="right"></div>
    </nav-bar>
    <div style="height: 0.9rem">
      <tab-control  class="tab_control" :tabs="['活动海报','节气海报','小程序码']"  @tabClick="tabClick"></tab-control>
    </div>
    <div v-show="tabActive==0">
      <swiper class="poster_box" ref="mySwiper0" :options="swiperOptions0" v-if="activityPost.length!=0" @slideChange="slideChange('mySwiper0')">
        <swiper-slide v-for="item in activityPost" :key="item.img">
          <img class="post_img" :src="item.img" alt="">
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination" ></div>
      </swiper>
      <div class="total_num">
        <span class="current_num">{{activityPost.length==0?'0':activityIndex+1}}</span> / {{activityPost.length}}
      </div>
    </div>
    <div v-show="tabActive==1">
      <swiper class="poster_box" ref="mySwiper1" :options="swiperOptions1" v-if="seasonPost.length!=0" @slideChange="slideChange('mySwiper1')">
        <swiper-slide v-for="item in seasonPost" :key="item.img">
          <img class="post_img" :src="item.img" alt="">
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination" ></div>
      </swiper>
      <div class="total_num">
        <span class="current_num">{{seasonPost.length==0?'0':seasonIndex+1}}</span> / {{seasonPost.length}}
      </div>
    </div>
    <div v-show="tabActive==2">
    
    </div>
    <div class="save_btn"  bindtap="posterSaveClick">保存至相册</div>
    <div class="tip_txt">保存图片至相册后，可群发或分享至朋友圈</div>
  </div>
</template>

<script>
  import {getBannerList} from 'network/mycode.js'
  
  import TabControl from 'components/common/tabControl/TabControl'
  import NavBar from 'components/common/navbar/NavBar'
  
  
  export default {
    name: "MyCode",
    components:{
      TabControl,
      NavBar
    },
    data(){
      return{
        tabActive:0,
        activityPost:[],
        seasonPost:[],
        activityIndex:0,
        seasonIndex:0,
        swiperOptions0: {
          centeredSlides: true,
          slidesPerView:'auto',
          loop: true,
          loopedSlides:2,
          // initialSlide:2,
          // freeMode: true,
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
          },
          onTouchEnd(swiper){
            console.log(swiper.getWrapperTranslate('x'));
          }
        },
        swiperOptions1: {
          centeredSlides: true,
          slidesPerView:'auto',
          loop: true,
          loopedSlides:2,
          // initialSlide:2,
          // freeMode: true,
          // watchActiveIndex: true,
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
          },
          onTouchEnd(swiper){
            console.log(swiper.getWrapperTranslate('x'));
          }
        },
        
      }
    },
    methods:{
      tabClick(tabActive){
        this.tabActive=tabActive;
      },
      getBannerList(platform, position, name){
        getBannerList(platform, position).then(res=>{
          if(res.code==0){
            this[name]=res.data;
          }
          console.log(res);
        }).catch(err=>{
          console.log(err)
        })
      },
      slideChange(type){
        if(type=='mySwiper0'){
          this.activityIndex=this.$refs[type].$swiper.realIndex;
        }else if(type=='mySwiper1'){
          this.seasonIndex=this.$refs[type].$swiper.realIndex;
        }
      }
      
      
    },
    created(){

    },
    mounted() {
      this.getBannerList(3,11,'activityPost');//活动海报
      this.getBannerList(3,10,'seasonPost');//节气海报
    }
  }
</script>

<style scoped>
  .tab_control{
    position: fixed;
    top:0.88rem;
    left: 0;
    z-index: 2;
  }
  .tip_txt {
    color: #999;
    font-size: .24rem;
    text-align: center;
    margin: .28rem;
  }
  
  .save_btn {
    font-size: .24rem;
    color: #fff;
    background: #fa0;
    border-radius:.08rem;
    text-align: center;
    width: 1.60rem;
    height: .64rem;
    line-height: .64rem;
    margin:.24rem auto 0;

  }
  .poster_box.swiper-container{
    padding-top: 0.3rem;
  }
  .poster_box .swiper-slide{
    width: 70% !important;
    margin-right:0 !important;
    transform: scale(0.85);
    -webkit-filter: brightness(0.5);
    filter: brightness(0.5);
  }
  .poster_box .swiper-slide-active{
    transform: scale(1);
    z-index: 2;
    -webkit-filter: brightness(1);
    filter: brightness(1);
  }
  .poster_box .swiper-slide-prev{
    margin-right: -0.2rem;
  }
  .poster_box .post_img{
    width:100%;
    border-radius:0.18rem;
    box-shadow: 0 0.01rem 0.3rem 0.01rem rgba(51, 51, 51, 0.4);
  }
  .poster_box .swiper-pagination{
    position: static;
    margin: 0.2rem  auto;
  
  }
  
  .poster_box /deep/.swiper-pagination-bullet {
    width: 0.08rem;
    height: 0.08rem;
    display: inline-block;
    border-radius:0.04rem;
    background: rgba(51, 51, 51, 0.5);
    opacity: 1;
    transition: all .6s;
  }
  .poster_box /deep/.swiper-pagination-bullet-active{
    background:#FF7700;
    width: 0.2rem;
  }
  .total_num {
    text-align: center;
    font-size: .28rem;
    color:#333;
  }

  .current_num {
    font-size: .32rem;
    font-weight: bold;
  }

</style>
