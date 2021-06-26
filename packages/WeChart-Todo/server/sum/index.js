// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async (event, context) => {
  let lesson = "云开发技术训练营"
  let enname = "CloudBase Camp"
  let x = 3, y = 4, z = 5.001, a = -3, b = -4, c = -5
  let now = new Date()

  return {
    movie: { name: "霸王别姬", img: "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p1910813120.webp", desc: "风华绝代。" },
    movielist:["肖申克的救赎", "霸王别姬", "这个杀手不太冷", "阿甘正传", "美丽人生"],
    charat: lesson.charAt(4),
    concat: enname.concat(lesson),
    uppercase: enname.toUpperCase(),
    abs: Math.abs(b),
    pow: Math.pow(x, y),
    sign: Math.sign(a),
    now: now.toString(),
    fullyear: now.getFullYear(),
    date: now.getDate(),
    day: now.getDay(),
    hours: now.getHours(),
    minutes: now.getMinutes(),
    seconds: now.getSeconds(),
    time: now.getTime()
  }
}