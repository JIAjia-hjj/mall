<template>
  <div class="wrapper" ref="wrapper">
      <div>
        <slot></slot>
      </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name: "BetterScroll",
    props:{
      probeType:{
        type:Number,
        default:0
      },
      pullUpLoad:{
        type: Boolean,
        default: false
      },
      pullDownRefresh:{
        type: Boolean,
        default: false
      }
    },
    data(){
     return{
       bscroll:null,
       
     }
    },
    methods:{
      scrollTo(x,y,time=300){
        this.bscroll&&this.bscroll.scrollTo(x,y,time);
      },
      finishPullUp(){
        this.bscroll&&this.bscroll.finishPullUp();
      },
      finishPullDown(){
        this.bscroll&&this.bscroll.finishPullDown();
      },
      refresh(){
        this.bscroll&&this.bscroll.refresh();
      }
    },
    mounted() {
      console.log(this.probeType);
      //1、创建BScroll对象
      this.bscroll=new BScroll(this.$refs.wrapper,{
        click:true,
        probeType:this.probeType,
        pullUpLoad:this.pullUpLoad,
        pullDownRefresh:this.pullDownRefresh
      });
      console.log(this.bscroll);
      //2、监听滚动的位置
      if(this.probeType===2||this.probeType===3){
        this.bscroll.on('scroll',(position)=>{
          // console.log(position);
          this.$emit('scroll',position);
        });
      }
      
      //3、监听上拉事件
      if(this.pullUpLoad){
        this.bscroll.on('pullingUp',()=>{
          this.$emit('pullingUp')
        })
      }
      //4、监听下拉
       if(this.pullDownRefresh){
         this.bscroll.on('pullingDown',()=>{
           console.log('监听下拉');
           this.$emit('pullingDown')
         })
       }
    }
  }
</script>

<style scoped>

</style>
