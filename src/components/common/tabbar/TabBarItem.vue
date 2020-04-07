<template>
  <div class="tab-bar-item" @click="itemClick">
    <!--所有的item都展示一个图片，同一个文字，要显示不一样要使用插槽-->
    <!--<img  src="../../assets/img/tabbar/home.svg" alt="">-->
    <!--<div >首页</div>-->
    
    
    <!--一开始让别人两张图片都传好，显示哪张内部决定。而不是让插入的人决定-->
    <!--<slot name="item-icon" v-if="!isActive"></slot>-->
    <!--<slot name="item-icon-active" v-else></slot>-->
    <!--class没效果，因为插槽会被替换-->
    <!--<slot :class="{active:isActive}" name="item-text"></slot>-->
    
    
    <!--<div  v-if="!isActive"><slot name="item-icon"></slot></div>-->
    <!--<div v-else><slot name="item-icon-active"></slot></div>-->
    <!--<div :class="{active:isActive}"> <slot name="item-text"></slot></div>-->
    
    
    <!--动态颜色-->
    <div  v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :style="activeStyle"> <slot name="item-text"></slot></div>
  </div>
</template>

<script>
  export default {
    name: "TabBarItem",
    props:{
      path:String,
      activeColor:{
        type:String,
        default:'#FFAA00'
      }
      
    },
    data(){
      return {
        // isActive:true
      }
    },
    computed:{
      isActive(){
        console.info(this.$route.path,this.path);
        return this.$route.path.indexOf(this.path)!==-1
      },
      activeStyle(){
        return this.isActive?{color:this.activeColor}:{}
      },
    },
    
    methods:{
      itemClick(){
        console.log(this.path);
        this.$router.replace(this.path);
      }
    }
    
  }
</script>

<style scoped>
  .tab-bar-item{
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }
  .tab-bar-item img{
    width:20px;
    margin-top:3px;
    /*图片最下面会多三个像素，去图片最下面的默认三个像素*/
    vertical-align: middle;
    margin-bottom: 2px;
  }
  .active{
    color:#FFAA00;
  }
  
</style>
