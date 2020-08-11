<template>
  <div class="brand_car">
    <title-bar>
      <div slot="left">快速选车</div>
      <a  slot="right" href="/list" style="color: #999;">更多车型<span class="iconfont icon_fanhui" style="padding-left: 0.05rem"></span></a>
    </title-bar>
    <div class="brand">
      <div class="brand_item" v-for="(item,index) in carBrandList" :key="item.uplogo"  @click="selectedClick('brandid',item.id,item.name)" v-if="index<10">
        <img :src="item.uplogo" alt="">
        <div class="name">{{item.name}}</div>
      </div>
    </div>
    <div  class="speed_tag">
      <div class="tag">
        <span class="tag_item oneline" v-for="(item,index) in speedTag" :key="item.title" v-if="index<4" @click="">{{item.title}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import {getCarBrandList} from 'network/home'
  import TitleBar from 'components/content/titleBar/TitleBar'
  export default {
    name: "",
    props:{
    
    },
    data(){
      return{
        speedTag:[],
        carBrandList:[]
      }
    },
    components:{
      TitleBar
    },
    methods:{
      
      //获取品牌列表
      getCarBrandList(){
        getCarBrandList().then(res=>{
          if(res.code==0){
            this.carBrandList=res.data;
            this.speedTag=res.speedTag;
          }
        }).catch(err=>{
          console.log(err);
        });
      },
      selectedClick(key,value,name){
        this.$store.commit({
          type:'setCarSearchInfo',
          key:key,
          value:value,
          name:name
        });
        this.$router.push('/list');
      },
      
      
    },
    created() {
      this.getCarBrandList();
    }
  }
</script>

<style scoped>
.brand_car{
  background-color: #fff;
  border-bottom: 1px solid #E4E4E4;
}

.brand{
  display: flex;
  flex-wrap: wrap;
  padding: 0.2rem 0.2rem 0;
  /*border-bottom: 1px solid #E4E4E4;*/
}

.brand .brand_item{
  width: 20%;
  text-align: center;
  margin-bottom: 0.2rem;
}
.brand .name{
  font-size: 0.24rem;
  margin-top: 0.1rem;
}
.brand_item img{
  width: 0.64rem;
  margin: 0 auto;
}

.speed_tag {
  height: .90rem;
  display: flex;
}

.speed_tag .tag {
  flex: 1;
  overflow: hidden;
  padding: .20rem .48rem;
  display: flex;
  justify-content: space-between;
}


.speed_tag .tag_item {
  
  max-width: 23%;
  height: .50rem;
  line-height: .50rem;
  border-radius: .50rem;
  padding: 0 .12rem;
  display: inline-block;
  color: #FF563B;
  font-size: .24rem;
  border:.01rem solid rgba(255, 86, 59, 0.3);
  background-color: rgba(255, 86, 59, 0.1);
  
}
</style>
