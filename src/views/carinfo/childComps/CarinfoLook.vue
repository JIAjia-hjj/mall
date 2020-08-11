<template>
  <div>
    <title-bar>
      <span slot="left">{{carInfo.is_new==1?"车型亮点":"车辆实拍"}}</span>
    </title-bar>
    <div class="look">
      <div class="look_item" v-for="item in carInfo.highlights" :key="item.title">
        <img :src="item.img" mode="widthFix" style="width:100%"/>
        <div class="title">{{item.title}}</div>
        <div class="des">{{item.des}}</div>
      </div>
    </div>

  </div>
</template>

<script>
  import TitleBar from 'components/content/titleBar/TitleBar'
  export default {
    name: "CarinfoLook",
    props:{
      carInfo:{
        type:Object,
        default(){
          return {}
        }
      }
    },
    components:{
      TitleBar
    },
  }
</script>

<style scoped>
  .look {
    padding: .25rem .62rem .01rem;
  }

  .look_item {
    margin-bottom: .50rem;
  }

  .look .title {
    color: #333;
    font-size: .28rem;
    padding: .18rem 0 .12rem;
  }

  .look .des {
    color: #999;
    font-size: .24rem;
  }
</style>
