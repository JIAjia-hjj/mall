import {request} from 'network/request'
export function getBannerList(){
  return request({
    method:'post',
    url:'/v1/banner/list',
    data:{
      platform: 3,
      position:12
    }
  })
}
export function getCouponList(phone){
  return request({
    method:'post',
    url:'/v1/coupon/coupon_list',
    data:{
      location: 4,
      mobile: phone
    }
  })
}
export function receiveCoupon(data){
  return request({
    method:'post',
    url:'/pages/list/list',
    data:data
  })
}

export function getCarList(uid){
  return request({
    method:'post',
    url:'/v1/car/marketcars',
    data:{
      uid: uid,
      platform: 2
    }
  })
}
