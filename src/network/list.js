import {request} from 'network/request'

export function getCarList(data) {
  return request({
    method:'post',
    url:'/v1/car/search',
    data:data
  })
}
export function getBrandList() {
  return request({
    url:'/v1/carbrand/list',
    params:{
      brand_id: 0
    }
  })
}
export function getCarTypeList() {
  return request({
    url:'/v1/carlevel/list',
  })
}
export function getBannerList() {
  return request({
    url:'/v1/banner/list',
    params:{
      platform: 3,
      position: 5
    }
  })
}
