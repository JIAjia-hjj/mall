<template>
  <div class="tab_control">
     <div v-for="(item,index) in tabs" class="tab_item" :class="{tab_item_active:index==currentIndex}" @click="tabClick(index)">
      {{item}}
     </div>
  </div>
</template>

<script>
  export default {
    name: "TabControl",
    props:{
      tabs:{
        default(){
          return []
        }
      },
      tabActive:{
        type:Number,
        default:0
      }
    },
    data(){
      return{
        currentIndex:0
      }
    },
    watch:{
      tabActive(val){
        this.currentIndex=val;
      }
    },
    methods:{
      tabClick(index){
        this.currentIndex=index;
        this.$emit('tabClick',this.currentIndex);
      }
    }
  }
</script>

<style scoped>
  .tab_control{
    height: .9rem;
    line-height: .9rem;
    /*width: 100%;*/
    max-width: 750px;
    margin: 0 auto;
    color: #999;
    background-color: #fff;
    font-size: .28rem;
    border-bottom:1px solid #e4e4e4;
    display: flex;
    justify-content: space-around;
  
    left: 0;
    right: 0;
  }
  
  .tab_control .tab_item{
    text-align: center;
    padding:0 0.25rem;
  }
  
  .tab_item_active {
    color: #333;
    border-bottom:.06rem solid #fa0;
  }
</style>
