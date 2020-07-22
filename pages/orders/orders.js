// pages/orders/orders.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    orders: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("orders onLoad")

    this.loadOrders()
  },

  // 从库中加载所有的订单
  // 1. 先从wx缓存拿, 如果发现wx缓存里没有, 或者说需要获取全部数据(这种情况是用户发起了新订单, 或者有订单没有完成), 就从数据库中取
  // 获取到后先检查下. 如果全部完成, 则下次从缓存拿
  // 2. 否则使用缓存数据.
  loadOrders() {
    let that = this

    let ordersObj = wx.getStorageSync(app.globalData.ordersKey)
    if (ordersObj && ordersObj.isAllFinish) {
      // 从缓存中拿
      this.setData({
        orders: ordersObj.orders
      })
    } else {
      const loginPhoneNum = wx.getStorageSync(app.globalData.userKey)
      wx.cloud.callFunction({
        name: 'queryAllData',
        data: {
          dbName: 'orders',
          cond: {
            loginPhoneNum: loginPhoneNum
          }
        },
        success(res) {
          console.log(res)
          if (res.errMsg == 'cloud.callFunction:ok') {
            const orders = res.result.data
            that.setData({
              orders: orders
            })
            // 遍历下看看是否全部完成
            let finish = true
            for (let i = 0; i < orders.length; i++) {
              let order = orders[i]
              if (order.status < app.globalData.orderStatus.finish.status) {
                // 还有未完成的
                finish = false
                break
              }
            }

            // 设置到缓存中
            const ordersCache = {
              isAllFinish: finish,
              orders: orders
            }
            // 加入缓存
            wx.setStorageSync(app.globalData.ordersKey, ordersCache)
          }
        },
        fail: console.log
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