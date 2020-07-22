//app.js
App({
  onLaunch: function () {
    wx.cloud.init({
      evn: 'xiaochi-rlwg9'
    })

    let that = this
    that.getOpenId()
  },

  getOpenId() {
    let app = this
    wx.cloud.callFunction({
      name: "getOpenId",
      success(res) {
        let openid = res.result.openid
        // 存入缓存
        wx.setStorageSync(app.globalData.openidKey, openid)

        // 测试下能否取到
        let id = wx.getStorageSync(app.globalData.openidKey)
        wx.showToast({
          title: id,
        })
      },
      fail(res) {
        console.log(res)
      }
    })
  },

  globalData: {
    isTest: true, //是否是测试号, 是则不用填写验证码了
    userKey: 'userKey', // 存放登录标识, 现在是注册的phonenum
    openidKey: 'openidKey', //存放openid
    //存放所有地址  
    // 格式: 
    // wx: {_id: _id, hasQuery:bool, defaultIndex: int, address:[]}
    // db:{_id:_id, loginPhoneNum:string, defaultIndex: int, address:[]}
    addressKey: 'addressKey',
    //存放所有cargo,
    // 格式:
    // wx:[{cargoid:int, num:int, select:bool}]
    cargosKey: 'cargosKey',
    ordersKey: 'ordersKey', // 存放所有(TODO 已经完成的)订单. (TODO 所以订单列表是数据库中已完成的+缓存中的)
    tableName: {
      userInfo: 'userInfo'
    },
    userInfo: {
      openid: null
    },
    orderStatus: {
      waitForPay: {
        name: '待付款',
        status: 1
      },
      hasPay: {
        name: '已付款',
        status: 2
      },
      finish: {
        name: '已完成',
        status: 3
      },
    }
  }

})