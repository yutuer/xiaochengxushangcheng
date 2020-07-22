// pages/main/main.js
//引入本地数据
let mainData = require('../../utils/data/mainData.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    banner: [], //图片轮播数据
    classData: {
      "onePage": [{
          fun: 1,
          "title": "京东秒杀",
          "icon": "../../images/main/jdms_type.png"
        },
        {
          fun: 2,
          "title": "京东超市",
          "icon": "../../images/main/jdcs_type.png"
        },
        {
          fun: 3,
          "title": "手机充值",
          "icon": "../../images/main/sjcz_type.png"
        },
        {
          fun: 4,
          "title": "电脑",
          "icon": "../../images/main/dn_type.png"
        },
        {
          fun: 5,
          "title": "数码",
          "icon": "../../images/main/sm_type.png"
        },
        {
          fun: 6,
          "title": "箱包",
          "icon": "../../images/main/xb_type.png"
        },
        {
          fun: 7,
          "title": "家居家装",
          "icon": "../../images/main/jjjz_type.png"
        },
        {
          fun: 8,
          "title": "运动",
          "icon": "../../images/main/yd_type.png"
        },
        {
          fun: 9,
          "title": "钟表",
          "icon": "../../images/main/zb_type.png"
        },
        {
          fun: 10,
          "title": "唯品会",
          "icon": "../../images/main/wph_type.png"
        },
      ],
      "twoPage": [{
          fun: 11,
          "title": "领优惠券",
          "icon": "../../images/main/lgwq_type.png"
        },
        {
          fun: 12,
          "title": "9.9元拼",
          "icon": "../../images/main/9.9yp_type.png"
        },
        {
          fun: 13,
          "title": "找折扣",
          "icon": "../../images/main/zzk_type.png"
        },
        {
          fun: 14,
          "title": "品牌特卖",
          "icon": "../../images/main/pptm_type.png"
        },
        {
          fun: 15,
          "title": "领京豆",
          "icon": "../../images/main/ljd_type.png"
        },
        {
          fun: 16,
          "title": "打卡领奖",
          "icon": "../../images/main/dkyj_type.png"
        },
        {
          fun: 17,
          "title": "京豆服饰",
          "icon": "../../images/main/jdfs_type.png"
        },
        {
          fun: 18,
          "title": "京东生鲜",
          "icon": "../../images/main/jdsx_type.png"
        },
        {
          fun: 19,
          "title": "京东手机",
          "icon": "../../images/main/jdsj_type.png"
        },
        {
          fun: 20,
          "title": "全部频道",
          "icon": "../../images/main/qbpd_type.png"
        }
      ]
    },
    itemArrayData: [] //猜你喜欢数据
  },

  // 点击banner
  bannerTap(e) {
    let cargoid = e.currentTarget.dataset.cargoid
    // 调到详情页

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
    wx.navigateTo({
      url: '../cargodetail/cargodetail?cargoid=' + cargoid,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      banner: mainData.bannerData,
      itemArrayData: mainData.itemArrayData
    })
  },

  search(e) {
    let va = e.detail.value

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