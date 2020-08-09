// pages/ordering/ordering.js
const app = getApp()
let util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderDetail: {},
    address: {},
    chooseAddrIndex: -1,
  },

  // 修改地址
  changeAddrTap(e) {
    // 需要看看选择的是在第几个索引
    const chooseAddrIndex = this.data.chooseAddrIndex
    wx.navigateTo({
      url: '/pages/address/addressList/addressList?choose=' + chooseAddrIndex,
    })
  },

  // 提交订单
  confirm(e) {
    // 判断地址有没有选择
    if (this.data.chooseAddrIndex == -1) {
      wx.showToast({
        title: '没有选择配送地址!',
      })
      return
    }

    //确定没有未完成的订单
    

    // !!!! 发起支付请求啦
    this.payStart(1)
  },

  // 生成订单号
  nonceStr() {
    return Math.random().toString(36).substr(2, 15)
  },

  genOrderNo() {
    return "" + util.uuid(32, 32)
  },

  getTimeDesc(timestamp) {
    var date = new Date(timestamp)
    //年  
    var Y = date.getFullYear()
    //月  
    var M = this.getLessTenShow(date.getMonth() + 1)
    //日  
    var D = this.getLessTenShow(date.getDate())
    //时  
    var h = this.getLessTenShow(date.getHours())
    //分  
    var m = this.getLessTenShow(date.getMinutes())
    return Y + "-" + M + "-" + D + " " + h + ":" + m
  },

  getLessTenShow(v) {
    let ret = v < 10 ? '0' + v : '' + v
    return ret
  },

  // 插入订单到数据库
  insertPaymentToDB(address, cargos, payment, allPrice, youhuiquan) {
    let phoneNum = wx.getStorageSync(app.globalData.userKey)
    const timestamp = Date.parse(new Date())
    const timeDesc = this.getTimeDesc(timestamp)

    let orderObj = {
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
    }

    // 存库
    wx.cloud.callFunction({
      name: 'addOneData',
      data: {
        dbName: 'orders',
        dataObj: orderObj
      },
      success: res => console.log(res),
      fail: err => console.err(err),
    })
  },

  // 更新订单缓存
  updateCache() {
    // 一旦有新提交的订单, 则修改wx中订单状态的allFinish为false
    let ordersObj = wx.getStorageSync(app.globalData.ordersKey)
    if (ordersObj) {
      ordersObj.isAllFinish = false
      wx.setStorageSync(app.globalData.ordersKey, ordersObj)
    }
  },

  // 开始支付
  payStart(money) {
    let that = this
    const allPrice = this.data.orderDetail.allPrice
    const cargos = this.data.orderDetail.cargos
    const youhuiquan = this.data.youhuiquan

    let address = that.data.address
    // 订单号
    let orderNo = that.genOrderNo()

    // let nonceStr = that.nonceStr()

    let dataSend = {
      money: money,
      // nonceStr: nonceStr,
      order: orderNo,
    }
    console.log("dataSend:", dataSend)
    // 小程序代码
    wx.cloud.callFunction({
      name: 'paystart',
      data: {
        ...dataSend
      },
      success: res => {
        const payment = res.result.payment
        console.log("payment:", payment);

        // 插入数据库
        that.insertPaymentToDB(address, cargos, payment, allPrice, youhuiquan)
        // 缓存设置为无效
        that.updateCache()
        // 轮询处理支付
        util.payForPayment(payment)
      },
      fail: console.error,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("ordering  onLoad")
    let orderDetail = JSON.parse(decodeURIComponent(options.orderDetail))

    this.setData({
      orderDetail: orderDetail
    })

    // 从缓存中读出默认地址
    const addressCache = wx.getStorageSync(app.globalData.addressKey)
    console.log(addressCache)

    if (addressCache.defaultIndex >= 0) {
      this.setData({
        chooseAddrIndex: addressCache.defaultIndex,
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
    console.log("ordering  onShow")
    let chooseIndex = this.data.chooseAddrIndex
    // 从缓存中读出默认地址
    const addressCache = wx.getStorageSync(app.globalData.addressKey)
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
    console.log("ordering  onHide")
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log("ordering  onUnLoad")
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