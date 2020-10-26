// pages/orderDetail/orderDetail.js
let util = require('../../utils/util.js')
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        order: {},
    },

    payOrder() {
        let order = this.data.order
        if (order && order.status == app.globalData.orderStatus.waitForPay.status) {
            let payment = order.payment
            let youhuiquan = order.youhuiquan
            console.log("payment:", payment)
            util.payForPayment(order.outTradeNo, payment, youhuiquan)
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // str转化回对象
        let order = JSON.parse(decodeURIComponent(options.order))
        console.log("deseriable order:", order)

        this.setData({
            order: order
        })
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

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

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