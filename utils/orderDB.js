import {
    DB
} from 'db.js';

import {
    OrderCache
} from "orderCache.js";

let orderCache = new OrderCache();

import {
    CargoDB
} from "./cargoDB";

let cargoDB = new CargoDB();

const util = require("./util.js");

let app = getApp();

class OrderDB extends DB {
    // 加载订单
    loadOrders(page) {
        const phoneNum = wx.getStorageSync(app.globalData.userKey);
        if (!phoneNum) {
            // 当前没有userKey的话就返回(没有主键查什么)
            return
        }

        const suc = (res) => {
            console.log("func: loadOrders, res:", res);

            const now = Date.parse(new Date());
            if (res.errMsg == 'cloud.callFunction:ok') {
                let orders = res.result.data;
                let orderStatus = app.globalData.orderStatus;

                for (let i = 0; i < orders.length; i++) {
                    let order = orders[i];

                    if (order.status == orderStatus.waitForPay.status) {
                        // 如果15分钟还是未支付, 则更新为已完成
                        let time = order.time;
                        if (time + 15 * 60 * 1000 < now) {
                            order.status = orderStatus.expire.status;
                            this.updateOrderPayExpire(order.outTradeNo);

                            // 加回物品库存
                            cargoDB.addCargoUseCount(order.cargos);
                        }
                    }

                    if (order.status == orderStatus.waitForPay.status) {
                        order.statusDesc = orderStatus.waitForPay.name
                    } else if (order.status == orderStatus.hasPay.status) {
                        order.statusDesc = orderStatus.hasPay.name
                    } else if (order.status == orderStatus.finish.status) {
                        order.statusDesc = orderStatus.finish.name
                    } else if (order.status == orderStatus.expire.status) {
                        order.statusDesc = orderStatus.expire.name
                    } else if (order.status == orderStatus.cancel.status) {
                        order.statusDesc = orderStatus.cancel.name
                    }
                }

                // 遍历下看看是否全部完成
                let finish = true;
                let waiforPay = false;
                for (let i = 0; i < orders.length; i++) {
                    let order = orders[i];
                    if (order.status < app.globalData.orderStatus.finish.status) {
                        // 还有未完成的
                        finish = false;
                        if (order.status == app.globalData.orderStatus.waitForPay.status) {
                            // 还有未支付的
                            waiforPay = true;
                            break;
                        }
                    }
                }

                if (page) {
                    page.setData({
                        orders: orders,
                    })
                }

                // 设置到缓存中
                const ordersCache = {
                    isAllFinish: finish,
                    waitforPay: waiforPay,
                    orders: orders,
                };
                // 加入缓存
                orderCache.saveOrdersToCache(ordersCache)
            }
        };

        const fail = (err) => console.error(err);

        let data = {
            dbName: 'orders',
            cond: {
                phoneNum: phoneNum
            }
        };

        this.callFunctionFromCloudyByCond('queryAllData', data, suc, fail)
    }

    updateOrderPayFinish(outTradeNo) {
        this.updateOrderPayStatus(outTradeNo, app.globalData.orderStatus.finish.status)
    }

    updateOrderPayCancel(outTradeNo) {
        this.updateOrderPayStatus(outTradeNo, app.globalData.orderStatus.cancel.status)
    }

    updateOrderPayExpire(outTradeNo) {
        this.updateOrderPayStatus(outTradeNo, app.globalData.orderStatus.expire.status)
    }

    // 更新订单支付成功
    updateOrderPaySuccess(outTradeNo) {
        const now = Date.parse(new Date());
        const timeDesc = util.getTimeDesc(now);

        this.updateOrderPayStatus(outTradeNo, app.globalData.orderStatus.hasPay.status, timeDesc)
    }

    // 跳转到订单页面
    jumpToOrders(sucFun) {
        wx.redirectTo({
            url: '/pages/orders/orders',
            success: function (res) {
                wx.reLaunch({
                    url: '/pages/orders/orders',
                });

                if (sucFun) {
                    sucFun(res)
                }
            },
        })
    }

    // 更新订单支付成功
    updateOrderPayStatus(outTradeNo, status, payTime) {
        let phoneNum = wx.getStorageSync(app.globalData.userKey);
        let data = {
            dbName: 'orders',
            cond: {
                phoneNum: phoneNum,
                outTradeNo: outTradeNo,
            },
            dataObj: {
                status: status,
                payTime: payTime,
            },
        };

        let sucFunc = (res) => console.log("func:updateOrderPayStatus, res:", res);
        let failFunc = (err) => console.error(err);

        this.callFunctionFromCloudyByCond('updateWhereData', data, sucFunc, failFunc);
    }
}


export {
    OrderDB
}