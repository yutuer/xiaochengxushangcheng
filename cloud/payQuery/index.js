// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const res = await cloud.cloudPay.queryOrder({
    "body": "帅狗生鲜-配送中心",
    "outTradeNo": event.outTradeNo,
    "spbillCreateIp": "127.0.0.1",
    "subMchId": "1600985746",
    "envId": "xiaochi-rlwg9",
    "tradeType": "JSAPI",
  })
  return res
}