const app = getApp()

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const db = wx.cloud.database({
  env: 'xiaochi-rlwg9'
})

function getCloudDB(name) {
  return db.collection(name)
}

// 跳转到详情页
function navigateToDetail(cargoid) {
  wx.navigateTo({
    url: '../cargodetail/cargodetail?cargoid=' + cargoid,
  })
}

function uuid(len, radix) {
  var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  var uuid = [],
    i;
  radix = radix || chars.length;

  if (len) {
    // Compact form
    for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
  } else {
    // rfc4122, version 4 form
    var r;

    // rfc4122 requires these characters
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';

    // Fill in random data. At i==19 set the high bits of clock sequence as
    // per rfc4122, sec. 4.1.5
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | Math.random() * 16;
        uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
      }
    }
  }
  return uuid.join('')
}

// 请求支付
function payForPayment(payment) {
  let _this = this
  console.log("payment:", payment)
  wx.requestPayment({
    ...payment,
    success(res) {
      console.log('pay success', res)
      //更新状态后跳转
      updateOrderPaySuccess(payment.package)
      wx.showToast({
        title: '支付成功',
      })
      wx.redirectTo({
        url: '../orders/orders',
      })
    },
    fail(err) {
      console.error('pay fail', err)
      wx.showToast({
        title: '支付失败',
      })

      // 也跳转
      wx.redirectTo({
        url: '../orders/orders',
      })
    }
  })
}

// 更新订单支付成功
function updateOrderPaySuccess(_package) {
  let phoneNum = wx.getStorageSync(app.globalData.userKey)
  wx.cloud.callFunction({
    name: 'updateWhereData',
    data: {
      dbName: 'orders',
      cond: {
        phoneNum: phoneNum,
        "package": _package,
      },
      dataObj: {
        status: app.globalData.orderStatus.hasPay.status,
      },
    },
    success: res => console.log(res),
    fail: err => console.err(err),
  })
}

//  获取地址信息, 并存入缓存
function getAddressList() {
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
    },
    fail(res) {
      console.log(res)
    }
  })
}

//  校验登录状态
function checkLoginStatus() {
  let phoneNum = wx.getStorageSync(app.globalData.userKey)
  if (!phoneNum) {
    wx.switchTab({
      url: '/pages/login/smsLogin/smsLogin',
    })

    wx.showToast({
      title: '请先登录!!',
    })
  }
  return phoneNum
}

module.exports = {
  formatTime: formatTime,
  getCloudDB: getCloudDB,
  navigateToDetail: navigateToDetail,
  uuid: uuid,
  payForPayment: payForPayment,
  getAddressList: getAddressList,
  checkLoginStatus: checkLoginStatus
}