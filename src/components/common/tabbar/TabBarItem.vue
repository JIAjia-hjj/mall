<template>
  <div class="tab-bar-item" @click="itemClick">
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

      }
    },
    computed:{
      isActive(){
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
    height:0.9rem;
    font-size: 0.2rem;
  }
  .tab-bar-item img{
    width:0.4rem;
    /*图片最下面会多三个像素，去图片最下面的默认三个像素*/
    vertical-align: middle;
    margin: 0.06rem auto 0.08rem;
  }
  
</style>
