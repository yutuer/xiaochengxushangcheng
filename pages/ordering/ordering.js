// pages/ordering/ordering.js
const app = getApp()
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
        title: '选择配送地址',
      })
      return
    }

    const allPrice = e.currentTarget.dataset.allprice
    // !!!! 发起支付请求啦
    this.payStart(1)


    // 一旦有新提交的订单, 则修改wx中订单状态的allFinish为false
    let ordersObj = wx.getStorageSync(app.globalData.ordersKey)
    if (ordersObj) {
      ordersObj.allFinish = false
      wx.setStorageSync(app.globalData.ordersKey, ordersObj)
    }
  },

  // 生成订单号
  nonceStr() {
    return Math.random().toString(36).substr(2, 15)
  },

  // 开始支付
  payStart(money) {
    let that = this

    let nonceStr = that.nonceStr()
    console.log("self gen nonceStr:", nonceStr)
    // 小程序代码
    wx.cloud.callFunction({
      name: 'paystart',
      data: {
        money: money,
        nonceStr: nonceStr,
      },
      success: res => {
        const payment = res.result.payment
        console.log("payment:", payment);

        wx.requestPayment({
          ...payment,
          success(res) {
            console.log('pay success', res)
          },
          fail(res) {
            console.error('pay fail', err)
          }
        })
      },
      fail: console.error,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("ordering  onLoad")

    console.log("ordering: ", options)
    let orderDetail = JSON.parse(options.orderDetail)

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
    this.setData({
      address: addressCache.address[chooseIndex]
    })
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