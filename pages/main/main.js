// pages/main/main.js
//引入本地数据
let mainDataJs = require('../../utils/data/mainData.js')
const classDataJs = require('../../utils/data/classData.js')
const allDatas = require('../../utils/data/classData.js')
const util = require("../../utils/util.js")
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banner: [], //图片轮播数据
    classData: {}, //分类数据
    itemArrayData: [], //猜你喜欢数据
    allDatas: {},
    allSearchData: [],
    youhuiquan: [],
  },

  // 点击banner
  bannerTap(e) {
    let cargoid = e.currentTarget.dataset.cargoid
    // 调到详情页
    util.navigateToDetail(cargoid)
  },

  // 点击类别
  typeTap(e) {
    console.log(e)
    let type = e.currentTarget.dataset.typeid
    //调到分类页

  },

  // 点击了查看详情
  cargoDetailTap(e) {
    // console.log(e)
    const cargoid = e.currentTarget.dataset.cargoid
    // 跳转详情页
    util.navigateToDetail(cargoid)
  },

  search(e) {
    let va = e.detail.value
    let allDatas = this.data.allDatas
    let result = []
    if (va) {
      // 搜索
      for (let i = 0; i < allDatas.length; i++) {
        let cargo = allDatas[i]
        let title = cargo.title

        if (title.indexOf(va) >= 0) {
          result.push(cargo)
        }
      }
    }

    this.setData({
      allSearchData: result,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    util.updateYouhuiquanCacheUpdateKey(false)

    util.loadYouhuiquan()

    this.setData({
      banner: mainDataJs.bannerData,
      itemArrayData: mainDataJs.itemArrayData,
      classData: mainDataJs.typeData,
      allDatas: classDataJs.allDatas,
    })

    util.loadOrders(false)
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
    util.loadYouhuiquan()

    let youhuiquanData = wx.getStorageSync(app.globalData.youhuiquanKey)
    this.setData({
      youhuiquan: youhuiquanData.data,
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

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