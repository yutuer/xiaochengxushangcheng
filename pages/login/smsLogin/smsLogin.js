// pages/login/smsLogin/smsLogin.js
let app = getApp()
const verify = require("../../../utils/verify.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    loginPhoneNum: '',
    verifyCode: '',
  },

  // 点击了获取验证码
  yzmClick(e) {
    this.setData({
      verifyCode: e.detail.value
    })
  },

  // 输入手机号
  phoneNumInput(e) {
    this.setData({
      loginPhoneNum: e.detail.value
    })
  },

  // 登录按钮tap
  loginTap() {
    let that = this
    if (app.globalData.isTest) {
      // 验证手机号
      that.checkPhoneNumRight()
    } else {
      // 判断验证码是否填了

      // 验证登录码 异步

      // 验证手机号
    }
  },
  // 验证手机号是否正确
  checkPhoneNumRight() {
    let that = this
    let loginPhoneNum = that.data.loginPhoneNum
    // 直接查询
    wx.cloud.callFunction({
      name: 'queryAllData',
      data: {
        dbName: 'userInfo',
        cond: {
          phoneNum: loginPhoneNum
        },
      },
      success(res) {
        console.log(res)
        if (res.result.data.length > 0) {
          // 存入手机号到缓存
          wx.setStorageSync(app.globalData.userKey, loginPhoneNum)
          // 存入一个空的购物车
          wx.setStorageSync(app.globalData.cargosKey, [])
          
          // 重新加载当前页面
          wx.reLaunch({
            url: '../smsLogin/smsLogin',
          })
        } else {
          // 没有找到用户
          verify.showToast('没有找到用户')
        }
      },
      fail(err) {
        console.log(err)
      }
    })
  },

  // 登出tap
  loginOutTap() {
    let that = this
    // 清空缓存内玩家信息
    wx.clearStorage()
    // 重新加载本页
    wx.reLaunch({
      url: '../smsLogin/smsLogin',
    })
  },

  // 点击了订单管理
  ordersTap() {
    wx.navigateTo({
      url: '../../orders/orders',
    })
  },

  // 点击了地址管理tap
  addressTap() {
    wx.navigateTo({
      url: '../../address/addressList/addressList',
    })
  },

  // 点击了手机快速注册
  phoneRegistClick() {
    wx.navigateTo({
      url: '../phoneRegist/phoneRegist',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("smsLogin onLoad")

    // 本地的userInfo 目前只需要phoneNum
    let loginPhoneNum = wx.getStorageSync(app.globalData.userKey)
    if (loginPhoneNum) {
      this.setData({
        userInfo: {
          loginPhoneNum
        }
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
    console.log("smsLogin onShow")
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log("smsLogin onHide")
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log("smsLogin onUnload")
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