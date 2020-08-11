<template>
  <div class="problem">
    <div class="problem_item" v-for="(item,index) in problemList" :key="item.title" v-if="index<3">
      <div class="title"  :class="index==idx?'border_none':''" @click="getProblemIdx(index)">
        {{item.title}}
        <span class="icon iconfont " :class="index==idx?'icon_xiala':'icon_shangla'"></span>
      </div>
      <div class="content" :class="{'border_top':index==idx}" hidden="index!=idx" v-html="item.content">
      </div>
    </div>
  </div>
</template>

<script>
  import {getProblemList} from 'network/problem'
  export default {
    name: "Problem",
    data(){
      return{
        idx:0,
        problemList:[]
      }
    },
    methods:{
      getProblemList(){
        getProblemList().then(res=>{
          if(res.code==0){
            if (res.data == "undefined") {
              return;
            }
            res.data.forEach(function(item) {
              item.content = item.content.replace(/<[\S\s]*?>/g, '');
            });
            this.problemList=res.data;
          }
        }).catch(err=>{
        
        })
      },
      getProblemIdx(index){
      
      }
      
    },
    created() {
      this.getProblemList()
    }
  }
</script>

<style scoped>
  .problem_item{
    background-color: #fff;
  }
  .problem_item .title{
    font-size: .28rem;
    padding:.26rem .48rem .26rem 0;
    margin-left: .48rem;
    border-bottom:.01rem solid #E4E4E4;
    color: #333333;
    position: relative;
  }
  .problem_item .title::before{
    font-family: iconfont;
    content: '\e628';
    font-size: .28rem;
    color: #FFAA00;
  }
  
  .problem_item .title .icon_faq{
    color: #FFAA00;
  }
  .problem_item .title .icon{
    color: #999;
    font-size: .48rem;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: .32rem;
  }
  
  .problem_item .content{
    background-color: #F5F5F5;
    color: #999999;
    padding: .26rem .34rem;
    font-size: .28rem;
    margin-top: -.01rem;
    /*font-weight: lighter;*/
  }
  .border_top{
    border-top:.01rem solid #E4E4E4;
  }
  .border_none{
    border: none;
  }
</style>
