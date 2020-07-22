// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  evn: 'xiaochi-rlwg9'
})

// 云函数入口函数
exports.main = async (event, context) => {
  let ret = {
    "errcode": 0,
    "errmsg": "",
  }
  return ret
}