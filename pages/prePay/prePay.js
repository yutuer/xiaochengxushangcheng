// pages/prePay/prePay.js

const app = getApp();
let util = require('../../utils/util.js');
let verify = require('../../utils/verify.js');

import {YouhuiquanCache} from "../../utils/youhuiquanCache";

let youhuiquanCache = new YouhuiquanCache();

import {YouhuiquanDB} from "../../utils/youhuiquanDB";

const youhuiquanDB = new YouhuiquanDB();

import {CargoCache} from "../../utils/cargoCache";

const cargoCache = new CargoCache();

import {CargoDB} from "../../utils/cargoDB";

const cargoDB = new CargoDB();

import {OrderCache} from "../../utils/orderCache";

const orderCache = new OrderCache();

import {
    OrderDB
} from "../../utils/orderDB";

const orderDB = new OrderDB();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        orderDetail: {},
        address: {},
        chooseAddrIndex: -1,
        defaultIndex: -1,
    },

    // 修改地址
    changeAddrTap(e) {
        // 需要看看选择的是在第几个索引
        const chooseAddrIndex = this.data.chooseAddrIndex;
        wx.navigateTo({
            url: `/pages/address/addressList/addressList?choose=${chooseAddrIndex}`,
        })
    },

    // 提交订单
    confirmOrder(e) {
        // 判断地址有没有选择
        if (this.data.chooseAddrIndex == -1) {
            wx.showToast({
                title: '没有选择配送地址!',
            });
            return
        }

        // 确定没有未完成的订单, 如果有未付款的订单, 则不让下单
        orderDB.loadOrders();

        let ordersCacheObj = orderCache.getOrdersFromCache();
        if (ordersCacheObj) {
            if (ordersCacheObj.waitforPay) {
                verify.showToast('还有未支付的订单,请先处理!');
                return;
            }
        }

        // 先查询db -> 更新缓存 -> 校验缓存库存 -》 发起订单 -》 数据库减去库存
        youhuiquanDB.loadYouhuiquan();

        let youhuiquan = this.data.orderDetail.youhuiquan;
        if (youhuiquan) {
            let id = youhuiquan._id;
            let enoughInCache = youhuiquanCache.isEnoughInCache(id);
            if (!enoughInCache) {
                verify.showToast("优惠券没有使用次数!");
                return
            }
        }

        // 检查库存
        cargoDB.loadCargos();

        const cargos = this.data.orderDetail.cargos;
        let checkKucun = cargoCache.checkKucun(cargos);
        if (checkKucun && !checkKucun.result) {
            verify.showToast(checkKucun.errMsg);
            return
        }

        // !!!! 发起支付请求啦
        this.payStart()
    },

    // 二次确认取消订单
    preCancelOrder(e) {
        let that = this;
        wx.showModal({
            content: '确认要取消订单?',
            success(res) {
                if (res.confirm) {
                    that.cancelOrder(e);
                }
            },
        })
    },

    cancelOrder(e) {
        let order = this.data.orderDetail.order;
        wx.cloud.callFunction({
            name: 'payCancel',
            data: {
                order: order.outTradeNo,
            },
            success: res => {
                console.log(res);

                orderDB.updateOrderPayCancel(order.outTradeNo);

                // 加回物品库存
                cargoDB.addCargoUseCount(order.cargos);

                // 跳转到订单页面
                orderDB.jumpToOrders(function (res) {
                    verify.showToast("取消订单成功");
                })
            },
            fail: err => {
                console.err(err)
            }
        })
    },

    // 生成订单号
    nonceStr() {
        return Math.random().toString(36).substr(2, 15)
    },

    genOrderNo() {
        return "" + util.uuid(32, 32)
    },

    // 插入订单到数据库
    insertPaymentToDB(orderNo, nonceStr, address, cargos, payment, allPrice, youhuiquan) {
        // 用户id
        let phoneNum = wx.getStorageSync(app.globalData.userKey);
        // 当前时间
        const timestamp = Date.parse(new Date());
        // 当前时间描述
        const timeDesc = util.getTimeDesc(timestamp);

        let orderObj = {
            outTradeNo: orderNo,
            nonceStr: nonceStr,
            phoneNum: phoneNum,
            cargos: cargos,
            address: address,
            payment: payment,
            status: app.globalData.orderStatus.waitForPay.status,
            package: payment.package,
            time: timestamp,
            timeDesc: timeDesc,
            allPrice: allPrice,
            youhuiquan: youhuiquan,
        };

        // 订单存库
        wx.cloud.callFunction({
            name: 'addOneData',
            data: {
                dbName: 'orders',
                dataObj: orderObj
            },
            success: res => {
                //更新缓存

            },
            fail: err => console.err(err),
        })
    },

    // 更新订单缓存
    updateCache() {
        // 一旦有新提交的订单, 则修改wx中订单状态的allFinish为false
        let ordersObj = wx.getStorageSync(app.globalData.ordersKey);
        if (ordersObj) {
            ordersObj.isAllFinish = false;
            wx.setStorageSync(app.globalData.ordersKey, ordersObj)
        }
    },

    // 开始支付
    payStart() {
        let that = this;

        const allPrice = this.data.orderDetail.allPrice;
        const cargos = this.data.orderDetail.cargos;
        const youhuiquan = this.data.orderDetail.youhuiquan;
        let address = that.data.address;

        let order = this.data.orderDetail.order;
        if (order) {
            // 通过订单列表过来的请求

            let orderStatus = app.globalData.orderStatus;
            if (order.status != orderStatus.waitForPay.status) {
                return
            }

            // 有订单, 校验时间
            const now = Date.parse(new Date());
            // 如果15分钟还是未支付, 则更新为已完成
            let time = order.time;
            if (time + 15 * 60 * 1000 < now) {
                order.status = orderStatus.expire.status;

                orderDB.updateOrderPayExpire(order.outTradeNo);

                // 加回物品库存
                cargoDB.addCargoUseCount(cargos);

                orderDB.jumpToOrders(function (res) {
                    verify.showToast("订单支付超时");
                });
                return
            }

            // 订单号
            let orderNo = order.outTradeNo;
            let nonceStr = order.nonceStr;
            let dataSend = {
                money: 1,
                nonceStr: nonceStr,
                order: orderNo,
            };
            console.log("通过订单列表过来的请求:", dataSend);

            // 小程序代码
            wx.cloud.callFunction({
                name: 'paystart',
                data: {
                    ...dataSend
                },
                success: res => {
                    const payment = res.result.payment;
                    console.log("通过订单列表过来的结果 payment:", payment);
                    // 轮询处理支付
                    util.payForPayment(orderNo, payment, youhuiquan)
                },
                fail: err => console.log(err),
            })
        } else {
            // 生成订单, 插入数据库, 更新本地缓存. 并且开始轮询支付结果
            // 订单号
            let orderNo = that.genOrderNo();
            let nonceStr = that.nonceStr();
            let dataSend = {
                money: 1,
                nonceStr: nonceStr,
                order: orderNo,
            };

            console.log("直接支付的请求:", dataSend);

            // 小程序代码
            wx.cloud.callFunction({
                name: 'paystart',
                data: {
                    ...dataSend
                },
                success: res => {
                    const payment = res.result.payment;

                    console.log("直接支付的结果 payment:", payment);

                    // 插入数据库
                    that.insertPaymentToDB(orderNo, nonceStr, address, cargos, payment, allPrice, youhuiquan);
                    // 缓存设置为无效
                    that.updateCache();

                    // 减去物品库存
                    cargoDB.subCargoUseCount(cargos);

                    // 清除掉购物车中所有选择的物品
                    that.removeCargosBuy();

                    // 扣除优惠券使用次数
                    util.subYouhuiquanLeftUseCount(youhuiquan);

                    // 轮询处理支付
                    util.payForPayment(orderNo, payment, youhuiquan)
                },
                fail: console.error,
            })
        }
    },

    // 清除掉购物车中所有select状态的物品
    removeCargosBuy() {
        let cargosCache = wx.getStorageSync(app.globalData.cargosKey);

        for (let i = cargosCache.length - 1; i >= 0; i--) {
            let cargo = cargosCache[i];
            if (cargo.select) {
                cargosCache.splice(i, 1)
            }
        }

        wx.setStorageSync(app.globalData.cargosKey, cargosCache)
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let orderDetail = JSON.parse(decodeURIComponent(options.orderDetail));
        this.setData({
            orderDetail: orderDetail,
        });

        console.log("prePay  onLoad, orderDetail:", orderDetail);

        // 从缓存中读出默认地址
        const addressCache = wx.getStorageSync(app.globalData.addressKey);
        console.log(addressCache);

        if (addressCache.defaultIndex >= 0) {
            this.setData({
                chooseAddrIndex: addressCache.defaultIndex,
                defaultIndex: addressCache.defaultIndex,
            })
        }
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
        console.log("prePay  onShow");
        let chooseIndex = this.data.chooseAddrIndex;
        // 从缓存中读出默认地址
        const addressCache = wx.getStorageSync(app.globalData.addressKey);
        if (addressCache && chooseIndex >= 0) {
            this.setData({
                address: addressCache.address[chooseIndex]
            })
        }
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
        console.log("prePay  onHide")
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
        console.log("prePay  onUnLoad")
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