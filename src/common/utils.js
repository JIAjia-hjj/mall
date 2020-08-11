// 日期转时间戳
export function formatTime(date) {
  var date = new Date(date);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

export function formatNumber(n) {
  n = n.toString();
  return n[1] ? n : '0' + n
}

/**
 * 时间戳转化为年 月 日 时 分 秒
 * number: 传入时间戳
 * format：返回格式，支持自定义，但参数必须与formateArr里保持一致
 */
export function formatTimeTwo(number, format) {

  var formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
  var returnArr = [];

  var date = new Date(number * 1000);
  returnArr.push(date.getFullYear());
  returnArr.push(formatNumber(date.getMonth() + 1));
  returnArr.push(formatNumber(date.getDate()));

  returnArr.push(formatNumber(date.getHours()));
  returnArr.push(formatNumber(date.getMinutes()));
  returnArr.push(formatNumber(date.getSeconds()));

  for (var i in returnArr) {
    format = format.replace(formateArr[i], returnArr[i]);
  }
  return format;
}

function compare (data, propertyName, tp){
  if ((typeof data[0][propertyName]) != "number") {
    return function (object1, object2) {
      var value1 = object1[propertyName];
      var value2 = object2[propertyName];
      return tp = 1 ? value1.localeCompare(value2) : value2.localeCompare(value1);
    }
  }
  else {
    return (object1, object2) => { // 属性值为数字
      var value1 = object1[propertyName];
      var value2 = object2[propertyName];
      return tp = 1 ? value1 - value2 : value2 - value1;
    }
  }
}

//防抖动
export function debounce(func,delay){
  let timer=null;

  return function(...args){//...args接收多个参数   这个是个闭包，怼外层的东西有个引用，所以timer没有被销毁
    if(timer) clearTimeout(timer);//有进来下一次的时候，将进来要做事情的timer清除掉

    timer=setTimeout(()=>{//在这个时间没有将这个写的timer取消掉，进来就执行
      func.apply(this,args)
    },delay)
  }
}



// module.exports = {
//   formatTime: formatTime,// 日期转时间戳
//   formatTimeTwo: formatTimeTwo,// 时间戳转日期
//   compare
//
// }
