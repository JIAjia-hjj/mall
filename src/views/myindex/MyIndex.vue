<template>
  <div>
    <nav-bar class="home_nav">
      <div slot="center">个人主页</div>
      <div slot="right"></div>
    </nav-bar>
    <my-info :marketerInfo="marketerInfo"></my-info>
    <creadit></creadit>
    <div  class="banner">
      <img v-if="bannerList.length!=0" :src="bannerList[0].img" alt="">
    </div>

    <tab-control  class="tab_control" :tabs="['热销车型','优惠购车券']"  @tabClick="tabClick"></tab-control>
    <div  v-show="tabActive==0">
      <div class="car_list">
        <router-link  v-for="item in carList" :key="item.id"  :to="'/carinfo/'+item.id">
          <car-block :carItem="item"></car-block>
        </router-link>
        
      </div>
 
      <img src="https://sprogram.xxfgo.com/images/appserve/myindex_advantage.jpg" style="width:100%"/>
      <bottom-tip></bottom-tip>
    </div>
    <div v-show="tabActive==1">
      <coupon></coupon>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
  import {getBannerList,getCouponList,receiveCoupon,getCarList} from  'network/myindex.js'
  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from 'components/common/tabControl/TabControl'
  import BottomTip from 'components/content/bottomTip/BottomTip'
  import Creadit from 'components/content/creadit/Creadit';
  import CarBlock from 'components/content/carBlock/CarBlock'
  import MyInfo from './childComps/MyInfo'
  import Coupon from './childComps/Coupon'
  import Footer from './childComps/Footer'
  
  export default {
    name: "MyIndex",
    components:{
      NavBar,
      TabControl,
      BottomTip,
      Creadit,
      CarBlock,
      MyInfo,
      Coupon,
      Footer
    },
    data(){
      return{
        tabActive:0,
        generalCoupons:[],
        specialCoupons:[],
        isNoCoupon:false,
        carList:[],
        bannerList:[]
      }
    },
    computed:{
      marketerInfo(){
        return this.$store.state.marketerInfo
      },

    },
    watch:{
      marketerInfo:{
        handler(val,oldval){
            this.getCarList();
        },
        deep:true
      }
    },
    methods:{
      tabClick(tabActive){
        this.tabActive=tabActive;
      },
      getCarList(){
        if(this.marketerInfo==null){
          return
        }
        const uid=this.marketerInfo.id;
        getCarList(uid).then((res)=>{
          if(res.code==200){
            this.carList=res.data;
          }
        }).catch((err)=>{
          console.log(err)
        })

      },
      getBannerList(){
        getBannerList().then((res)=>{
          if(res.code==0){
            this.bannerList=res.data;
          }
          console.log(res);
        }).catch((err)=>{
          console.log(err);
        })
      }
    },
    created() {
      this.getCarList();
      this.getBannerList();
    }
  }
</script>

<style scoped>
  .car_list{
    display: flex;
    padding: .25rem .24rem 0;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  .banner{
    background-color: #fff;
  }
  .banner img{
    width:7.02rem;
    margin:0 auto;
    
  }
</style>
