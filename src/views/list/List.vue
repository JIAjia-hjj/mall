<template>
  <div class="list">
    <nav-bar class="home_nav">
      <div slot="center">车型列表</div>
      <div slot="right"></div>
    </nav-bar>
    <div class="list_search">
      <search class="search_component" v-show="searchType==0" @searchClick="searchClick"></search>
      <search-input  class="search_component"  v-show="searchType==1" @search="search" @remove="remove" :searchTab="keyWord"></search-input>
    </div>
    <list-tab class="list_tab"   @selectedClick="selectedClick" :searchContents="searchContents"></list-tab>
    <list-search :searchContents="searchContents" @removeSearchContent="removeSearchContent"  @reset="reset" :hidden="Object.keys(searchContents).length === 0"></list-search>
    <!--<div class="content_list">-->
    <mescroll-vue  class="content_list" ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
      <div class="banner">
          <img :src="bannerList[0].img" alt="" v-if="bannerList[0]">
        </div>
      <!--车列表-->
      <div class="car_list">
        <!--:to="{path:'/carinfo',query:{carid:item.id}}"-->
        <router-link  v-for="item in carList" :key="item.id"  :to="'/carinfo/'+item.id">
          <car-item :carItem="item"></car-item>
        </router-link>
      </div>
      <!-- 没有数据时 -->
      <nodata-form v-if="carList.length==0&&!isLoadding"></nodata-form>
      <!-- 加载-->
      <!--<div class="loading" v-show="isLoadding">-->
         <!--<img class="loadding_img" src="https://sprogram.xxfgo.com/images/appserve/loadding.png"/>-->
         <!--<span>车型加载中，请稍后...</span>-->
      <!--</div>-->
      <!--到底了-->
      <!--<div class="bottom_tip">-->
        <!--<span class="bottom_txt"  v-show="!isLoadding">已经到底了</span>-->
      <!--</div>-->
  
    </mescroll-vue>
    <!--</div>-->
    
    <main-tab-bar></main-tab-bar>
    <tip ref="tip"></tip>
  </div>
 
</template>
<footer></footer>
<script>
  import MescrollVue from 'mescroll.js/mescroll.vue'
  
  import {getCarList,getBannerList} from 'network/list'
  import NavBar from 'components/common/navbar/NavBar'
  import Tip from 'components/common/tip/Tip'
  import Search from 'components/content/search/Search'
  import SearchInput from 'components/content/search/SearchInput'
  import MainTabBar from 'components/content/mainTabBar/MainTabBar'
  import CarItem from 'components/content/carItem/CarItem'
  
  import ListTab from './childComps/ListTab'
  import ListSearch from './childComps/ListSearch'
  import NodataForm from './childComps/NodataForm'
  const htmlLoading=`<div class="loading">
         <img class="loadding_img" src="https://sprogram.xxfgo.com/images/appserve/loadding.png"/>
         <span>车型加载中，请稍后...</span>
      </div>`;
  const htmlNodata=` <div class="bottom_tip">
                        <span class="bottom_txt">已经到底了</span>
                      </div>`;
  const defaultData={
    brandid: '',
    fpayid: '',
    mpayid: '',
    cartype: '',
    standardtype: '',
  
    pageIndex:1,
    keyWord:''
  };
  export default {
    name: "List",
    components:{
      MescrollVue,
      
      NavBar,
      Tip,
      
      Search,
      SearchInput,
      MainTabBar,
      CarItem,
      ListTab,
      ListSearch,
      NodataForm
    },
    data(){
      return {
        carList:[],
        searchContents: {},
        
        brandid: '',
        fpayid: '',
        mpayid: '',
        cartype: '',
        standardtype: '',
        
        pageIndex:0,
        keyWord:'',
  
        searchType:0,
        bannerList:[],
        isLoadding:true,
        mescroll:null,
        mescrollDown:{
          auto:false,
          callback: this.downCallback,
        },
        mescrollUp:{
          auto:false,
          callback: this.upCallback,
          page: {
            num:1, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
            size: 12 // 每页数据的数量
          },
          noMoreSize:1,
          htmlLoading:htmlLoading,
          htmlNodata:htmlNodata
        },
        
      }
    },
    watch:{
      searchContents:{
        handler(val){
          this.pageIndex=0;
          this.carList=[];
          // this.getCarList();
          // this.downCallback(this.mescroll);
          this.upCallback(1,this.mescroll);
        },
        deep:true
      }
    },
    methods:{
      getCarList(successCallback){
        this.isLoadding=true;
        const data = {
          platform: 2,
          customer_id:'',
          page: this.pageIndex,
          keyword: this.keyWord,
          brand_id: this.brandid,
          downpayments: this.fpayid,
          minimum_month: this.mpayid,
          level_id: this.cartype,
          identifying: this.standardtype,
          openid: 'orgme4nZBIT9CqN9HdT3_6LnAb98'
        };
        getCarList(data).then(res=>{
          if (res.data.length > 0) {
            res.data.forEach(function (item) {
              item.name = item.name.split(" ").slice(1).join(' ');
            });
          }
          this.isLoadding=false;
          this.carList=[...this.carList,...res.data];
          if(res.page_count!=0&&this.pageIndex==1){
            this.$refs.tip.showTip({
              width: 3,
              height: 1,
              icon:'icon_xiao',
              text: '已为您找到' + res.page_count+ '款新车',
              paddingTop: 0.15,
              iconBottom:0.15
            });
          }
          if(successCallback){
            successCallback(res.data);
          }
        }).catch(err=>{
          console.log(err);
        });
      },
      selectedClick(key,value,name){
        this[key] = value;
        if (name != undefined) {
          // Vue.set(this.searchContents ,key,name);
          this.searchContents = Object.assign({},this.searchContents, {[key]: name});
        }
      },
      search(searchObj) {
        this.selectedClick(searchObj.key,searchObj.value,searchObj.name);
      },
      removeSearchContent(key){
        let searchContents = this.searchContents;
        this[key]='';
        delete searchContents[key];
        // this.searchContents=searchContents;
        this.searchContents=Object.assign({},searchContents);
      },
      reset(){
        this.brandid='';
        this.fpayid='';
        this.mpayid='';
        this.cartype='';
        this.standardtype='';
        this.pageIndex=1;
        this.keyWord='';
        this.searchContents={};
        this.carList=[];
      },
      getBannerList(){
        getBannerList().then(res=>{
          if(res.code==0){
            this.bannerList=res.data;
          }
        }).catch(err=>{

        });
      },
      // mescroll组件初始化的回调,可获取到mescroll对象
      mescrollInit (mescroll) {
        this.mescroll = mescroll
      },
      // 上拉回调
      upCallback(page,mescroll){
        this.pageIndex++;
        this.getCarList((list) => {
          if(list.length==0){
            this.mescrollUp.page.num=1
          }
          // 数据渲染成功后,隐藏下拉刷新的状态
          this.$nextTick(() => {
            mescroll.endSuccess(list.length);
          })
        }, () => {
          // 联网异常,隐藏上拉和下拉的加载进度
          mescroll.endErr()
        });
      },
      //下拉回调
      downCallback(mescroll){
        this.pageIndex=1;
        this.carList=[];
        this.getCarList((list) => {
          // 数据渲染成功后,隐藏下拉刷新的状态
          if(list.length==0){
            this.mescrollUp.page.num=1
          }
          this.$nextTick(() => {
            mescroll.endSuccess(list.length);
          })
        }, () => {
          // 联网异常,隐藏上拉和下拉的加载进度
          mescroll.endErr()
        });
      },
      remove(){
        this.searchType=0;
      },
      searchClick(){
        this.searchType=1;
      }
    },
    created() {
    
    },
    mounted(){
      // this.getCarList();
      this.getBannerList();
      const carSearchInfo=this.$store.state.carSearchInfo;
      if(carSearchInfo!=null){
        const key=carSearchInfo.key;
        const name=carSearchInfo.name;
        const value=carSearchInfo.value;
        if (key=='keyWord'){
          this.searchType=1;
        }
        this.selectedClick(key,value,name);
        this.$store.commit('setCarSearchInfo',null)
      }else {
        this.upCallback(0,this.mescroll);
      }
    }
  }
</script>

<style scoped>
  .list{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    height: 100%;
    flex-direction: column;
    max-width: 750px;
    margin: 0 auto;
  }
  .list_tab{
    position: relative;
    z-index: 2;
 }
  .list_search{
    height: 0.72rem;
    background: #fff;
  }
  .list_search .search_component {
    position: fixed;
    left: 0;
    right: 0;
    top: 0.88rem;
    width: 100%;
    z-index: 2;
    max-width: 750px;
    margin: 0 auto;
  }
  .content_list{
    flex: 1;
    overflow-y: scroll;
  }
  .car_list{
  
  }
  .car_list a:last-child .car_item::after{
    left:0;
  
  }

  /*.loading {*/
    /*color: #999;*/
    /*font-size: .24rem;*/
    /*text-align: center;*/
    /*height: .90rem;*/
    /*line-height: .90rem;*/
  /*}*/
  
  /*.loadding_img {*/
    /*display: inline-block;*/
    /*width: .24rem;*/
    /*vertical-align: text-bottom;*/
    /*margin:.02rem .10rem;*/
    /*animation: rotate 1s infinite;*/
    /*-webkit-animation: rotate 1s infinite;*/
  /*}*/
  /*.bottom_tip {*/
    /*text-align: center;*/
    /*color: #e4e4e4;*/
    /*font-size: .28rem;*/
    /*line-height: .90rem;*/
    /*position: relative;*/
    /*letter-spacing:.11rem;*/
  /*}*/
  
  /*.bottom_txt::before {*/
    /*content: '';*/
    /*width: 30%;*/
    /*height:  0.01rem;*/
    /*background-color: #e4e4e4;*/
    /*position: absolute;*/
    /*top: .45rem;*/
    /*left: .30rem;*/
    /*font-weight: bolder;*/
  /*}*/
  
  /*.bottom_txt::after {*/
    /*content: '';*/
    /*width: 30%;*/
    /*height: 0.01rem;*/
    /*background-color: #e4e4e4;*/
    /*position: absolute;*/
    /*top: .45rem;*/
    /*right: .30rem;*/
  /*}*/
  /deep/.mescroll-upwarp .loading {
    color: #999;
    font-size: .24rem;
    text-align: center;
    /*height: .90rem;*/
    /*line-height: .90rem;*/
  }

  /deep/.mescroll-upwarp .loadding_img {
    display: inline-block;
    width: .24rem;
    vertical-align: text-bottom;
    /*margin:.02rem .10rem;*/
    animation: rotate 1s infinite;
    -webkit-animation: rotate 1s infinite;
  }
  @keyframes rotate {
    from {
      transform: rotate(0deg);
      -webkit-transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
      -webkit-transform: rotate(360deg);
    }
  }
  /deep/.mescroll-upwarp .bottom_tip {
    text-align: center;
    color: #e4e4e4;
    font-size: .28rem;
    /*line-height: .90rem;*/
    position: relative;
    letter-spacing:.11rem;
  }

  /deep/.mescroll-upwarp .bottom_txt::before {
    content: '';
    width: 30%;
    height:  0.01rem;
    background-color: #e4e4e4;
    position: absolute;
    top:50%;
    left: .30rem;
    font-weight: bolder;
  }

  /deep/.mescroll-upwarp .bottom_txt::after {
    content: '';
    width: 30%;
    height: 0.01rem;
    background-color: #e4e4e4;
    position: absolute;
    top: 50%;
    right: .30rem;
  }
  
</style>
