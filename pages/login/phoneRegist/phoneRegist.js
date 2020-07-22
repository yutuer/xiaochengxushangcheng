// pages/login/phoneRegist/phoneRegist.js
let verify = require("../../../utils/verify.js")
let util = require("../../../utils/util.js")
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phoneNum: '',
    code: '',
    showQueryLeft: false,
    showQuerySended: false,
  },

  phoneNumInput(e) {
    this.setData({
      phoneNum: e.detail.value
    })
  },

  codeInput(e) {
    // 设置
    _this.setData({
      code: e.detail.value
    })
  },
  // 查询余额
  queryLeft() {
    wx.cloud.callFunction({
      name: 'zhenzisms',
      data: {
        $url: 'balance',
        apiUrl: 'https://sms_developer.zhenzikj.com'
      }
    }).then((res) => {
      that.showToast(res.result.data + '');
    }).catch((e) => {
      console.log(e);
    });
  },

  //查看已经发送的短信
  querySended() {
    wx.cloud.callFunction({
      name: 'zhenzisms',
      data: {
        $url: 'findSmsByMessageId',
        apiUrl: 'https://sms_developer.zhenzikj.com',
        messageId: ''
      }
    }).then((res) => {
      console.log(res.result.data);
    }).catch((e) => {
      console.log(e);
    });
  },

  // 按下注册按钮
  registerTap() {
    // 校验code
    let code = this.data.code
    let phoneNum = this.data.phoneNum

    let that = this
    // 查询下是否已经注册了
    wx.cloud.callFunction({
      name: 'queryAllData',
      data: {
        dbName: app.globalData.tableName.userInfo,
        cond: {
          phoneNum: phoneNum
        }
      },
      success(res) {
        console.log(res)

        if (res.result.data.length > 0) {
          verify.showToast("手机号已经注册!!!")
        } else {
          that.register(phoneNum)
        }
      },
      fail(res) {
        console.log(res)
      }
    })
  },

  // 注册
  register(phoneNum) {
    let that = this
    if (app.globalData.isTest) {
      that.insertNewUser(phoneNum)
    } else {
      wx.cloud.callFunction({
        name: 'zhenzisms',
        data: {
          $url: 'validateCode',
          number: phoneNum,
          code: code
        }
      }).then((res) => {
        console.log(res.result.code + ' ' + res.result.data);
        if (res.result.code == 'success') {
          that.insertNewUser(phoneNum)
        } else {
          that.showToast(res.result.data);
        }
      }).catch((e) => {
        console.log(e);
      });
    }
  },

  insertNewUser(phoneNum) {
    //插入新用户
    wx.cloud.callFunction({
      name: 'addOneData',
      data: {
        dbName: app.globalData.tableName.userInfo,
        dataObj: {
          phoneNum: phoneNum,
          openid: wx.getStorageSync('openid'),
          registerTime: util.formatTime(new Date())
        }
      }
    }).then(res => {
      console.log("insertNewUser:", res)
      if (res.errMsg == "cloud.callFunction:ok") {
        // 插入成功后, 存入微信缓存
        wx.setStorageSync(app.globalData.userKey, phoneNum)
        // 成功后跳回
        wx.reLaunch({
          url: '../smsLogin/smsLogin',
        })
      }
    }).catch(e => {
      console.log(e)
    })
  },

  yzmClick() {
    let number = this.data.phoneNum;
    wx.cloud.callFunction({
      name: 'zhenzisms',
      data: {
        $url: 'createCode',
        number: number,
        seconds: 5 * 60,
        length: 4,
        intervalTime: 10 * 1000 //两条短信间隔时间(毫秒)，<=0 时无间隔
      }
    }).then((res) => {
      if (res.result.code != 'success') {
        verify.showToast(res.result.data);
        return;
      }
      verify.showToast('验证码:' + res.result.data);

      var captcha = res.result.data;
      var templateParams = [captcha, '5分钟'];
      wx.cloud.callFunction({
        name: 'zhenzisms',
        data: {
          $url: 'send',
          apiUrl: 'https://sms_developer.zhenzikj.com',
          number: number,
          templateId: '998',
          templateParams: templateParams
        }
      }).then((res) => {
        console.log(res.result);
        if (res.result.code == 0)
          verify.showToast('发送成功');
      })
    }).catch((e) => {
      console.log(e);
    });
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