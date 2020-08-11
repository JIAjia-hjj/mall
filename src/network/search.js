import {request} from 'network/request'
export function getHotSearch(){
  return request({
    method:'post',
    url:'/v1/hotkeyword/list',
  })
}
export function getHistorySearch(){
  return request({
    method:'post',
    url:'/v1/car/history',
  })
}
