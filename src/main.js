import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BaiduMap from 'vue-baidu-map'
Vue.use(BaiduMap, {
  ak: 'Ar2AAn3jt5NoW1b3G1uKyGZOxfikcjbm'
});
import VueAwesomeSwiper from 'vue-awesome-swiper'
/* 样式的话，我这里有用到分页器，就在全局中引入了样式 */
import 'swiper/css/swiper.css'
Vue.use(VueAwesomeSwiper);

import remAndPhoneConfig from 'common/rem'
remAndPhoneConfig();

Vue.config.productionTip = false;



Vue.prototype.$bus=new Vue();//vue实例时可以作为事件总线



new Vue({
  router,
  store,
  render: h => h(App),

}).$mount('#app');
