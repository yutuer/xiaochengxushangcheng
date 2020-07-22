// pages/admin/admin.js
let util = require("../../utils/util.js")
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classDBData: [{
        "title": "京东秒杀",
        "icon": "../../images/main/jdms_type.png"
      },
      {
        "title": "京东超市",
        "icon": "../../images/main/jdcs_type.png"
      },
      {
        "title": "手机充值",
        "icon": "../../images/main/sjcz_type.png"
      },
      {
        "title": "电脑",
        "icon": "../../images/main/dn_type.png"
      },
      {
        "title": "数码",
        "icon": "../../images/main/sm_type.png"
      },
      {
        "title": "箱包",
        "icon": "../../images/main/xb_type.png"
      },
      {
        "title": "家居家装",
        "icon": "../../images/main/jjjz_type.png"
      },
      {
        "title": "运动",
        "icon": "../../images/main/yd_type.png"
      },
      {
        "title": "钟表",
        "icon": "../../images/main/zb_type.png"
      },
      {
        "title": "唯品会",
        "icon": "../../images/main/wph_type.png"
      },
      {
        "title": "领优惠券",
        "icon": "../../images/main/lgwq_type.png"
      },
      {
        "title": "9.9元拼",
        "icon": "../../images/main/9.9yp_type.png"
      },
      {
        "title": "找折扣",
        "icon": "../../images/main/zzk_type.png"
      },
      {
        "title": "品牌特卖",
        "icon": "../../images/main/pptm_type.png"
      },
      {
        "title": "领京豆",
        "icon": "../../images/main/ljd_type.png"
      },
      {
        "title": "打卡领奖",
        "icon": "../../images/main/dkyj_type.png"
      },
      {
        "title": "京豆服饰",
        "icon": "../../images/main/jdfs_type.png"
      },
      {
        "title": "京东生鲜",
        "icon": "../../images/main/jdsx_type.png"
      },
      {
        "title": "京东手机",
        "icon": "../../images/main/jdsj_type.png"
      },
      {
        "title": "全部频道",
        "icon": "../../images/main/qbpd_type.png"
      }
    ]
  },


  insertClassDB(e) {
    util.getCloudDB("class").add({
      data: {
        h: 11
      },
      success(res) {
        // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
        console.log("success:", res)
      },
      fail(res) {
        console.log("fail:", res)
      }
    })
  },
  queryClassDB() {
    let dbName = 'class'
    wx.cloud.callFunction({
      name: "queryAllData",
      data: {
        dbName: dbName
      },
      success(res) {
        console.log("success:", res)
      },
      fail(res) {
        console.log(res)
      }
    })
  },

  insertInitDataToClassDB() {
    let dbName = 'class'

    for (let i = 0; i < this.data.classDBData.length; i++) {
      let data = this.data.classDBData[i]
      wx.cloud.callFunction({
        name: "addOneData",
        data: {
          data: data,
          dbName: dbName
        },
        success(res) {
          console.log("success:", res)
        },
        fail(res) {
          console.log(res)
        }
      })
    }
  },

  clearClassDB() {
    let dbName = 'class'

    wx.cloud.callFunction({
      name: "clearAllData",
      data: {
        dbName: dbName,
      },
      success(res) {
        console.log("成功清空, 总共删除:", res.result.stats.removed, "条记录")
      },
      fail(res) {
        console.log(res)
      }
    })
  },

  test() {
    wx.cloud.callFunction({
      name: "clearAllData",
      data: {
        dbName: "class",
      },
      success(res) {
        console.log(res)
      },
      fail(res) {
        console.log(res)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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