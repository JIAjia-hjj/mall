import {request} from 'network/request'
export function getCarInfo(carid) {
  return  request({
    method:'post',
    url:'/v1/car/detail',
    data: {
      car_id:carid
    },
  })
}

export function getRecommendList(carid) {
  return  request({
    method:'post',
    url:'/v1/car/similar',
    data: {
      car_id:carid,
      is_tui: 1
    },
  })
}


export function getBannerList(carid) {
  return request({
    url:'/v1/banner/list',
    params:{
      platform: 3,
      position: 9,
      car_id:carid
    }
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
