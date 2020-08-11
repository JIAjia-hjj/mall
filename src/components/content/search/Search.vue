<template>
  <div class="search">
    <!-- <text class="iconfont icon_dingwei"></text> -->
    <span class="city" @click="selectCity">{{$store.state.location.city}}</span>
    <div class="search_box" @click="searchClick">
      <span class="iconfont icon_soushuo"></span>
      <span>喜相逢购车，超低月供</span>
    </div>
    <a  :href="'tel:'+$store.state.phone" class="call_phone"><span class="iconfont icon_dianhua"></span></a>
    <!--<baidu-map @ready="getLocation" style="display: none;"></baidu-map>-->
  </div>
</template>

<script>
  import BaiduMap from 'vue-baidu-map'
  export default {
    name: "Search",
    data(){
      return{
        city:'定位中',
      }
    },
    methods:{
      selectCity(){
        this.$router.push('/city');
      },
      searchClick(){
        this.$emit('searchClick')
      },

    },
    created() {
    
    },
    mounted() {
    }
  }
</script>

<style scoped>
  
  .search {
    display: flex;
    align-content: center;
    width: 100%;
    height: .72rem;
    font-size: .24rem;
    padding: 0 .24rem;
    background-color: #fff;
  }
  .icon_dianhua {
    font-size: .30rem;
    padding:0 .15rem 0 .30rem;
    color: #333;
  }
  
  .city {
    padding: .10rem;
    padding-left: 0;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    
  }
  .city::before{
    content: '\e618';
    font-family: 'iconfont';
    padding-right: .10rem;
    font-size: .28rem;
  }
  .search_box {
    margin-left: .12rem;
    width: 4.88rem;
    height: .52rem;
    line-height: .52rem;
    background-color: #f5f5f9;
    color: #999;
    font-size: .24rem;
    border-radius: .26rem;
    padding-left: .20rem;
  }
  .call_phone{
    line-height: .52rem;
  }
  .icon_soushuo {
    font-size: .24rem;
    padding-right: .20rem;
  }

</style>
