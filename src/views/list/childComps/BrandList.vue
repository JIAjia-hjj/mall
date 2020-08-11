<template>
    <div class="brand">
      <div class="brand_group">
        <div v-for="(brands,key) in brandList" :key="key">
          <div class="group_letter" :id="key">{{key}}</div>
          <div class="brand_item"
               :class="{'border_none':index==brands.length-1,'brand_active':brandid==item.id}"
               v-for="(item,index) in brands" :key="item.id" @click="selectedClick('brandid',item.id,item.name)" >
            <img :src="item.uplogo" v-if="item.uplogo||item.logo"/>
            <span>{{item.name}}</span>
          </div>
        </div>
      </div>
      <div class="letter" id="letter" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
        <div class="letter_item" v-for="item in letter" :key="item">{{item}}</div>
      </div>
    </div>
</template>

<script>
  export default {
    name: "BrandList",
    props: {
      brandList: {
        type: Object,
        default() {
          return {}
        }
      },
      searchContents:{
        type:Object,
        default() {
          return {};
        }
      }
    },
    data(){
      return{
        letter: ['#', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
        brandid: '',
      }
    },
    watch:{
      searchContents:{
        handler(val){
          if(val['brandid']==undefined){
            this.brandid='';
          }
        },
        deep:true
      }
    },
    methods:{
      selectedClick(key,value,name){
        this.brandid=value;
        this.$emit('selectedClick',key,value,name);
        this.$emit('tabClick',0);
      },
      touchStart(){
      
      },
      touchMove(){
      
      },
      touchEnd(){
      
      }
    },
    created() {
    }
  }
</script>

<style scoped>
  .brand {
    position: fixed;
    top: 1.68rem;
    bottom:0.88rem;
    left: 0;
    right: 0;
    background: #fff;
    z-index: 3;
    overflow: auto;
  }
  
  .brand .letter {
    position: fixed;
    bottom: .28rem;
    right: .24rem;
    width: .20rem;
    color: #999;
    font-size: .20rem;
    font-weight: normal;
  }
  
  .brand .letter .letter_item {
    padding:.02rem 0;
    text-align: center;
  }
  
  .brand .brand_group {
    /*height: 100vh;*/
    position: relative;
    border-bottom:.01rem solid #e4e4e4;
    color: #333;
    font-size: .28rem;
  }
  
  .brand .brand_group .brand_item {
    height: .90rem;
    line-height: .90rem;
    margin-left: .48rem;
    border-bottom:.01rem solid #e4e4e4;
  }
  .brand .brand_group:last-child .brand_item:last-child{
    border-color:transparent;
  }
  .brand_active {
    color: #fa0;
    position: relative;
  }
  
  .brand_active::after {
    content: '\e62d';
    font-family: "iconfont";
    width: .30rem;
    height: .30rem;
    line-height: .30rem;
    position: absolute;
    top: 50%;
    margin-top: -.15rem;
    right: .48rem;
  }
  
  .brand_group .brand_item img {
    width: .72rem;
    vertical-align: middle;
    margin-right: .24rem;
    display:inline-block;
  }
  
  .brand .brand_group .group_letter {
    background-color: #f5f5f9;
    height: .48rem;
    padding-left: .48rem;
    line-height: .48rem;
  }
</style>
