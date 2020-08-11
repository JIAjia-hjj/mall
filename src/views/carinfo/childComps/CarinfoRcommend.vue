<template>
  <div>
    <title-bar>
      <span slot="left">猜你喜欢</span>
      <router-link class="right" to="/config">详细参数配置	<text class="iconfont icon_fanhui"></text></router-link>
    </title-bar>
    <div class="car_list">
      <router-link  v-for="item in recommendList" :key="item.id"  :to="'/carinfo/'+item.id">
        <car-item :carItem="item"></car-item>
      </router-link>
    </div>

  </div>
</template>

<script>
  import {getRecommendList} from 'network/carinfo'
  import TitleBar from 'components/content/titleBar/TitleBar'
  import CarItem from 'components/content/carItem/CarItem'
  
  export default {
    name: "CarinfoeRcommend",
    props:{
      carid:{
        default:''
      }
    },
    components: {
      TitleBar,
      CarItem
    },
    data(){
      return{
        recommendList:[]
      }
    },
    methods:{
      getRecommendList() {
        getRecommendList(this.carid).then(res=>{
          if(res.code==0){
            if (res.data.length > 0) {
              res.data.forEach(function (item) {
                item.jiequ_brand_name = item.jiequ_brand_name ? item.jiequ_brand_name : item.name.split(' ')[0];
                item.name = item.name.split(" ").slice(1).join(' ');
              });
            }
            this.recommendList=res.data;
          }
       
          console.log(res);
        }).catch(err=>{
          console.log(err);
        });
        // app.request({
        //   url: "/v1/car/similar",
        //   data: {
        //     car_id: this.data.carId,
        //     is_tui: 1
        //   },
        //   success: res => {
        //     if (res.data.data == "undefined" || res.data.data.length == 0) {
        //       return;
        //     }
        //     res.data.data.forEach(function(item, index) {
        //       item.jiequ_brand_name = item.jiequ_brand_name ? item.jiequ_brand_name : item.name.split(' ')[0];
        //       item.name = item.name.split(" ").slice(1).join(' ');
        //     });
        //
        //     this.setData({
        //       recommendList: res.data.data
        //     })
        //   },
        //   fail: () => {
        //     app.showTip('获取推荐数据失败')
        //   }
        // })
      },
    },
    created(){
      this.getRecommendList();
    },
    mounted() {
      // this.getRecommendList();
    }
  
  }
  
</script>

<style scoped>

</style>
