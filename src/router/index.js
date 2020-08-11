import Vue from 'vue';
import VueRouter from 'vue-router';
//1、安装插件
Vue.use(VueRouter);
const Login=()=>import('views/login/Login');
const Home=()=>import('views/home/Home');
const List=()=>import('views/list/List');
const ListBetterScroll=()=>import('views/list/ListBetterScroll');
const Profile=()=>import('views/profile/Profile');
const Carinfo=()=>import('views/carinfo/Carinfo');
const City=()=>import('views/city/City');
const Search=()=>import('views/search/Search');
const MyCode=()=>import('views/mycode/MyCode');
const MyIndex=()=>import('views/myindex/MyIndex');
const Coupon=()=>import('views/coupon/Coupon');
const MyCoupon=()=>import('views/mycoupon/MyCoupon');
const routes=[
  {
    path:'',
    redirect:'/home'
  },
  {
    path:'/login',
    component:Login
  },
  {
    path:'/home',
    component:Home
  },
  {
    path:'/list',
    component:List
  },
  {
    path:'/list-better-scroll',
    component:ListBetterScroll
  },
  {
    path:'/profile',
    component:Profile
  },
  {
    path:'/carinfo/:carid',
    component:Carinfo
  },
  {
    path:'/city',
    component:City
  },
  {
    path:'/search',
    component:Search
  },
  {
    path:'/mycode',
    component:MyCode
  },
  {
    path:'/myindex',
    component:MyIndex
  },
  {
    path:'/coupon',
    component:Coupon
  },
  {
    path:'/mycoupon',
    component:MyCoupon
  },
];
//2、创建路由对象
const router =new VueRouter({
  routes,
  mode:'history'
});

export default router;
