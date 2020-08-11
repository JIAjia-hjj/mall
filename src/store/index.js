import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const state={
  phone: '18759191639',
  userInfo: {
    isMarketer: false,
    userId:'',
    businessId:'',
    isUserInfo: false,
    headimgurl:'',
    nickname: '',
  },
  marketerInfo:null,
  openid:'orgme4nZBIT9CqN9HdT3_6LnAb98',
  location:{
    city:'定位中',
    point:{
      lat : '26.083521',
      lng : '119.354286'
    },
    storeName:'',
    storeAddress:''
  }, //城市、和城市的经纬度
  carSearchInfo:null
};

const store=new Vuex.Store({
  state,
  mutations:{
    getPhone(state,payload){
       state.phone=payload.phone
    },
    getBindedData(state,payload){
      state.userInfo=payload
    },
    getMarketerInfo(state,payload){
      state.marketerInfo=payload.marketerInfo;
    },
    getLocation(state,payload){
      state.location=Object.assign({},{...state.location},payload);
    },
    setCarSearchInfo(state,payload){
      if (payload){
        const carSearchInfo={
          key:payload.key,value:payload.value,name:payload.name
        };
        state.carSearchInfo = Object.assign({},state.carSearchInfo, carSearchInfo);
      } else {
        state.carSearchInfo=payload;
      }
    },
  },
  actions:{

  },
  getters:{
    
  },
  modules:{

  }
});
export default store;
