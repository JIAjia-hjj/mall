<template>
  <!-- 搜索记录 -->
  <div class="search_content">
    <div class="item" v-for="(value,key) in searchContents" :key="key">
      <span class="text oneline">{{value}}</span>
      <span class="iconfont icon_quxiao" @click="removeSearchContent(key)" ></span>
    </div>
    <div class="reset" @click="reset">
      <span class="iconfont icon_chongzhi"></span>重置
    </div>
  </div>
</template>

<script>
  export default {
    name: "ListSearch",
    props:{
      searchContents:{
        type:Object,
        default(){
          return {}
        }
      }
    },
    methods:{
      removeSearchContent(key){
       
        this.$emit('removeSearchContent',key);
      },
      reset(){
        this.$emit('reset');
      },
    }
  }
</script>

<style scoped>
  .search_content {
    line-height: .90rem;
    padding: .13rem .24rem;
    position: relative;
    background: #fff;
  }
  .search_content  .icon_quxiao{
    font-size:.18rem;
    flex: 1;
    text-align: center;
    padding-right: 0.14rem;
  }
  .search_content .icon_chongzhi{
    font-size:.22rem;
    padding-right:.05rem;
  }
  .search_content .item{
    border-radius: .50rem;
    width: 1.72rem;
    height: .50rem;
    line-height: .50rem;
    font-size: .20rem;
    color: #FF563B;
    display: flex;
    background-color: rgba(255,86,59,0.1);
    border:0.01rem solid rgba(255,86,59,0.3);
    padding:0 0.05rem;
    float: left;
    margin: .10rem .20rem .10rem 0;
  }
  .search_content .item .text{
    display: inline-block;
    width: 1.30rem;
    text-align: center;
    font-size: .20rem;
    color: #FF563B;
  }
  
  .search_content .reset{
    font-size: .24rem;
    color: #999;
    position: absolute;
    right:.32rem;
    top:0;
  }
</style>
