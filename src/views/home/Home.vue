<template>
  <div id="home">
    <nav-bar class="home_nav">
      <div slot="left"></div>
      <div slot="center">喜相逢以租代购</div>
      <div slot="right"></div>
    </nav-bar>
    <div class="home_search">
      <search class="search_component" @searchClick="searchClick"></search>
    </div>
    <swiper class="home_banner" ref="mySwiper" :options="swiperOptions" >
      <swiper-slide v-for="item in bannerList" :key="item.img">
        <img class="banner" :src="item.img" alt="">
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination" ></div>
    </swiper>
    <creadit class="home_creadit"></creadit>
    <brand-car class="home_content"/>
    <marketer-info class="home_content"></marketer-info>
    <select-car class="home_content" :selectcarList="selectcarList"></select-car>
    <hot-car class="home_content"></hot-car>
    <!--<div class="bottom_tip">-->
      <!--<span class="bottom_txt">已经到底了</span>-->
    <!--</div>-->
    <bottom-tip ></bottom-tip>
    <main-tab-bar></main-tab-bar>

  </div>
</template>

<script>
  import {getHomeBannerData,getCarBrandList,getCarList} from 'network/home'
  import NavBar from 'components/common/navbar/NavBar'
  import Search from 'components/content/search/Search'
  import MainTabBar from 'components/content/mainTabBar/MainTabBar'
  import Creadit from 'components/content/creadit/Creadit'
  import BottomTip from 'components/content/bottomTip/BottomTip'
  
  import HomeSwiper from './childComps/HomeSwiper'
  import BrandCar from './childComps/BrandCar'
  import SelectCar from './childComps/SelectCar'
  import HotCar from './childComps/HotCar'
  import MarketerInfo from './childComps/MarketerInfo'
  
  export default {
    name: "Home",
    components:{
      NavBar,
      Search,
      MainTabBar,
      Creadit,
      BottomTip,
      HomeSwiper,
      BrandCar,
      SelectCar,
      HotCar,
      MarketerInfo
    },
    data(){
      return {
        bannerList:[],
        carBrandList:[],
        selectcarList:[],
        hotcarList:[],
        swiperOptions: {
          loop:true,
          pagination: {
            el: '.swiper-pagination',
            clickable :true,
          },
        },
      }
    },
    methods:{
      searchClick(){
        this.$router.push('/search');
      }
      
    },
    created() {
      //获取banner数据
      getHomeBannerData().then(res=>{
          this.bannerList=res.data;
      }).catch(err=>{
        console.log(err);
      });

      //代步优选
      getCarList(10).then(res=>{
        let list = res.data;
        list.forEach(function(item) {
          item.name = item.name.split(" ").slice(1).join(' ');
        });
        this.selectcarList=list
      }).catch(err=>{
        console.log(err);
      });

    }
  }
</script>

<style scoped>
  .home_content{
    background-color: #fff;
    margin-top: 0.24rem;
  }
  .home-nav{
    background-color: #fff;
  }
  .tab_control{
    position: sticky;
    top:1rem;
  }
  .home_search{
   height: 0.72rem;
    background: #fff;
  }
  .home_search .search_component{
    position: fixed;
    left: 0;
    right: 0;
    top: 0.88rem;
    width: 100%;
    z-index: 2;
    max-width: 750px;
    margin: 0 auto;
  }
  .home_banner{
    margin: 0.24rem;
  }
  .home_banner .banner{
    border-radius: 0.24rem;
  }
  .home_banner .swiper-pagination{
    position: absolute;
    right: .48rem;
    bottom: .24rem;
    display: flex;
    justify-content: flex-end;
  
  }
  .home_banner .swiper-slide{
    width: 100% !important;
  }
  .home_banner /deep/.swiper-pagination-bullet {
    width: 0.1rem;
    height: 0.08rem;
    display: inline-block;
    border-radius:0.04rem;
    background:#E4E4E4;
    opacity: 1;
    transition: all .6s;
  }
  .home_banner /deep/.swiper-pagination-bullet-active{
    background:#FF7700;
    width: 0.2rem;
  }
  .home_banner/deep/:root {
    --swiper-theme-color: #FF7700;
  }
  .home_creadit{
    border-bottom:0.01rem solid #e4e4e4;
  }
  .bottom_tip {
    text-align: center;
    color: #bebebe;
    font-size: .28rem;
    line-height: .90rem;
    position: relative;
    letter-spacing:.11rem;
  }

  .bottom_txt::before {
    content: '';
    width: 30%;
    height:  0.01rem;
    background-color:#bebebe;
    position: absolute;
    top: .45rem;
    left: .30rem;
    font-weight: bolder;
  }

  .bottom_txt::after {
    content: '';
    width: 30%;
    height: 0.01rem;
    background-color:#bebebe;
    position: absolute;
    top: .45rem;
    right: .30rem;
  }
</style>
