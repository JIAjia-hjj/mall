<template>
  <div>
    <tab-bar>
      <tab-bar-item path="/home" activeColor="red">
        <!--dom中起别名，要加'~'符号-->
        <img slot="item-icon" src="~assets/img/tabbar/home.svg" alt="">
        <img slot="item-icon-active" src="~assets/img/tabbar/home_active.svg" alt="">
        <div slot="item-text">首页</div>
      </tab-bar-item>
      <tab-bar-item path="/list"  activeColor="red">
        <img slot="item-icon" src="~assets/img/tabbar/list.svg" alt="">
        <img slot="item-icon-active" src="~assets/img/tabbar/list_active.svg" alt="">
        <div slot="item-text">列表</div>
      </tab-bar-item>
      <tab-bar-item path="/profile" >
        <img slot="item-icon" src="~assets/img/tabbar/profile.svg" alt="">
        <img slot="item-icon-active" src="~assets/img/tabbar/list_active.svg" alt="">
        <div slot="item-text">我的</div>
      </tab-bar-item>
    </tab-bar>
  </div>

</template>

<script>
  import TabBar from 'components/common/tabbar/TabBar';
  import TabBarItem from 'components/common/tabbar/TabBarItem';
  export default {
    name: "MainTabBar",
    components:{
      TabBar,
      TabBarItem
    }
  }
</script>

<style scoped>

</style>
