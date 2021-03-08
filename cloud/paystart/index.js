// 云函数入口文件
const cloud = require('wx-server-sdk');
cloud.init({
    evn: cloud.DYNAMIC_CURRENT_ENV
});

// 云函数入口函数
exports.main = async (event, context) => {
    // 生成一个预付的订单
    const res = await cloud.cloudPay.unifiedOrder({
        "body": "帅狗生鲜-配送中心",
        "outTradeNo": event.order,
        "spbillCreateIp": "127.0.0.1",
        "subMchId": "1600985746",
        "totalFee": parseInt(event.money),
        "envId": "xiaochi-rlwg9",
        "functionName": "payCallback",
        "tradeType": "JSAPI",
        "nonceStr":event.nonceStr,
    });
    return res
};