import {request} from 'network/request'
export function getProblemList(){
  return request({
    method:'post',
    url:'/v1/faq/list',
    data:{
      platform: 2,
      customer_id:''
    }
  })
}
