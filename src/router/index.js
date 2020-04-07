import Vue from 'vue';
import VueRouter from 'vue-router';
//1、安装插件
Vue.use(VueRouter);

const Home=()=>import('../views/home/Home');
const List=()=>import('../views/list/List');
const Profile=()=>import('../views/profile/Profile');

const routes=[
  {
    path:'',
    redirect:'/home'
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
    path:'/profile',
    component:Profile
  }
];
//2、创建路由对象
const router =new VueRouter({
  routes,
  mode:'history'
});

export default router;
