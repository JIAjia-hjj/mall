<template>
  <div class="nav_bar">
      <div class="nav_bar_box">
    
      <div class="left">
        <slot name="left">
          <span class="iconfont icon_back" @click="backClick"></span>
        </slot>
      </div>
      <div class="center">
        <slot name="center"></slot>
      </div>
      <div class="right">
        <slot name="right"></slot>
      </div>
    </div>
  </div>
  
</template>

<script>
  export default {
    name: "NavBar",
    data(){
      return{
        isShowBack:false
      }
    },
    methods:{
      backClick(){
        if (window.history.length <= 1) {
          this.$router.push({path:'/'});
        } else {
          this.$router.go(-1);
        }
        // setTimeout(()=>{
        //   this.$router.push({path:'/'})
        // },1000);
      }
      
    },
    created() {
      if(window.history.length>1){
        this.isShowBack=true;
      }
    }
  }
</script>

<style scoped>
  .nav_bar{
    height: 0.88rem;
    max-width: 750px;
    margin: 0 auto;
  }
   .nav_bar_box{
     position: fixed;
     top: 0;
     left: 0;
     right: 0;
     z-index:999;
     display: flex;
     height: 0.88rem;
     line-height: 0.88rem;
     /*font-weight: bold;*/
     color: #000;
     background-color: #fff;
     max-width: 750px;
     margin: 0 auto;

   }
  .left,.right{
    width: 1.2rem;
  }
  .center{
    text-align: center;
    flex: 1;
    font-size: 0.28rem;
  }
  .icon_back{
    padding-left: 0.2rem;
  }
  
</style>
