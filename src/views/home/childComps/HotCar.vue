<template>
  <div class="select_car">
    <title-bar>
      <div slot="left">热门爆款</div>
      <a  slot="right" href="/list" style="color: #999;">更多车型<span class="iconfont icon_fanhui" style="padding-left: 0.05rem"></span></a>
    </title-bar>
    <div class="select">
      <router-link  v-for="item in hotcarList" :key="item.id"  :to="'/carinfo/'+item.id">
        <car-item :carItem="item"></car-item>
      </router-link>
     
    </div>
  </div>
</template>

<script>
  import {getCarList} from 'network/home'
  import TitleBar from 'components/content/titleBar/TitleBar'
  import CarItem from 'components/content/carItem/CarItem'
  export default {
    name: "HotCar",
    components:{
      TitleBar,
      CarItem
    },
    data(){
      return{
        hotcarList:{}
      }
    },
    created() {
      //热门车型
      getCarList(1).then(res=>{
        let list = res.data;
        list.forEach(function(item) {
          item.name = item.name.split(" ").slice(1).join(' ');
        });
        this.hotcarList=list;
      }).catch(err=>{
        console.log(err);
      });
    }
  }
</script>

<style scoped>
  .select_car{
  background-color: #fff;
  }
</style>
