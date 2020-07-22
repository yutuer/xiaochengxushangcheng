// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  evn: 'xiaochi-rlwg9'
})

// 云函数入口函数
exports.main = async (event, context) => {
  // const wxContext = cloud.getWXContext()

  // const appId = appid = wxContext.APPID
  // const openid = wxContext.OPENID

  // const nonce_str = Math.random().toString(36).substr(2, 15)
  // const timeStamp = parseInt(Date.now() / 1000) + ''
  // const out_trade_no = 'yut' + nonce_str + timeStamp

  // let money = 1

  const res = await cloud.cloudPay.unifiedOrder({
    "body": "帅狗生鲜-配送中心",
    "outTradeNo": "12CCA52501201407033233368018",
    "spbillCreateIp": "127.0.0.1",
    "subMchId": "1600985746",
    "totalFee": 1,
    "envId": "xiaochi-rlwg9",
    "functionName": "pay_callback",
  })
  return res
}