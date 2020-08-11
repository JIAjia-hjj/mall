module.exports={
  configureWebpack:{
    resolve:{
       alias:{
         'assets':'@/assets',
         'common':'@/common',
         'components':'@/components',
         'network':'@/network',
         'views':'@/views',
       }

    },

  },
  // devServer: {
  //   host: '10.0.16.62', // ip
  //   port: 8081, // 设置端口号
  //   https: false, // https:{type:Boolean}
  //   open: false, //配置自动启动浏览器
  //   proxy:null  //设置代理
  // }
};
