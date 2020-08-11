<template>
  <div>
    <div class="coupon" v-if="generalCoupons.length!=0||specialCoupons.length!=0">
      <div class="coupon_main p_re">
        <img  src="https://sprogram.xxfgo.com/images/appserve/coupon/coupon_bg.jpg" style="width:100%"/>
        <router-link class="mycoupon_btn p_ab"  to="/mycoupon"></router-link>
        <main-coupon class="main_coupon" couponType="general"  :carList="generalCoupons" @receiveCoupon="receiveCoupon" v-if="generalCoupons.length!=0"></main-coupon>
        <main-coupon class="main_coupon" couponType="special"  :carList="specialCoupons" @receiveCoupon="receiveCoupon" v-if="generalCoupons.length==0&&specialCoupons.length!=0"></main-coupon>
      </div>
      <!-- 专用券 -->
      <special-coupon class="special_coupon" :specialCoupons="specialCoupons" @receiveCoupon="receiveCoupon" v-if="generalCoupons.length!=0&&specialCoupons.length!=0">
      </special-coupon>
      <bottom-tip v-show="generalCoupons.length!=0&&specialCoupons.length!=0"></bottom-tip>
    </div>
    <none-coupon v-if="isNoCoupon"></none-coupon>
    <tip ref="tip"></tip>
  </div>
</template>

<script>
  import {formatTimeTwo} from 'common/utils'
  import {getCouponList,receiveCoupon} from 'network/coupon'

  import Tip from 'components/common/tip/Tip'
  import BottomTip from 'components/content/bottomTip/BottomTip'
  
  import MainCoupon from './childComps/MainCoupon'
  import SpecialCoupon from './childComps/SpecialCoupon'
  import NoneCoupon from './childComps/NoneCoupon'
  export default {
    name: "Coupon",
    components:{
      Tip,
      BottomTip,
      MainCoupon,
      SpecialCoupon,
      NoneCoupon
    },
    data(){
      return{
        generalCoupons:[],
        specialCoupons:[],
        isNoCoupon:false,
        
      }
    },
    methods:{
      getCouponList(){
        const phone=this.$store.state.phone;
        getCouponList(phone).then((res)=>{
          if(res.data.general!=undefined){
            res.data.general.forEach((item, index) => {
              item.time=formatTimeTwo(item.startTime, 'M.D')+'-'+formatTimeTwo(item.endTime, 'M.D');
              item.timeDetail=formatTimeTwo(item.startTime, 'Y.M.D')+'-'+formatTimeTwo(item.endTime, 'Y.M.D');
              item.description=item.description.replace(/style=".+?"/g, '').replace(/<br\/>/g, '').replace(/span/g, 'p');
            });
            this.generalCoupons=res.data.general;
            // this.generalCoupons=[];
          }
          if(res.data.special!=undefined){
            res.data.special.forEach((item, index) => {
              item.time=formatTimeTwo(item.startTime, 'M.D')+'-'+formatTimeTwo(item.endTime, 'M.D');
              item.timeDetail=formatTimeTwo(item.startTime, 'Y.M.D')+'-'+formatTimeTwo(item.endTime, 'Y.M.D');
              item.description=item.description.replace(/style=".+?"/g, '').replace(/<br\/>/g, '').replace(/span/g, 'p');
            });
            this.specialCoupons=res.data.special;
            // this.specialCoupons=[]
          }
          if(this.specialCoupons.length==0&&this.generalCoupons.length==0){
            this.isNoCoupon=true
          }
        }).catch(err=>{
          console.log(err);
        });
      },
      receiveCoupon(couponItem){
        const receive= couponItem.receive;
        const type= couponItem.type;
        const title=couponItem.title;
        const id=couponItem.id;
        if(receive==1){
          if(type=='general'){
            this.$router.push('/list');
          }else if(type=='special'){
            const carid=couponItem.carJsonList.car_id;
            console.log(couponItem);
            console.log(couponItem.carJsonList);
            this.$router.push('/carinfo/'+carid);
          }
          return;
        }
        const phone=this.$store.state.phone;
        const data={
            id: id,
            mobile: phone,
            channel: 4,
            businessid: this.$store.state.userInfo.businessId,
            address: this.$store.state.location.address,
            headimgurl: this.$store.state.userInfo.headimgurl,
            nickname:this.$store.state.userInfo.nickname,
            channel_id: 2
        };
        receiveCoupon(data).then((res)=>{
          if(res.code==200){
            this.$refs.tip.showTip({
              width: 3,
              height: 1,
              icon:'icon_xiao',
              text: '领取成功',
              paddingTop: 0.25
            });
            this.getCouponList();
          }
          console.log(res);
      
        }).catch(err=>{
          console.log(err);
        });
      }
      
      
    },
    created() {
      this.getCouponList();
    }
  }
</script>

<style scoped>
  .coupon{
    background-color: #FF3E3E;
    min-height: 100%;
  }
  .mycoupon_btn {
     border: 1px solid springgreen;
    width: 1rem;
    height: 1.80rem;
    right: 0;
    top: 2.02rem;
  }
  .main_coupon{
    position: absolute;
    left: .10rem;
    bottom: .32rem;
    width: 7.30rem;
    height: 4.23rem;
 
  }
</style>
