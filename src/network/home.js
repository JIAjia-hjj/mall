
import {request} from 'network/request'
export function getHomeBannerData() {
  return  request({
    url:'/v1/banner/list',
    params: {
      platform: 3,
      position: 8
    },
  })
}

export function getCarBrandList() {
  return  request({
    method:'post',
    url:'/v1/carbrand/list',
    data: {
      brand_id: 0
    }
  })
}


// 获取车列表
export function getCarList(purposeId) {
  return request({
    url: "/v1/car/search",
    params:{
      'purpose_id': purposeId
    }
  })
}
