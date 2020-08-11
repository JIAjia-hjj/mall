import {request} from 'network/request'
export function getBannerList(platform, position){
  return request({
    method:'post',
    url:'/v1/banner/list',
    data:{
      platform: platform,
      position:position
    }
  })
}
