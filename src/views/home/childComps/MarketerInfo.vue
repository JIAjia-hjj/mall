<template>
  <div class="xxf_marketer" v-if="marketerInfo">
    <div bindtap="toMyIndex" class="marketer_info">
      <div class="photo">
        <img :src="marketerInfo.avatar?marketerInfo.avatar:'https://sprogram.xxfgo.com/images/appserve/nologin_photo.png'"  style="width:.96rem;height:.96rem;"/>
      </div>
      <div class="info">
        <div>
          <div class="name">{{marketerInfo.name?marketerInfo.name:'无法获取姓名'}}</div>
          <div class="job oneline">您的专属高级销售经理
            <span class="iconfont icon_renzheng"></span>
          </div>
        </div>
        <div class="company oneline">{{marketerInfo.company}}</div>
      </div>
    </div>
    <a class="btn"  :href="'#'+$store.state.phone">
      立即咨询
    </a>
  </div>
</template>

<script>
  export default {
    name: "MarketerInfo",
    computed:{
      marketerInfo(){
        // console.log(this.$store.state.marketerInfo);
        return this.$store.state.marketerInfo
      },
    }
  }
</script>

<style scoped>
  .xxf_marketer {
    
    width: 100%;
    height: 1.36rem;
    display: flex;
    padding: .20rem .24rem;
    justify-content: space-between;
    align-content: center;
    font-size: .28rem;
    border-bottom: 1px solid #E4E4E4;
  }
  
  .xxf_marketer .marketer_info {
    display: flex;
    /* flex: 1; */
  }
  
  .xxf_marketer .photo {
    width: .96rem;
    height: .96rem;
    border-radius: 50%;
    background-color: #FF7700;
    overflow: hidden;
  }
  
  .xxf_marketer .info {
    width: 3.88rem;
    padding: 0.03rem .24rem;
  }
  
  .xxf_marketer .info .name {
    color: #333;
    font-size: .36rem;
    font-weight: bold;
    padding-right: .10rem;
  }
  
  .xxf_marketer .info .job {
    color: #999999;
    font-size: .28rem;
    padding-top: 0.1rem;
  }
  
  .xxf_marketer .info .company {
    color: #999;
    font-size: .24rem;
    padding-top: .15rem;
  }
  .icon_renzheng{
    color:#FFAA00;
  }
  .xxf_marketer .btn {
    margin-top: .20rem;
    color: #fff;
    font-size: .24rem;
    background-color: #FFAA00;
    border: 1px solid #FFAA00;
    width: 1.38rem;
    height: .62rem;
    line-height: .62rem;
    text-align: center;
    border-radius: .10rem;
  }

</style>
