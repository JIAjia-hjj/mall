<template>
  <div class="tab_content">
    <div class="title">
      <slot name="title"></slot>
    </div>
     <div class="content">
       <div class="content_item" :class="{'content_active':tabid==item.id}" v-for="(item,index) in tabComtentList" @click="selectedClick(tabkey,item.id,item.name)">
         <span class="name">{{item.name}}</span>
       </div>
     </div>

  </div>
</template>

<script>
  export default {
    name: "TabContent",
    props:{
      tabComtentList:{
        type:Array,
        default() {
          return [];
        }
      },
      tabkey:{
        type: String,
        default:''
      },
      searchContents:{
        type:Object,
        default() {
          return {};
        }
      }
    },
    watch:{
      searchContents:{
        handler(val){
          if(val[this.tabkey]==undefined){
            this.tabid='';
          }
        },
        deep:true
      }
    },
    data(){
      return{
        tabid:''
      }
    },
    methods:{
      selectedClick(key,value,name){
        this.tabid=value;
        this.$emit('selectedClick',key,value,name);
        this.$emit('tabClick',0);
      },
    },
    created() {

    }
  }
</script>

<style scoped>
  .tab_content{
    background-color: #fff;
  }
  .title{
    height: .88rem;
    line-height: .88rem;
    background-color: #f5f5f9;
    font-size: .28rem;
    color: #333;
    padding-left: .48rem;
  }
  .content{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 0.48rem 0.48rem 0.24rem;
  }
  .content_item{
    height: .72rem;
    line-height: .72rem;
    margin-bottom: 0.24rem;
  }
  .content_item .name{
    display: inline-block;
    width: 1.80rem;
    height: .72rem;
    line-height: .72rem;
    position: relative;
    text-align: center;
    border-radius: .10rem;
    border: 1px solid #fff;
    background-color: #f5f5f9;
    overflow: hidden;
    white-space: nowrap;
    font-size: .28rem;
    color: #333;
  }
  .content_active .name{
    color: #fa0;
    border-color: #fa0;
    background-color: rgba(225, 170,0,0.2);
  }
</style>
