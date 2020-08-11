<template>
  <div>
    <nav-bar class="home_nav">
      <div slot="center">喜相逢以租代购</div>
      <div slot="right"></div>
    </nav-bar>
    <tab-control v-show="isControlTab" class="tab_control" :tabs="['金融方案','车辆信息','常见问题','猜你喜欢']"  @tabClick="tabClick"></tab-control>
    <swiper class="carinfo_img" ref="mySwiper" :options="swiperOptions" >
      <swiper-slide v-for="item in carInfo.img" :key="item.img">
        <img class="carimg" :src="item.img" alt="">
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination" ></div>
    </swiper>
    <div class="carinfo_banner">
      <img :src="bannerList[0].img" alt="" v-if="bannerList[0]">
    </div>
    <carinfo-base class="carinfo-base carinfo_content" :carInfo="carInfo"></carinfo-base>
    <carinfo-store class="carinfo_content"></carinfo-store>
    <carinfo-process class="carinfo_content"></carinfo-process>
    <div class="carinfo_advantage carinfo_content">
      <title-bar>
        <span slot="left">喜相逢优势</span>
      </title-bar>
        <img src="https://sprogram.xxfgo.com/images/appserve/advantage.jpg" mode="widthFix" style="width:100%;display:block"/>
    </div>
    <carinfo-config id="config" class="carinfo_content" :carInfo="carInfo"></carinfo-config>
    <carinfo-look  class="carinfo_content" :carInfo="carInfo"></carinfo-look>
    <div id="problem" class="carinfo_problem carinfo_content">
      <title-bar>
        <span slot="left">常见问题</span>
      </title-bar>
      <problem></problem>
    </div>
    <carinfo-rcommend id="guess" class="carinfo_content" :carid="carid"></carinfo-rcommend>
    <div class="bottom_tip">
      <span class="bottom_txt">已经到底了</span>
    </div>
    <carinfo-footer ></carinfo-footer>
  </div>
</template>

<script>
  import {getCarInfo,getBannerList} from 'network/carinfo'
  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from 'components/common/tabControl/TabControl'
  import TitleBar from 'components/content/titleBar/TitleBar'
  import Problem from 'components/content/problem/Problem'
  
  
  import CarinfoImgs from './childComps/CarinfoImgs'
  import CarinfoBase from './childComps/CarinfoBase'
  import CarinfoStore from './childComps/CarinfoStore'
  import CarinfoProcess from './childComps/CarinfoProcess'
  import CarinfoConfig from './childComps/CarinfoConfig'
  import CarinfoLook from './childComps/CarinfoLook'
  import CarinfoRcommend from './childComps/CarinfoRcommend'
  import CarinfoFooter from './childComps/CarinfoFooter'
  
  

  export default {
    name: "Carinfo",
    components:{
      NavBar,
      TitleBar,
      TabControl,
      Problem,
      CarinfoImgs,
      CarinfoBase,
      CarinfoStore,
      CarinfoProcess,
      CarinfoConfig,
      CarinfoLook,
      CarinfoRcommend,
      CarinfoFooter,
    },
    data(){
      return{
        carid: '',
        carInfo: {},
        swiperOptions: {
          loop:true,
          pagination: {
            el: '.swiper-pagination',
            clickable :true,
          },
        },
        bannerList:[],
        isControlTab:false,
        tabActive:0
      }
    },
    methods:{
      getCarInfo(){
        getCarInfo(this.carid).then(res=>{
          this.carInfo= res.data;
          console.log(res)
        }).catch(err=>{
          console.log(err)
        });
      },
      getBannerList(){
        getBannerList(this.carid).then(res=>{
          if(res.code==0){
            this.bannerList=res.data;
          }
        }).catch(err=>{
    
        });
      },
      handleScroll(){
        const scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
        const deviceWidth = document.documentElement.clientWidth||window.innerWidth;
        if (scrollTop > 1208 * deviceWidth / 750&&!this.isControlTab) {
          this.isControlTab=true;
        } else if((scrollTop <=1208 * deviceWidth / 750)&&this.isControlTab){
          this.isControlTab=false;
        }
        let configHeight = document.getElementById('config').offsetTop-276*deviceWidth/750;
        let problemHeight =document.getElementById('problem').offsetTop-276*deviceWidth/750;
        let guessHeight =document.getElementById('guess').offsetTop-276*deviceWidth/750;
        if(scrollTop<configHeight&&this.tabActive!=0){
          this.tabActive=0;
        }else if(scrollTop>=configHeight&&scrollTop<problemHeight&&this.tabActive!=1){
          this.tabActive=1;
        }else if(scrollTop>=problemHeight&&scrollTop<guessHeight&&this.tabActive!=2){
          this.tabActive=2;
        }else if(scrollTop>=guessHeight&&this.tabActive!=3){
          this.tabActive=3;
        }
      },
      tabClick(tabActive){
        const deviceWidth = document.documentElement.clientWidth||window.innerWidth;
        let configTop = document.getElementById('config').offsetTop-176*deviceWidth/750;
        let problemTop =document.getElementById('problem').offsetTop-176*deviceWidth/750;
        let guessTop =document.getElementById('guess').offsetTop-176*deviceWidth/750;
        if(tabActive==0){
          this.isControlTab=false;
          document.body.scrollTop = document.documentElement.scrollTop = 0;
        }else if(tabActive==1){
          document.body.scrollTop = document.documentElement.scrollTop =configTop;
        }else if(tabActive==2){
          document.body.scrollTop = document.documentElement.scrollTop =problemTop;
        }else if(tabActive==3){
          document.body.scrollTop = document.documentElement.scrollTop =guessTop;
        }
      }
    },
    created() {
      this.carid=this.$route.params.carid;
      console.log(this.$route);
      console.log(this.carid);
      this.getCarInfo();
      this.getBannerList();

    },
    mounted() {
      window.addEventListener('scroll',this.handleScroll)
    },
    destroyed() {
      window.removeEventListener('scroll',this.handleScroll)
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
  .carinfo_content{
    background-color: #fff;
    margin-top: 0.24rem;
  }
  .carinfo_img{
    height:3.6rem;
    background-color: #fff;
  }
  .carinfo_img .carimg{
    width:75%;
    margin:-0.30rem auto 0;
  }
  .carinfo_img .swiper-pagination{
    position: absolute;
    left: .48rem;
    bottom: .24rem;
    display: flex;
    justify-content: flex-start;
  
  }
  .carinfo_img /deep/.swiper-pagination-bullet {
    width: 0.1rem;
    height: 0.08rem;
    display: inline-block;
    border-radius:0.04rem;
    background:#E4E4E4;
    opacity: 1;
    transition: all .6s;
  }
  .carinfo_img /deep/.swiper-pagination-bullet-active{
    background:#FF7700;
    width: 0.2rem;
  }
  .carinfo_img /deep/:root {
    --swiper-theme-color: #FF7700;
  }
  .carinfo-base{
    margin-top:0;
  }

  .bottom_tip {
    text-align: center;
    color: #e4e4e4;
    font-size: .28rem;
    line-height: .90rem;
    position: relative;
    letter-spacing:.11rem;
  }

  .bottom_txt::before {
    content: '';
    width: 30%;
    height:  0.01rem;
    background-color: #e4e4e4;
    position: absolute;
    top: .45rem;
    left: .30rem;
    font-weight: bolder;
  }

  .bottom_txt::after {
    content: '';
    width: 30%;
    height: 0.01rem;
    background-color: #e4e4e4;
    position: absolute;
    top: .45rem;
    right: .30rem;
  }
</style>
