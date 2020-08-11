<template>
  <div>
  
    <div class="coupon_item" v-for="(item,index) in specialCoupons" :key="item.id">
      <couponItem :couponItem="item">
        <img slot="couponbg" style="width:7.36rem"  :src="'https://sprogram.xxfgo.com/images/appserve/coupon/coupon_bg'+item.receive+'.png'" />
        <div slot="receive" class="receive_btn"  @click="receiveCoupon(item)">
          {{item.receive==0?'马上领取':'去使用'}}
        </div>
      </couponItem>
    </div>
    <div class="coupon_item" v-for="(item,index) in generalCoupons" :key="item.id">
      <couponItem :couponItem="item">
        <img slot="couponbg" style="width:7.36rem"  :src="'https://sprogram.xxfgo.com/images/appserve/coupon/coupon_bg'+item.receive+'.png'" />
        <div slot="receive" class="receive_btn"  @click="receiveCoupon(item)">
          {{item.receive==0?'马上领取':'去使用'}}
        </div>
      </couponItem>
      
    </div>
    <bottom-tip v-show="generalCoupons.length!=0&&specialCoupons.length!=0"></bottom-tip>
    <!-- 券的规则 -->
    <coupon-rule v-if="isShowCouponRule" :couponItem="nowCouponClickItem" @closeFrame="closeFrame"></coupon-rule>
  </div>
</template>

<script>
  import {formatTimeTwo} from 'common/utils'
  import {getCouponList,receiveCoupon} from  'network/myindex.js'
  
  import CouponItem from 'components/content/couponItem/CouponItem'
  import CouponRule from 'components/content/couponItem/CouponRule'
  import BottomTip from 'components/content/bottomTip/BottomTip'
  
  export default {
    name: "Coupon",
    components:{
      CouponItem,
      CouponRule,
      BottomTip,
     
    },
    data(){
      return{
        generalCoupons:[],
        specialCoupons:[],
        isNoCoupon:false,
        isShowCouponRule:false,
        nowCouponClickItem:{},
        
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
      receiveCoupon(item){
        item.type=this.couponType;
        this.$emit('receiveCoupon',item)
      },
      showCouponRule(item){
        this.nowCouponClickItem=item;
        this.isShowCouponRule=true;
      },
      closeFrame(){
        this.isShowCouponRule=true;
      }
    },
    created() {
      this.getCouponList();
    }
  }
</script>

<style scoped>

</style>
