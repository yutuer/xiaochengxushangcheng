// pages/address/addressAdd/addressAdd.js
const app = getApp()
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
  },

  //  收货人输入
  nameInputTap(e) {
    // console.log(e.detail.value)
    this.setData({
      name: e.detail.value
    })
  },
  //  手机号输入
  phoneInputTap(e) {
    this.setData({
      phoneNum: e.detail.value
    })
  },
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
    this.saveAddressToCloud(address, this.data.checked)
  },

  // 存储地址到远程
  saveAddressToCloud(address, checked) {
    // 查询缓存, 决定是插入还是修改
    let addressCache = wx.getStorageSync(app.globalData.addressKey)
    if (addressCache && addressCache.hasQuery) {
      addressCache.address.push(address)
      if (checked) {
        addressCache.defaultIndex = addressCache.address.length - 1
      }

      if (addressCache._id) {
        let addressObj = {
          defaultIndex: addressCache.defaultIndex,
          address: addressCache.address,
        }

        //更新
        wx.cloud.callFunction({
          name: 'updateOneData',
          data: {
            dbName: 'address',
            cond: addressCache._id,
            dataObj: addressObj,
          },
          success(res) {
            console.log(res)

            // 重新存入
            wx.setStorageSync(app.globalData.addressKey, addressCache)
            wx.navigateBack({
              delta: 1,
            })
          },
          fail(res) {
            console.log(res)
          }
        })
      } else {
        // 插入
        let loginPhoneNum = wx.getStorageSync(app.globalData.userKey)
        let addressObj = {
          loginPhoneNum: loginPhoneNum,
          defaultIndex: addressCache.defaultIndex,
          address: addressCache.address,
        }

        wx.cloud.callFunction({
          name: 'addOneData',
          data: {
            dbName: 'address',
            dataObj: addressObj,
          },
          success(res) {
            console.log(res, addressCache)
            // 增加主键字段, 用来查询
            addressCache._id = res.result._id
            // 重新存入
            wx.setStorageSync(app.globalData.addressKey, addressCache)

            wx.navigateBack({
              delta: 1,
            })
          },
          fail(res) {
            console.log(res)
          }
        })
      }
    }
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let loginPhoneNum = wx.getStorageSync(app.globalData.userKey)
    if (loginPhoneNum) {
      this.setData({
        loginPhoneNum: loginPhoneNum
      })
    }

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