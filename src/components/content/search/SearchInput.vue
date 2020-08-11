<template>
  <div class="search_input">
    <div class="search_box">
      <span class="iconfont icon_soushuo" @click="search"></span>
      <input type="text" placeholder="搜素您想要的车"  @keyup.enter="search" v-model="keyWord"/>
      <span class=" iconfont icon_quxiao1" @click="inputRemove"></span>
    </div>
    <span class="search_txt" @click="remove">取消</span>
  </div>
</template>

<script>
  export default {
    name: "SearchInput",
    props:{
      searchTab:{
        type:String,
        default:''
      }
    },
    data(){
      return{
        keyWord: this.searchTab,
      }
    },
    watch:{
      searchTab(val,oldval){
        if(val!=undefined){
          this.keyWord=val;
        }
      }
    },
    methods:{
      remove() {
        this.$emit('remove')
      },
      inputRemove() {
        this.keyWord=''
      },
      search(){
        this.$emit('search',{key:'keyWord',value:this.keyWord,name:this.keyWord})
      }
      
    },
    mounted() {
   
    }
  }
</script>

<style scoped>
  .search_input {
    display: flex;
    padding: .20rem .26rem;
    background-color: #fff;
    color: #333;
  }
  
  .search_box {
    width: 6.22rem;
    height: .60rem;
    line-height: .60rem;
    background-color: #f5f5f5;
    border-radius: .36rem;
    display: flex;
    
  }
  
  .search_box .icon_soushuo {
    font-size: .22rem;
    padding: 0 .24rem;
    color: #999;
  }
  .search_box .icon_quxiao1 {
    font-size: .24rem;
    padding: 0 .24rem;
    color: #cfcfcf;
  }
  .search_box input::-webkit-input-placeholder{
    color: #333;
  }
  .search_box input {
    height: .60rem;
    font-size: .24rem;
    color: #333;
    width: 4.84rem;
  }
  
  .search_txt {
    flex: 1;
    line-height: .60rem;
    padding-left: .20rem;
    font-size: .28rem;
    color: #333;
  }

</style>
