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
  
    <better-scroll class="content_list"
                   ref="bscroll"
                   :pullUpLoad="true" @pullingUp="loadMore"
                   :pullDownRefresh="true" @pullingDown="loadRefresh">
      <div class="banner">
        <img :src="bannerList[0].img" alt="" v-if="bannerList[0]">
      </div>
      <div class="car_list">
        <router-link  v-for="item in carList" :key="item.id"  :to="'/carinfo/'+item.id">
          <car-item :carItem="item"></car-item>
        </router-link>
      </div>
      <!-- 没有数据时 -->
      <nodata-form v-if="carList.length==0&&!isLoadding"></nodata-form>
      <!-- 加载-->
      <div class="loading" v-show="isLoadding">
        <img class="loadding_img" src="https://sprogram.xxfgo.com/images/appserve/loadding.png"/>
        <span>车型加载中，请稍后...</span>
      </div>
      <!--到底了-->
      <div class="bottom_tip">
         <span class="bottom_txt"  v-show="isBottom">已经到底了</span>
      </div>
      
    </better-scroll>
    
    
    <main-tab-bar></main-tab-bar>
    <tip ref="tip"></tip>
  </div>
 
</template>
<footer></footer>
<script>
  import {debounce} from 'common/utils'
  
  import {getCarList,getBannerList} from 'network/list'
  import NavBar from 'components/common/navbar/NavBar'
  import Tip from 'components/common/tip/Tip'
  import BetterScroll from 'components/common/betterScroll/BetterScroll'
  
  import Search from 'components/content/search/Search'
  import SearchInput from 'components/content/search/SearchInput'
  import MainTabBar from 'components/content/mainTabBar/MainTabBar'
  import CarItem from 'components/content/carItem/CarItem'
  
  import ListTab from './childComps/ListTab'
  import ListSearch from './childComps/ListSearch'
  import NodataForm from './childComps/NodataForm'
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
      NavBar,
      Tip,
      BetterScroll,
      
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
        isBottom:false
        
      }
    },
    watch:{
      searchContents:{
        handler(val){
          this.pageIndex=0;
          this.carList=[];
          this.isBottom=false;
          this.getCarList();
        },
        deep:true
      }
    },
    methods:{
      getCarList(successCallback){
        this.pageIndex=this.pageIndex+1;
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
          if (res.data.length<12){
            this.isBottom=true;
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
            successCallback();
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
        this.isBottom=false;
      },
      getBannerList(){
        getBannerList().then(res=>{
          if(res.code==0){
            this.bannerList=res.data;
          }
        }).catch(err=>{

        });
      },
      // 上拉加载更多
      loadMore(){
        if(this.isBottom){
          return
        }
        console.log('上拉加载更多');
        this.getCarList(()=>{
          this.$refs.bscroll.finishPullUp();//解决一次上拉后不能再上拉的问题
          //滚不动，是因为图片异步还没有加载出来,先监听图片加载完成，然后刷新,重新计算可滚动区域this.$refs.bscroll.bscroll.refresh();
        });
      },
      //下拉刷新
      loadRefresh(){
        this.reset();
        this.$refs.bscroll.finishPullDown();
      },
      remove(){
        this.searchType=0;
      },
      searchClick(){
        this.searchType=1;
      },
      // debounce(func,delay){
      //   let timer=null;
      //
      //   return function(...args){//...args接收多个参数   这个是个闭包，怼外层的东西有个引用，所以timer没有被销毁
      //     if(timer) clearTimeout(timer);//有进来下一次的时候，将进来要做事情的timer清除掉
      //
      //     timer=setTimeout(()=>{//在这个时间没有将这个写的timer取消掉，进来就执行
      //       func.apply(this,args)
      //     },delay)
      //   }
      // }
    },
    created() {
    
    },
    mounted(){
      //监听carItem图片加载完成
      const refresh=debounce( this.$refs.bscroll.refresh,200);//不传时间也是每次都执行   setTimeout中的异步函数是在下一次事件循环的时候才会被执行,放在后面执行，所以没有写时间页放在后面执行 event loop
      this.$bus.$on('itemImageLoad',()=>{//组件创建好，我就开始监听。等着你发射事件
         refresh(); //refresh不会被销毁，是个闭包
      });
      // this.$bus.$on('itemImageLoad',()=>{//组件创建好，我就开始监听。等着你发射事件
      //   this.$refs.bscroll.refresh();//执行频率太高
      // });
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
        this.getCarList();
        
        // this.upCallback(0,this.mescroll);
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
    /*overflow-y: scroll;*/
    overflow: hidden;
  }
  .car_list{
  
  }
  .car_list a:last-child .car_item::after{
    left:0;
  
  }

  .loading {
    color: #999;
    font-size: .24rem;
    text-align: center;
    height: .90rem;
    line-height: .90rem;
  }
  
  .loadding_img {
    display: inline-block;
    width: .24rem;
    vertical-align: text-bottom;
    margin:.02rem .10rem;
    animation: rotate 1s infinite;
    -webkit-animation: rotate 1s infinite;
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
