<template>
  <div>
    <nav-bar class="home_nav">
      <div slot="center">我的优惠券</div>
      <div slot="right"></div>
    </nav-bar>
    <tab-control  class="tab_control" :tabs="['可使用','已失效']"  @tabClick="tabClick"></tab-control>
    <div v-show="tabActive==0">
      <div  class="coupon_used coupon_list">
        <!-- 可使用优惠劵 -->
        <div class="coupon_item" v-for="(item,index) in listUnused" :key="item.id">
          <couponItem :couponItem="item.coupon">
            <img slot="couponbg" style="width:7.36rem"  src="https://sprogram.xxfgo.com/images/appserve/coupon/coupon_bg0.png" />
            <div slot="receive" class="receive_btn"  @click="jumpPage(item)">
              去使用
            </div>
          </couponItem>
        </div>
      </div>
      <bottom-tip v-show="listUnused.length!=0"></bottom-tip>
      <none-coupon v-if="isUnusedNone"></none-coupon>
    </div>
    <div v-show="tabActive==1">
      <div  class="coupon_unused coupon_list">
        <!--已使用的优惠劵-->
        <div class="coupon_item" v-for="(item,index) in listUsed" :key="item.id">
          <couponItem :couponItem="item.coupon">
            <img slot="couponbg" style="width:7.36rem"  src="https://sprogram.xxfgo.com/images/appserve/coupon/coupon_used.png" />
          </couponItem>
        </div>
        <!-- 过期的优惠劵 -->
        <div class="coupon_item" v-for="(item,index) in listOverdue" :key="item.id">
          <couponItem :couponItem="item.coupon">
            <img slot="couponbg" style="width:7.36rem"  src="https://sprogram.xxfgo.com/images/appserve/coupon/coupon_overdue.png" />
          </couponItem>
        </div>
      </div>
      <bottom-tip v-show="listUsed.length!=0||listOverdue.length!=0"></bottom-tip>
      <none-coupon v-if="isNousedNone" ></none-coupon>
    </div>
  </div>
</template>

<script>
  import {formatTimeTwo} from 'common/utils'
  import {getMyCouponList} from 'network/mycoupon'
  import NavBar from 'components/common/navbar/NavBar'
  import BottomTip from 'components/content/bottomTip/BottomTip'
  import TabControl from 'components/common/tabControl/TabControl'
  import CouponItem from 'components/content/couponItem/CouponItem'
  import NoneCoupon from './childComps/NoneCoupon'
  export default {
    name: "MyCoupon",
    components:{
      NavBar,
      BottomTip,
      TabControl,
      CouponItem,
      NoneCoupon,
      
    },
    data(){
      return{
        tabActive:0,
        listUnused: [],//未过期未使用
        listUsed: [],//已使用
        listOverdue: [],//已过期,
        isUnusedNone:false,
        isNousedNone:false,
        
      }
    },
    methods:{
      tabClick(tabActive){
       this.tabActive=tabActive;
      },
      getMyCouponList(){
        const phone = this.$store.state.phone;
        const uesrId= this.$store.state.userInfo.uesrId;
        getMyCouponList(uesrId,phone).then(res=>{
          if (res.code != 200) {
            console.log(res.data.msg);
            return;
          }
          //可使用
          if (res.data.coupons.unused !=undefined){
            res.data.coupons.unused.forEach(function (item, index) {
              item.coupon.timeDetail=formatTimeTwo(item.coupon.startTime, 'Y.M.D')+'-'+formatTimeTwo(item.coupon.endTime, 'Y.M.D')
              item.coupon.create_time =formatTimeTwo(item.coupon.create_time, 'Y.M.D');
              item.coupon.updata_time =formatTimeTwo(item.coupon.updata_time, 'Y.M.D');
              item.coupon.carJsonList=item.carJsonListPro
            });
            this.listUnused=res.data.coupons.unused;
          }
          //已使用
          if (res.data.coupons.used != undefined){
            res.data.coupons.used.forEach(function (item, index) {
              item.coupon.timeDetail=time.formatTimeTwo(item.coupon.startTime, 'Y.M.D')+'-'+formatTimeTwo(item.coupon.endTime, 'Y.M.D');
              item.coupon.create_time =formatTimeTwo(item.coupon.create_time, 'Y.M.D');
              item.coupon.updata_time =formatTimeTwo(item.coupon.updata_time, 'Y.M.D');
              item.coupon.carJsonList=item.carJsonListPro
            });
            this.listUsed=res.data.coupons.used;
          }
          //已过期
          if (res.data.coupons.overdue != undefined){
            res.data.coupons.overdue.forEach(function (item, index) {
              item.coupon.timeDetail=formatTimeTwo(item.coupon.startTime, 'Y.M.D')+'-'+formatTimeTwo(item.coupon.endTime, 'Y.M.D');
              item.coupon.create_time =formatTimeTwo(item.coupon.create_time, 'Y.M.D');
              item.coupon.updata_time =formatTimeTwo(item.coupon.updata_time, 'Y.M.D');
              item.coupon.carJsonList=item.carJsonListPro
            });
            this.listOverdue=res.data.coupons.overdue;
          }
          
          if(this.listUnused.length==0){
            this.isUnusedNone=true
          }
          if(this.listOverdue.length==0&&this.listUsed.length==0){
            this.isNousedNone=true
          }
        }).catch(err=>{
          console.log(err)
        })
      },
      jumpPage(couponItem){
        const type=couponItem.type;
        if(type=='general'){
          this.$router.push('/list');
        }else if(type=='special'){
          console.log(couponItem);
          console.log(couponItem.carJsonList);
          const carid=couponItem.carJsonList.car_id;

          this.$router.push('/carinfo/'+carid);
        }
      }
    },
    created() {
      this.getMyCouponList()
    }
  }
</script>

<style scoped>

</style>
