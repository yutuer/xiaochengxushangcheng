// pages/address/addressChange/addressChange.js
const app = getApp()
const verify = require("../../../utils/verify.js")
const QQMapWX = require('../../../utils/qqmap-wx-jssdk.min.js');
var qqmapsdk;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: "", //收货人
    phoneNum: "", //手机号码
    area: "", //所在地区
    areaDetail: "", //详细地址
    checked: false, //是否默认
    index: -1, //index
  },

  //  收货人输入
  nameInputTap(e) {
    // console.log(e.detail.value)
    this.setData({
      name: e.detail.value
    })
  },
  //  手机号输入
  // phoneInputTap(e) {
  //   this.setData({
  //     phoneNum: e.detail.value
  //   })
  // },
  // 收货地址输入
  areaInputTap(e) {
    this.setData({
      area: e.detail.value
    })
  },
  // 收货地址详细输入
  areaDetailTap(e) {
    this.setData({
      areaDetail: e.detail.value
    })
  },
  //默认设置勾选
  switchChange(e) {
    this.setData({
      checked: e.detail.value
    })
  },

  // 点击保存
  saveTap() {
    //构造对象
    let address = {
      name: this.data.name,
      phoneNum: this.data.phoneNum,
      area: this.data.area,
      areaDetail: this.data.areaDetail,
    }

    //存入远端数据库, 成功后加入缓存
    this.saveAddressToCloud(address)

  },

  // 获取位置信息
  getLocation() {
    let that = this

    wx.getLocation({
      type: 'gcj02',
      success(res) {
        const latitude = res.latitude
        const longitude = res.longitude
        const speed = res.speed
        const accuracy = res.accuracy

        that.getLocal(latitude, longitude)
      }
    })
  },

  // 获取当前地理位置
  getLocal: function (latitude, longitude) {
    let that = this;
    qqmapsdk.reverseGeocoder({
      location: {
        latitude: latitude,
        longitude: longitude
      },
      success: function (res) {
        console.log(JSON.stringify(res));
        let district = res.result.address_component.district
        let recommend = res.result.formatted_addresses.recommend

        if (district || recommend) {
          that.setData({
            area: district + ' ' + recommend
          })
        }
      },
      fail: function (res) {
        console.log(res);
      },
      complete: function (res) {
        // console.log(res);
      }
    });
  },

  // 存储地址到远程
  saveAddressToCloud(address) {
    let that = this
    let index = that.data.index
    console.log(index)

    let addressCache = wx.getStorageSync(app.globalData.addressKey)
    // 计算默认的索引
    if (that.data.checked) {
      addressCache.defaultIndex = index
    } else {
      if (addressCache.defaultIndex == index) {
        addressCache.defaultIndex = -1
      }
    }

    that.updateEntity(addressCache.address[index], address)

    // 构造更新对象
    let addressObj = {
      defaultIndex: addressCache.defaultIndex,
      address: addressCache.address,
    }

    wx.cloud.callFunction({
      name: 'updateOneData',
      data: {
        dbName: 'address',
        cond: addressCache._id,
        dataObj: addressObj,
      },
      success(res) {
        console.log(res)
        //更新到缓存
        let addressCache = wx.getStorageSync(app.globalData.addressKey)
        console.log(addressCache)

        addressCache.defaultIndex = addressObj.defaultIndex
        addressCache.address = addressObj.address
        // 重新存入新的
        wx.setStorageSync(app.globalData.addressKey, addressCache)
        //跳转
        wx.navigateBack({
          delta: 1,
        })
      },
      fail(e) {
        console.log(e)
      }
    })
  },

  // 更新记录
  updateEntity(oldone, newone) {
    if (oldone && newone) {
      oldone.name = newone.name
      oldone.phoneNum = newone.phoneNum
      oldone.area = newone.area
      oldone.areaDetail = newone.areaDetail
      return true
    }
    return false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // str转化回对象
    let addr = JSON.parse(options.addr)

    console.log(addr)

    this.setData({
      name: addr.name,
      phoneNum: addr.phoneNum,
      area: addr.area,
      areaDetail: addr.areaDetail,
      checked: addr.checked,
      index: addr.index
    })

    // 实例化API核心类
    qqmapsdk = new QQMapWX({
      key: 'EYRBZ-RZXLU-HWCVW-2H32Q-7M2IZ-3XBPB'
    });
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