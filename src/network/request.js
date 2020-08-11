import axios from 'axios'

import Qs from 'qs'
export function request(config) {
  //创建axios实例
  const instance=axios.create({
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    baseURL:'http://10.0.16.62',
    timeout:50000,
    transformRequest: [function (data) {
      data = Qs.stringify(data);
      return data;
    }],
  });
  //请求拦截
  instance.interceptors.request.use(config=>{


    return config;
  },err=>{
    console.log(err);
  });
  //响应拦截
  instance.interceptors.response.use(res=>{
    return res.data
  },error => {
    console.log(err);
  });

  return instance(config)
}
