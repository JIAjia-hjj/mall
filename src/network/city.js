import {request} from 'network/request'
//获取城市列表
export function getAllCity() {
  return  request({
    url:'/v1/area/citylist',
    params: {
      brand_id: 0
    },
  })
}
//热门城市列表
export function getHotCityList() {
  return  request({
    url:'/v1/store/list',
    params: {
   
    },
  })
}

export function getStoreInfo(point) {
  return request({
    method:'post',
    url:"/v1/store/caldistance", //门店
    data:{
      dimension: point.lng,
      accuracy:point.lat
    }
  })
}

