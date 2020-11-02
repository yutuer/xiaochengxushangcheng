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

// alert(getDate("2016-6-14 11:20:00"));
//字符串转时间戳，strDate要转为日期格式的字符串 
function getDateByStr(strDate) {
    var st = strDate
    var a = st.split(" ")
    var b = a[0].split("-")
    var c = a[1].split(":")
    var date = new Date(b[0], b[1] - 1, b[2], c[0], c[1], 0)
    return Date.parse(date);
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

// 跳转到分类页
function navigateToType(type) {
    app.globalData.switchType = type
    wx.switchTab({
        url: '../class/class',
        success() {

        },
        fail() {

        }
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

// 跳转到订单页面
function jumpToOrders() {
    wx.redirectTo({
        url: '../orders/orders',
        success: function (res) {
            wx.reLaunch({
                url: '../orders/orders',
            })
        },
    })
}

// 请求支付
function payForPayment(outTradeNo, payment, youhuiquan) {
    let _this = this
    console.log("outTradeNo:", outTradeNo, ", payment:", payment, ", youhuiquan:", youhuiquan)
    wx.requestPayment({
        ...payment,
        success(res) {
            console.log('pay success', res)
            //更新状态后跳转
            updateOrderPaySuccess(payment.package)

            console.log('pay success', res)

            jumpToOrders()
        },
        fail(err) {
            console.error('pay fail', err)
            //TODO 如果是超时的时候, 更新超时状态到数据库

            //查询订单
            queryPayment(outTradeNo, payment)

            // 也跳转
            jumpToOrders()
        }
    })
}

// 查询订单
function queryPayment(outTradeNo, payment) {
    const dataSend = {
        outTradeNo: outTradeNo,
    }

    wx.cloud.callFunction({
        name: 'payQuery',
        data: {
            ...dataSend
        },
        success(res) {
            console.log('pay success', res)
        },
        fail(err) {
            console.error('pay fail', err)
        }
    })
}

function getLessTenShow(v) {
    let ret = v < 10 ? '0' + v : '' + v
    return ret
}

function getTimeDesc(timestamp) {
    var date = new Date(timestamp)
    //年
    var Y = date.getFullYear()
    //月
    var M = getLessTenShow(date.getMonth() + 1)
    //日
    var D = getLessTenShow(date.getDate())
    //时
    var h = getLessTenShow(date.getHours())
    //分
    var m = getLessTenShow(date.getMinutes())
    return Y + "-" + M + "-" + D + " " + h + ":" + m
}

function updateOrderPayFinish(_package) {
    updateOrderPayStatus(_package, app.globalData.orderStatus.finish.status)
}


function updateOrderPayExpire(_package) {
    updateOrderPayStatus(_package, app.globalData.orderStatus.expire.status)
}

// 更新订单支付成功
function updateOrderPaySuccess(_package) {
    const now = Date.parse(new Date())
    const timeDesc = getTimeDesc(now)
    updateOrderPayStatus(_package, app.globalData.orderStatus.hasPay.status, timeDesc)
}

// 更新订单支付成功
function updateOrderPayStatus(_package, _status, payTime) {
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
                status: _status,
                payTime: payTime,
            },
        },
        success: res => console.log(res),
        fail: err => console.err(err),
    })
}

// 扣除优惠券使用次数
function subYouhuiquanLeftUseCount(youhuiquan) {
    if (youhuiquan && youhuiquan.leftUseCount > 10) {
        const remain = youhuiquan.leftUseCount - 1
        // 使用同步更新
        updateYouhuiquanCacheUpdateKey(false)
        wx.cloud.callFunction({
            name: 'updateOneData',
            data: {
                dbName: 'youhuiquan',
                cond: youhuiquan._id,
                dataObj: {
                    leftUseCount: remain
                }
            },
            success: res => {
                console.log(res)
            },
            fail: err => console.err(err),
        })
    }
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

// 读取订单数据
function loadOrders(isQueryCache) {
    if (isQueryCache) {
        let ordersObj = wx.getStorageSync(app.globalData.ordersKey)
        if (ordersObj && ordersObj.isAllFinish) {
            let orders = ordersObj.orders
        } else {
            loadOrdersFromDB()
        }
    } else {
        loadOrdersFromDB()
    }
}

function loadOrdersFromDB(page) {
    const phoneNum = wx.getStorageSync(app.globalData.userKey)
    if (!phoneNum) {
        // 当前没有userKey的话就返回(没有主键查什么)
        return
    }

    wx.cloud.callFunction({
        name: 'queryAllData',
        data: {
            dbName: 'orders',
            cond: {
                phoneNum: phoneNum
            }
        },
        success(res) {
            console.log(res)

            const now = Date.parse(new Date())

            if (res.errMsg == 'cloud.callFunction:ok') {
                let orders = res.result.data
                let orderStatus = app.globalData.orderStatus

                for (let i = 0; i < orders.length; i++) {
                    let order = orders[i]

                    if (order.status == orderStatus.waitForPay.status) {
                        // 如果15分钟还是未支付, 则更新为已完成
                        let time = order.time
                        if (time + 15 * 60 * 1000 < now) {
                            order.status = orderStatus.waitForPay.status
                            updateOrderPayExpire(order.package)
                        }
                    }

                    if (order.status == orderStatus.waitForPay.status) {
                        order.statusDesc = orderStatus.waitForPay.name
                    } else if (order.status == orderStatus.hasPay.status) {
                        order.statusDesc = orderStatus.hasPay.name
                    } else if (order.status == orderStatus.finish.status) {
                        order.statusDesc = orderStatus.finish.name
                    } else if (order.status == orderStatus.expire.status) {
                        order.statusDesc = orderStatus.expire.name
                    }
                }

                // 遍历下看看是否全部完成
                let finish = true
                let waiforPay = false
                for (let i = 0; i < orders.length; i++) {
                    let order = orders[i]
                    if (order.status < app.globalData.orderStatus.finish.status) {
                        // 还有未完成的
                        finish = false
                        if (order.status == app.globalData.orderStatus.waitForPay.status) {
                            // 还有未完成的
                            waiforPay = true
                        }
                    }
                }

                if (page) {
                    page.setData({
                        orders: orders,
                    })
                }

                // 设置到缓存中
                const ordersCache = {
                    isAllFinish: finish,
                    waitforPay: waiforPay,
                    orders: orders,
                }
                // 加入缓存
                wx.setStorageSync(app.globalData.ordersKey, ordersCache)
            }
        },
        fail: console.error
    })
}

module.exports = {
    formatTime: formatTime,
    getCloudDB: getCloudDB,
    navigateToDetail: navigateToDetail,
    navigateToType: navigateToType,
    uuid: uuid,
    payForPayment: payForPayment,
    getAddressList: getAddressList,
    checkLoginStatus: checkLoginStatus,
    getDateByStr: getDateByStr,
    loadOrders: loadOrders,
    loadOrdersFromDB: loadOrdersFromDB,
    updateOrderPayExpire: updateOrderPayExpire,
    updateOrderPayFinish: updateOrderPayFinish,
    jumpToOrders: jumpToOrders,
    getTimeDesc: getTimeDesc,
    subYouhuiquanLeftUseCount: subYouhuiquanLeftUseCount,
}