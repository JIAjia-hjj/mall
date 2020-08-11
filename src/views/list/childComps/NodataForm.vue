<template>
  <div class="nodata_form">
    <div class="txt1">
      <span class="iconfont icon_nocontent"></span>很抱歉，暂时没有该车型
    </div>
    <div class="form">
      <div class="txt2">提交您的意向车型，我们可提供线下采购服务</div>
      
      <label class="input input_tel" for="phone">
        <span class="iconfont icon_shouji"></span>
        <input placeholder="请输入您的手机号码"  id="phone"/>
      </label>
      <label class="input input_cartype" for="cartype">
        <span class="iconfont icon_tiche"></span>
        <input placeholder="请输入您的意向车型" id="cartype"/>
      </label>
      <button class="btn" @click="submit">提交意向车型</button>
    </div>
  
  </div>
</template>

<script>
  export default {
    name: "NodataForm",
    methods:{
      submit(){
      
      }
    }
  }
</script>

<style scoped>
  /* 无数据 */
  .nodata_form{
    padding-top: 0.24rem;
  }
  .nodata_form .txt1{
    text-align: center;
    color: #333333;
    font-size: .28rem;
    top: 4.30rem;
  }
  .nodata_form .icon_nocontent{
    padding-right: .10rem;
  }
  .nodata_form .form{

  }
  .nodata_form .form .txt2{
    text-align: center;
    font-size: .28rem;
    padding-top: .52rem;
    color: #999999
  }
  .nodata_form .form .input {
    width: 6.06rem;
    height: .90rem;
    border-radius: .60rem;
    line-height: .90rem;
    border:.01rem solid #e4e4e4;
    background: #FFFFFF;
    display: flex;
    font-size: .28rem;
    margin: .54rem auto 0;
    position: relative;
  }
  
  .nodata_form .form .input_cartype::after {
    display: block;
    content:'';
    width: 6.06rem;
    height: 1px;
    background-color:#E4E4E4;
    position: absolute;
    bottom:-.49rem;
    left: 0;
  }
  
  .nodata_form .form .input .iconfont {
    text-align: center;
    width: 1.20rem;
    position: relative;
    color: #999;
    font-size: .50rem;
  }
  
  .nodata_form .form .input .iconfont::after {
    content: '';
    width:.03rem;
    height: .60rem;
    display: inline-block;
    background-color: #e4e4e4;
    position: absolute;
    bottom: .20rem;
    right: .12rem;
  }
  
  .nodata_form .form .input input {
    height: 100%;
    flex: 1;
    margin-left: .10rem;
  }
  
  .nodata_form .form .input::-webkit-input-placeholder {
    color: #999;
    font-weight: lighter;
  }
  .nodata_form .form .input::-moz-placeholder {
    color: #999;
    font-weight: lighter;
  }
  .nodata_form .form .input::-ms-input-placeholder {
    color: #999;
    font-weight: lighter;
  }
  
  .nodata_form .form .btn {
    width: 6.06rem;
    height: .90rem;
    border-radius: .60rem;
    line-height: .90rem;
    background-color: #fa0;
    text-align: center;
    font-size: .32rem;
    font-weight: bold;
    color: #fff;
    display: block;
    margin: .98rem auto 0;
  }
</style>
