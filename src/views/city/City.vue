<template>
  <div>
  
    <nav-bar class="home_nav">
      <div slot="left"></div>
      <div slot="center">城市选择</div>
      <div slot="right"></div>
    </nav-bar>
    <div>
      <div class="city_box">
        <div id="content">
          <div class="city_content" style='margin-bottom:.20rem'>
            <div class="city_title">热门开通城市</div>
            <div class="city_group">
              <div class="city_item" @click="cityClick(item.city_name)" v-for="(item,index) in hotList" :key="item.id"   v-if="index<12">
                <div class="city_name oneline">{{item.city_name}}</div>
              </div>
            </div>
          </div>
          <div class="city_content" v-for="(cityName,initial) in cityList"  :key="initial" :id="initial">
            <div class="city_title">{{initial}}</div>
            <div class="city_group">
              <div class="city_item " @click="cityClick(item)"  v-for="(item,index) in cityName" :key="item+index">
                <div class="city_name oneline">{{item}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    
      <div class="city_letter" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
        <a class="letter" v-for="item in letter" :key="item" :href="'#'+item">{{item}}</a>
      </div>
      <div class="letter_alert" :hidden="showLetter?false:true">{{selectLetter}}</div>
    </div>
    
  </div>

</template>

<script>
  import {getAllCity,getHotCityList,getStoreInfo} from 'network/city'

  import NavBar from 'components/common/navbar/NavBar'
  
  export default {
    name: "city",
    data(){
      return{
        letter: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
        cityList: '',
        hotList: [],
        selectLetter: '',
        showLetter: false
      }
    },
    components:{
      NavBar
    },
    methods:{
      getAllCity(){
        getAllCity().then(res=>{
          this.cityList=res.data;
        }).catch(err=>{
          console.log(err);
        })
        
      },
      // 获取热门城市
      getHotCityList(){
        getHotCityList().then(res=>{
          this.hotList=res.data;
        }).catch(err=>{
          console.log(err);
        })
      },
      cityClick(city){
        // 城市->经纬度
        var myGeo = new BMap.Geocoder();
        const that=this;
        myGeo.getPoint(city,(point)=>{
            that.$store.commit({
              type:'getLocation',
              city:city,
              point:{lat:point.lat,lng:point.lng}
            });
            getStoreInfo({lat:point.lat,lng:point.lng}).then(res=>{
              let storeName='';
              let storeAddress='';
              if(res.code==0){
                storeName=res.data.name;
                storeAddress= res.data.address;
              }
              that.$store.commit({
                type:'getLocation',
                city:city,
                point:{lat:point.lat,lng:point.lng},
                storeName:storeName,
                storeAddress:storeAddress
              });
            }).catch(err=>{
              console.log(err);
            })
        }, '中国');
        this.$router.go(-1);
      },
      //获取选中字母开头的城市，并移动
      touchStart (e) {
        this.showLetter=true;
        this.getSelectLetter(e);
      },
      touchMove: function (e) {
        // this.getSelectLetter(e);
      },
      touchEnd: function () {
        this.showLetter=false;
      },
      getSelectLetter(e){
        const screeHeight = document.documentElement.clientHeight || document.body.clientHeight;
        const screenWidth=document.documentElement.clientWidth || document.body.clientWidth;
        const h=screeHeight-screenWidth*88/750;
        const lineheight=h/26;
        let point = e.changedTouches[0];
        const pageY=point.pageY-screenWidth*88/750;
        if (pageY < 0 || pageY >= h) { return }
        let select = this.letter[parseInt(pageY / lineheight)];
        if (this.selectLetter != select) {
            this.selectLetter=select
        }
      }
    },
    created(){
      this.getAllCity();
      this.getHotCityList();
    }

  }
</script>

<style scoped>
  .city_box {
    height:calc(100vh - 0.88rem);
    position: relative;
    word-wrap: break-word;
    margin: 0;
    padding: 0;
    width: 90%;
    overflow-y: scroll;
  }
  .city_letter{
    position: fixed;
    top: 0.88rem;
    bottom: 0;
    left: 90%;
    right: 0;
  }
  .city_content {
    background: white;
    overflow: hidden;
    padding-bottom: 10px;
  }
  .city_title {
    padding-left: .25rem;
    line-height: 0.64rem;
    border-bottom: 1px solid #eee;
    font-size: 0.26rem;
  }
  .city_group {
    padding: .2rem .1rem;
  }
  
  .city_item {
    float: left;
    width: 33.3%;
    padding: 0 .1rem;
    text-align: center;
  }
  
  .city_name {
    margin: .1rem;
    position: relative;
    text-align: center;
    border: 1px solid rgb(225, 225, 225);
    padding: 0.14rem 0;
    border-radius: 0.1rem;
    font-size: 0.07rem;
  }
  
  
  
  
  
  .letter {
    height: 3.85%;
    text-align: center;
    width: 100%;
    justify-content: center;
    display: block;
    color: #333;
  }
  
  .letter:active,.letter:hover{
    color: #FFAA00
  }
  
  .letter_alert {
    position: absolute;
    z-index: 20;
    background-color: rgba(0, 0, 0, 0.5);
    width: 80px;
    height: 80px;
    left: 50%;
    top: 50%;
    margin-left: -40px;
    margin-top: -40px;
    border-radius: 40px;
    text-align: center;
    line-height: 80px;
    font-size: 35px;
    color: #fff;
    transition: 0.2s;
  }

</style>
