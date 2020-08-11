<template>
  <div class="tip" :style="{width: tipObj.width+'rem',height:tipObj.height+'rem',paddingTop:tipObj.paddingTop+'rem',borderRadius:tipObj.borderRadius+'rem'}" v-if="isShowTip">
     <span class="iconfont" :class="tipObj.icon" :style="{fontSize:tipObj.iconfontSize+'rem',iconBottom:tipObj.iconBottom+'rem'}"></span>
      <p class="tip_text" v-html="tipObj.text" :style="{fontSize:tipObj.fontSize+'rem'}">
      </p>
  </div>
</template>

<script>
  export default {
    name: "Tip",
    props:{
    
    },
    data(){
      return{
        isShowTip:false,
        tipObj:{
          width:1.5,
          height:0.8,
          paddingTop:.09,
          fontSize:.24,
          iconfontSize:.3,
          icon:'',
          text:'',
          time:3000,
          borderRadius:0.2,
          iconBottom:0.1
        }
      }
    },
    methods:{
      showTip(tipObj) {
        this.isShowTip = true;
        this.tipObj=Object.assign(this.tipObj, tipObj);
        const timeId = setTimeout(() => {
          this.isShowTip = false;
          clearTimeout(timeId);
        }, this.tipObj.time);
      },
    }
  }
</script>

<style scoped>
  .tip{
    position: fixed;
    width: 1.50rem;
    height:1rem;
    background-color: rgba(0, 0, 0, 0.7);
    top: 45%;
    left:50%;
    transform: translate(-50%,-50%);
    z-index: 999999;
    border-radius: .2rem;
    text-align: center;
    padding:0.22rem .18rem;
    color: #fff;
    box-sizing: border-box;
  }
  .iconfont{
    font-size: .30rem;
    padding-bottom:.06rem;
    display: block;
  }
  .tip_text{
    white-space:pre-wrap;
    font-size: .24rem
  }
</style>
