<template>
  <div>
    <title-bar>
      <span slot="left">参数配置</span>
      <router-link class="right" to="/config">详细参数配置	<text class="iconfont icon_fanhui"></text></router-link>
    </title-bar>
    <div class="config">
      <div class="config_item">
        <span class="name">车辆级别</span>
        <span class="value">{{carInfo.sizetype_des}}</span>
      </div>
      <div class="config_item" v-if="carInfo.basic">
        <span class="name">油耗</span>
        <span class="value">{{carInfo.basic.userfuelconsumption}}</span>
      </div>
      <div class="config_item" v-if="carInfo.doornum">
        <span class="name">车身结构</span>
        <span class="value">{{carInfo.body.doornum||'-'}}门 {{carInfo.body.seatnum||'-'}} 座</span>
      </div>
      <div class="config_item"  v-if="carInfo.engine">
        <span class="name">排量</span>
        <span class="value">{{carInfo.engine.displacement||carInfo.engine.displacement_des}}</span>
      </div>
      <div class="config_item" v-if="carInfo.body">
        <span class="name">车身长/宽/高(mm)</span>
        <span class="value">{{carInfo.body.len+"/"+carInfo.body.width+"/"+carInfo.body.height}}</span>
      </div>
      <div class="config_item" v-if="carInfo.basic">
        <span class="name">最高车速</span>
        <span class="value">{{carInfo.basic.maxspeed||noInfo}}</span>
      </div>
      <div class="config_item" v-if="carInfo.gearbox">
        <span class="name">变速箱</span>
        <span class="value">{{carInfo.gearbox.abbreviation}}</span>
      </div>
      <div class="config_item" v-if="carInfo.engine">
        <span class="name">燃油形式</span>
        <span class="value">{{carInfo.engine.fueltype}}</span>
      </div>
    </div>
  </div>

</template>

<script>
  import TitleBar from 'components/content/titleBar/TitleBar'
  
  export default {
    name: "CarinfoConfig",
    props:{
      carInfo:{
        type:Object,
        default(){
           return {}
        },
      }
    },
    data(){
      return{
        noInfo:'暂无数据'
      }
    },
    components: {
      TitleBar
    }
    
  }
</script>

<style scoped>
  .config {
    padding: .12rem .84rem .24rem .74rem;
  }
  
  .config .config_item {
    display: flex;
    justify-content: space-between;
    align-content: center;
    padding: .12rem 0;
  }
  
  .config .config_item .name {
    font-size: .28rem;
    color: #333333;
  }
  
  .config .config_item .value {
    font-size: .24rem;
    color: #999999;
  }
</style>
