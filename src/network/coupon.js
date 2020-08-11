import {request} from 'network/request'
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
    url:'/v1/coupon/getcoupon',
    data:data
  })
}
