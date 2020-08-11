import {request} from 'network/request'
export function getMyCouponList(userId, phone){
  return request({
    method:'post',
    url: "/v1/coupon/my_coupon",
    data:{
      user_id: userId,
      mobile: phone
    }
  })
}
