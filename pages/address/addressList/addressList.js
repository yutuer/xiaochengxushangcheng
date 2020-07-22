// pages/address/addressList/addressList.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: [],
    defaultIndex: -1,
    chooseAddrIndex: -1,
    isChoose: false,
  },

  // 点击修改按钮
  changeTap(e) {
    let address = {
      name: e.currentTarget.dataset.name,
      phoneNum: e.currentTarget.dataset.phonenum,
      area: e.currentTarget.dataset.area,
      areaDetail: e.currentTarget.dataset.areadetail,
      checked: e.currentTarget.dataset.checked,
      index: e.currentTarget.dataset.index,
    }
    // console.log(address)

    // 好使, 哈哈
    let s = JSON.stringify(address)
    wx.navigateTo({
      url: '../addressChange/addressChange?addr=' + s,
    })
  },

  // 点击选择按钮
  chooseTap(e) {
    const chooseIndex = e.currentTarget.dataset.index

    let pages = getCurrentPages()
    //prevPage 是获取上一个页面的js里面的pages的所有信息。 -2 是上一个页面，-3是上上个页面以此类推。
    let prevPage = pages[pages.length - 2]
    prevPage.setData({
      chooseAddrIndex: chooseIndex
    })

    wx.navigateBack({
      delta: 1,
    })
  },

  // 点击新增按钮
  addressAddTap() {
    wx.navigateTo({
      url: '../addressAdd/addressAdd',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("addressList  onLoad")

    if (options) {
      this.setData({
        isChoose: true,
        chooseAddrIndex: parseInt(options.choose),
      })
    }

    this.addressLoad()
  },

  // 地址列表读取. 
  // 会先检查wx缓存. 如果没有读取过, 就从库中读取, 然后存入wx缓存.
  // 否则直接展现
  addressLoad() {
    let addressCache = wx.getStorageSync(app.globalData.addressKey)
    console.log(addressCache)

    if (addressCache && addressCache.hasQuery) {
      this.setData({
        address: addressCache.address,
        defaultIndex: addressCache.defaultIndex,
      })
    } else {
      // 去数据库中获取 玩家地址所有数据
      let that = this
      let loginPhoneNum = wx.getStorageSync(app.globalData.userKey)

      wx.cloud.callFunction({
        name: 'queryAllData',
        data: {
          dbName: 'address',
          cond: {
            'loginPhoneNum': loginPhoneNum
          }
        },
        success(res) {
          let _id = ''
          let data = null
          let defaultIndex = -1
          let address = []
          if (res.result.data && res.result.data.length > 0) {
            data = res.result.data[0]
            _id = data._id
            defaultIndex = data.defaultIndex
            address = data.address
          }

          let addressObj = {
            _id: _id,
            hasQuery: true,
            defaultIndex: defaultIndex,
            address: address,
          }
          wx.setStorageSync(app.globalData.addressKey, addressObj)

          that.setData({
            address: addressObj.address,
            defaultIndex: defaultIndex,
          })
        },
        fail(res) {
          console.log(res)
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
    console.log("addressList  onShow")

    // 可以直接从缓存读取
    let addressObj = wx.getStorageSync(app.globalData.addressKey)
    // console.log(addressObj)
    if (addressObj && addressObj.hasQuery) {
      this.setData({
        address: addressObj.address,
        defaultIndex: addressObj.defaultIndex,
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log("addressList  onHide")
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log("addressList  onUnload")
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