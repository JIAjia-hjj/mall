<template>
  <div id="app">

    <router-view></router-view>
    <!--<main-tab-bar></main-tab-bar>-->
    <baidu-map @ready="getLocation" style="display: none;"></baidu-map>
  </div>
</template>

<script>
  
  import {getBindedData,getMarketerInfo} from 'network/login'
  import {getStoreInfo} from 'network/city'
  
  import NavBar from 'components/common/navbar/NavBar'
  import MainTabBar from 'components/content/mainTabBar/MainTabBar'

export default {
  name: 'App',
  components: {
    NavBar,
    MainTabBar
  },
  methods:{
    getBindedData(){
      getBindedData().then(res=>{
        const isMarketer = res.data.is_businss == 1 ? true : false;
        this.$store.commit({
          type:'getBindedData',
          headimgurl:res.data.headimgurl,
          nickname:res.data.nickname,
          isMarketer,
          userId:res.data.user_id,
          businessId:res.data.businessid
        });
        this.getMarketerInfo(res.data.businessid);
      }).catch(err=>{
        console.log(err);
      });
    },
    //获取营销人员信息
    getMarketerInfo(uid) {
      if (uid == "" || uid == null) {
        return;
      }
      getMarketerInfo(uid).then(res=>{
        if(res.code == 200){
          this.$store.commit({
            type:'getMarketerInfo',
            marketerInfo:res.data
          })
        }
      }).catch(err=>{
        console.log(err);
      });
      
    
    },
    getLocation(){
      //获取详细位置
      const geolocation = new BMap.Geolocation();
      var that = this;
      geolocation.getCurrentPosition(function(position){
        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
         
          getStoreInfo({lat:position.point.lat,lng:position.point.lng}).then(res=>{
            let storeName='';
            let storeAddress='';
            if(res.code==0){
              storeName=res.data.name;
              storeAddress= res.data.address;
            }
            that.$store.commit({
              type:'getLocation',
              city:position.address.city,
              point:{lat:position.point.lat,lng:position.point.lng},
              storeName:storeName,
              storeAddress:storeAddress
            });
          }).catch(err=>{
            console.log(err);
          })
        } else {
          alert('定位失败, 请点击重试');
        }
      }, {enableHighAccuracy: true});
    }
  },
  created() {
    
    // if (/iphone/gi.test(navigator.userAgent) && (screen.height == 812 && screen.width == 375)) {
    // //是iphoneX
    //   console.log('是iphonex')
    // } else {
    // //不是iphoneX
    //   console.log('不是iphonex')
    // }
    // console.log(navigator)
    // console.log(navigator.userAgent)
    // // if(this.$store.state.phone=='未绑定'){
    // //   this.$router.replace('/');
    // //
    // // }
  },
  mounted() {
    this.getBindedData();
  }
}
</script>

<style>
  @import "assets/css/base.css";
  @import "assets/iconfont/iconfont.css";
  #app{
    max-width: 750px;
    margin: 0 auto;
    max-height: 100vh;
  }
</style>
