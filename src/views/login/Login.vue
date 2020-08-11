<template>
  <div class="login">
    <div class="title">
      <span class="iconfont icon_smile"></span>手机快速登录
    </div>
    <div class="form">
      <div class="input_box">
        <span class="label">+86</span>
        <input type="text" placeholder="请输入您的手机号" class="phone" maxlength="11" data-key="phone" v-model="phone"
               @keyup.enter="login()">
        <span class=" iconfont icon_quxiao1" v-show="phone.length!=0" @click="removePhone()"></span>
      </div>
      
      <div class="input_box code_box">
        <span class="label">验证码</span>
        <input type="text" placeholder="请输入验证码" class="code" maxlength="6" data-key="code" v-model="code" @keyup.enter="login()">
        <span class="code_btn" :class="{'active_code':phone.length==11}" @click="getCode()">{{codeText}}</span>
      </div>
    </div>
    <div class="submit_btn" :class="{'active_btn':phone!=''&&code!=''}" @click="login()">登录</div>
    <div class="bottom_txt">便宜提好车，就去喜相逢!</div>
    <tip ref="tip"></tip>
  </div>

</template>

<script>
  import {getCode, login, verifyCode} from 'network/login'
  
  import Tip from 'components/common/tip/Tip'
  
  const phoneCheck = /^[0-9]{11}$/;
  export default {
    name: "Login",
    components: {
      Tip
    },
    data() {
      return {
        phone: '',
        code: '',
        isGetCode: 1,
        codeText: '获取验证码',
        isLoginClick: false,
        timeId: '',
        isClickLogin: false,
      }
    },
    methods: {
      getCode() {
        if (this.isGetCode == 0) {
          this.$refs.tip.showTip({
            width: 2,
            height: 1,
            text: '请不要操作太频繁',
            paddingTop: 0.25
          });
          return;
        }
        if (!phoneCheck.test(this.phone)) {
          this.$refs.tip.showTip({
            width: 3,
            height: 1,
            text: '请输入有效手机号码',
            paddingTop: 0.25
          });
          return;
        }
        getCode(this.phone).then(res => {
          if (res.code == 0) {
            this.isGetCode = 0;
            setTimeout(() => {
              this.isGetCode = 1;
            }, 60000);
            
            this.$refs.tip.showTip({
              width: 3,
              height: 1,
              text: '发送成功',
              paddingTop: 0.25
            });
            let time = 60;
            this.reduceCodeTime(time);
          } else {
            this.$refs.tip.showTip({
              width: 3,
              height: 1,
              text: res.msg,
              paddingTop: 0.25
            });
          }
        }).catch(err => {
          console.log(err);
        });
      },
      reduceCodeTime(time) {
        if (time > 0) {
          time--;
          this.codeText = "重发(" + time + "s)";
          this.isGetCode = 0;
          const timeId = setTimeout(() => {
            clearTimeout(timeId);
            this.reduceCodeTime(time);
          }, 1000);
          this.timeId = timeId;
          
        } else {
          this.codeText = "获取验证码";
          this.isGetCode = 1;
          time = 60;
          clearTimeout(this.timeId);
        }
      },
      removePhone() {
        this.phone = ''
      },
      login() {
        const phone = this.phone;
        const code = this.code;
        if (this.isClickLogin) {
          this.$refs.tip.showTip({
            width: 3,
            height: 1,
            text: '操作过于频繁',
            paddingTop: 0.25
          });
          return;
        }
        if (!phoneCheck.test(phone)) {
          this.$refs.tip.showTip({
            width: 3,
            height: 1,
            text: '请输入有效手机号码',
            paddingTop: 0.25
          });
          return;
        }
        if (code < 4) {
          this.$refs.tip.showTip({
            width: 2,
            height: 1,
            text: '请输入有效验证码',
            paddingTop: 0.25
          });
          return;
        }
        //验证码验证请求
        verifyCode(phone, code).then(res => {
          //验证码验证成功的操作
          if (res.code != 0) {
            this.$refs.tip.showTip({
              width: 2,
              height: 1,
              text: res.msg,
              paddingTop: 0.25
            });
            return
          }
          //登录请求
          return login(phone)
        }).then((res) => {
          //登录成功的操作
          if (res.code == 0 || res.code == 3) {
            this.$refs.tip.showTip({
              width: 2,
              height: 1,
              text: '绑定成功',
              paddingTop: 0.25
            });
            setTimeout(() => {
              this.$router.push('/home');
            }, 2000);
            clearTimeout(this.timeId);
            this.codeText = "获取验证码";
            this.isGetCode = 1;
            
            this.$store.commit({
              type:'getPhone',
              phone:res.data.mobile
            })
          } else {
            this.$refs.tip.showTip({
              width: 2,
              height: 1,
              text: res.msg,
              paddingTop: 0.25
            });
          }
        }).catch(err => {
          console.log(err)
        });
      
        // new Promise((resolve,reject)=>{
        //   //验证码验证请求
        //   verifyCode(phone,code).then(res=>{
        //     resolve(res);
        //   }).catch(err=>{
        //     reject(err);
        //   })
        // }).then(res=>{
        //   //验证码验证成功的操作
        //   if(res.code!=0){
        //     this.$refs.tip.showTip({
        //       width:2,
        //       height:1,
        //       text:res.msg,
        //       paddingTop:0.25
        //     });
        //     return
        //   }
        //   //登录请求
        //   return new Promise((resolve,reject)=>{
        //     login(phone).then((res)=>{
        //       resolve(res);
        //     }).catch(err=>{
        //       reject(err);
        //     });
        //   });
        //
        // }).then(res=>{
        //   //登录成功的操作
        //   console.log(res);
        //   if(res.code==0||res.code==3){
        //     this.$refs.tip.showTip({
        //       width:2,
        //       height:1,
        //       text:'绑定成功',
        //       paddingTop:0.25
        //     });
        //     setTimeout(()=>{
        //       this.$router.push('/home');
        //     },2000);
        //     clearTimeout(this.timeId);
        //     this.codeText="获取验证码";
        //     this.isGetCode=1;
        //   }else {
        //     this.$refs.tip.showTip({
        //       width:2,
        //       height:1,
        //       text:res.msg,
        //       paddingTop:0.25
        //     });
        //   }
        // }).catch(err=>{
        //   console.log(err)
        // });
        
        // verifyCode(phone,code).then(res=>{
        //   if(res.code!=0){
        //     this.$refs.tip.showTip({
        //       width:2,
        //       height:1,
        //       text:res.msg,
        //       paddingTop:0.25
        //     });
        //     return
        //   }
        //   login(phone).then(res=>{
        //     console.log(res);
        //     if(res.code==0||res.code==3){
        //       this.$refs.tip.showTip({
        //         width:2,
        //         height:1,
        //         text:'绑定成功',
        //         paddingTop:0.25
        //       });
        //       setTimeout(()=>{
        //         this.$router.push('/home');
        //       },2000);
        //       clearTimeout(this.timeId);
        //       this.codeText="获取验证码";
        //       this.isGetCode=1;
        //     }else {
        //       this.$refs.tip.showTip({
        //         width:2,
        //         height:1,
        //         text:res.msg,
        //         paddingTop:0.25
        //       });
        //     }
        //   }).catch(err=>{
        //     console.log(err);
        //   });
        //
        // }).catch(err=>{
        //   console.log(err);
        // });
        
        
      }
    }
    
  }
</script>

<style scoped>
  .login {
    /*width: 100vw;*/
    height: 100vh;
    background-color: #fff;
    padding: 1rem 0.48rem;
  }
  
  .title {
    font-size: .40rem;
    color: #333;
  }
  
  .icon_smile {
    color: #FFAA00;
    padding-right: .24rem;
  }
  
  .form {
    margin-top: 1.34rem;
    padding: 0 .40rem;
  }
  
  .input_box {
    border-bottom: 1px solid #efeff4;
    height: .50rem;
    line-height: .50rem;
    display: flex;
    padding-bottom: .70rem;
  }
  
  .label {
    
    width: .84rem;
    font-size: .28rem;
    color: #333;
  }
  
  .icon_quxiao1 {
    flex: 1;
    text-align: right;
    color: #CFCFCF;
  }
  
  input {
    display: inline-block;
    width: 3.00rem;
    /*width:43%;*/
    margin-left: .40rem;
    height: .50rem;
    line-height: .50rem;
    color: #333;
    font-size: .28rem;
  }
  
  input::-webkit-input-placeholder {
    color: #999;
  }
  
  .code_box {
    margin-top: .72rem;
  }
  
  .code {
  
  }
  
  .code_btn {
    color: #999;
    font-size: .28rem;
  }
  
  .active_code {
    color: #FFAA00;
  }
  
  .bottom_txt {
    color: #D6D6D6;
    font-size: .24rem;
    position: fixed;
    left: 0;
    width: 100%;
    text-align: center;
    bottom: .26rem;
  }
  
  .submit_btn {
    font-weight: bold;
    font-size: 0.32rem;
    background-color: #E4E4E4;
    color: #999999;
    margin-top: 0.89rem;
    padding: .24rem 0;
    text-align: center;
    border-radius: 0.1rem;
    
  }
  .active_btn{
    color: #FFF;
    background-color: #FFAA00;
  }
</style>
