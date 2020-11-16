const util = require("../../utils/util");

import {
    Pay
} from '../../utils/pay.js'

let pay = new Pay();
// pages/orders/orders.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        orders: [],
        chooseStatus: 0,
    },

    // 显示订单详情
    showOrderDetail(e) {
        let index = e.currentTarget.dataset.index;
        let order = this.data.orders[index];

        // 牛皮, 序列化
        let orderStr = encodeURIComponent(JSON.stringify(order))
        // wx.navigateTo({
        //   url: '../orderDetail/orderDetail?orderDetail=' + orderStr,
        // })
    },

    showByStatus(e) {
        let choosestatus = e.currentTarget.dataset.choosestatus;
        this.setChooseStatus(choosestatus)
    },

    setChooseStatus(choosestatus) {
        this.setData({
            chooseStatus: choosestatus
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log("orders onLoad:", options);
        let choosestatus = options.chooseStatus;
        this.setChooseStatus(choosestatus);

        this.loadOrders()
    },

    // 移动到utils中
    // 从库中加载所有的订单
    // 1. 先从wx缓存拿, 如果发现wx缓存里没有, 或者说需要获取全部数据(这种情况是用户发起了新订单, 或者有订单没有完成), 就从数据库中取
    // 获取到后先检查下. 如果全部完成, 则下次从缓存拿
    // 2. 否则使用缓存数据.
    loadOrders() {
        let that = this;

        let ordersObj = wx.getStorageSync(app.globalData.ordersKey);
        // if (ordersObj && ordersObj.isAllFinish) {
        if (false) {
            // 从缓存中拿
            this.setData({
                orders: ordersObj.orders
            })
        } else {
            util.loadOrdersFromDB(this)

            // const phoneNum = wx.getStorageSync(app.globalData.userKey)
            // const now = Date.parse(new Date())
            // wx.cloud.callFunction({
            //     name: 'queryAllData',
            //     data: {
            //         dbName: 'orders',
            //         cond: {
            //             phoneNum: phoneNum
            //         }
            //     },
            //     success(res) {
            //         console.log(res)
            //         if (res.errMsg == 'cloud.callFunction:ok') {
            //             const orders = res.result.data
            //             let orderStatus = app.globalData.orderStatus
            //
            //             for (let i = 0; i < orders.length; i++) {
            //                 let order = orders[i]
            //
            //                 // 如果15分钟还是未支付, 则更新为已完成
            //                 let time = order.time
            //                 if (time + 15 * 60 * 1000 < now) {
            //                     if (order.status == orderStatus.waitForPay.status) {
            //                         order.status = orderStatus.expire.status
            //                         util.updateOrderPayExpire(order.payInfo._package)
            //                     }
            //                 }
            //
            //                 if (order.status == orderStatus.waitForPay.status) {
            //                     order.statusDesc = orderStatus.waitForPay.name
            //                 } else if (order.status == orderStatus.hasPay.status) {
            //                     order.statusDesc = orderStatus.hasPay.name
            //                 } else if (order.status == orderStatus.finish.status) {
            //                     order.statusDesc = orderStatus.finish.name
            //                 } else if (order.status == orderStatus.expire.status) {
            //                     order.statusDesc = orderStatus.expire.name
            //                 }
            //             }
            //
            //             // 所有订单
            //             that.setData({
            //                 orders: orders,
            //             })
            //
            //             // 遍历下看看是否全部完成
            //             let finish = true
            //             let waiforPay = false
            //             for (let i = 0; i < orders.length; i++) {
            //                 let order = orders[i]
            //                 if (order.status < app.globalData.orderStatus.finish.status) {
            //                     // 还有未完成的
            //                     finish = false
            //                     if (order.status == app.globalData.orderStatus.waitForPay.status) {
            //                         // 还有未完成的
            //                         waiforPay = true
            //                     }
            //                 }
            //             }
            //
            //             // 设置到缓存中
            //             const ordersCache = {
            //                 isAllFinish: finish,
            //                 waitforPay: waiforPay,
            //                 orders: orders
            //             }
            //             // 加入缓存
            //             wx.setStorageSync(app.globalData.ordersKey, ordersCache)
            //         }
            //     },
            //     fail: console.error
            // })
        }
    },

    tapOneOrder(e) {
        let order = e.currentTarget.dataset.order;
        console.log("order :", order);

        if (order.status > 1) {
            this.viewOrderDetail(e)
        } else {
            this.countNumTap(e)
        }
    },

    viewOrderDetail(e) {
        let order = e.currentTarget.dataset.order;

        let s = encodeURIComponent(JSON.stringify(order));
        wx.navigateTo({
            url: `/pages/orderDetail/orderDetail?order=${s}`,
        })
    },

    countNumTap(e) {
        let order = e.currentTarget.dataset.order;

        console.log("order :", order);

        const allPrice = order.allPrice;
        const chooseCargos = order.cargos;
        const youhuiquan = order.youhuiquan;

        pay.countNumTap(allPrice, chooseCargos, youhuiquan, order)
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        console.log("orders onShow")
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
        console.log("orders onHide")
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
        console.log("orders onUnload")
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})