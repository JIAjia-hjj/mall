import {request} from 'network/request'
//获取验证码
export function getCode(mobile){
  return request({
    method:'post',
    url:'/v1/auth/sms',
    data:{
      type: 2,
      mobile:mobile,
    }
  })
}
//验证验证码
export function verifyCode(phone,code){
  return request({
    method:'post',
    url:'/v1/auth/code',
    data:{
      type: 2,
      mobile: phone,
      code: code
    }
  })
}
export function login(phone) {
  return request({
    method:'post',
    url:'/v1/user/sprogrambind',
    data:{
      platform: 2,
      customer_id:'',
      unionId:'orgme4nZBIT9CqN9HdT3_6LnAb98',
      mobile: phone,
      address: '',
      headimgurl:'',
      nickname:'',
    }
  })
}
export function getBindedData() {
  return request({
    method:'post',
    url:'/v1/user/unauthorizeduser',
    data:{
      unionid:'',
      openid:'orgme4nZBIT9CqN9HdT3_6LnAb98',
    }
  })
}


export function getMarketerInfo(uid) {
  return request({
    method:'post',
    url:'/v1/user/customerinfo',
    data:{
      uid:uid
    }
  })
}
