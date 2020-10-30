// pages/login/smsLogin/smsLogin.js
let app = getApp()
const verify = require("../../../utils/verify.js")
const util = require("../../../utils/util.js")
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: null,
        loginPhoneNum: '',
        verifyCode: '',

        testName: '',
        testDesc: '',
        testNeedMoney: 0,
        testStartTimeDesc: '',
        testEndTimeDesc: '',
        testStartTime: 0,
        testEndTime: 0,
        leftUseCount: 0,


        youhuiquan: {
            desc: "购满100元赠送西瓜1个",
            startTimeDesc: "2020-02-02 10:10",
            endTimeDesc: "2020-02-02 10:10",
            leftUseCount: 100,
        }
    },

    testName(e) {
        this.setData({
            testName: e.detail.value
        })
    },
    testDesc(e) {
        this.setData({
            testDesc: e.detail.value
        })
    },
    testNeedMoney(e) {
        let value = e.detail.value
        let v1 = parseFloat(value)
        let v2 = (v1 * 100) / 100
        this.setData({
            testNeedMoney: v2
        })
    },
    testStartTime(e) {
        let dataStr = e.detail.value
        let d = util.getDateByStr(dataStr)
        this.setData({
            testStartTime: d,
            testStartTimeDesc: dataStr,
        })
    },
    testEndTime(e) {
        let dataStr = e.detail.value
        let d = util.getDateByStr(dataStr)
        this.setData({
            testEndTime: d,
            testEndTimeDesc: dataStr,
        })
    },
    maxUseCount(e) {
        let maxUseCount = parseInt(e.detail.value)
        this.setData({
            leftUseCount: maxUseCount,
        })
    },

    test() {
        let that = this

        let dataParam = {
            name: that.data.testName,
            desc: that.data.testDesc,
            needMoney: that.data.testNeedMoney,
            startTime: that.data.testStartTime,
            endTime: that.data.testEndTime,
            startTimeDesc: that.data.testStartTimeDesc,
            endTimeDesc: that.data.testEndTimeDesc,
            leftUseCount: that.data.leftUseCount,
        }

        if (!dataParam.name) {
            wx.showToast({
                title: '名称未填写',
            })
            return
        }
        if (!dataParam.desc) {
            wx.showToast({
                title: '描述未填写',
            })
            return
        }
        if (dataParam.needMoney == 0) {
            wx.showToast({
                title: '金额未填写',
            })
            return
        }
        if (!dataParam.startTimeDesc) {
            wx.showToast({
                title: '开始日期未填写',
            })
            return
        }
        if (!dataParam.endTimeDesc) {
            wx.showToast({
                title: '结束日期未填写',
            })
            return
        }
        if (dataParam.leftUseCount == 0) {
            wx.showToast({
                title: '剩余数量未填写',
            })
            return
        }

        wx.cloud.callFunction({
            name: 'addOneData',
            data: {
                dbName: 'youhuiquan',
                dataObj: dataParam,
                success(res) {
                    console.log(res)

                    wx.showToast({
                        title: '添加记录成功',
                    })
                },
                fail(e) {
                    console.error(e)

                    wx.showToast({
                        title: '添加记录失败',
                    })
                }
            },
        })
    },

    // 点击了获取验证码
    yzmClick(e) {
        this.setData({
            verifyCode: e.detail.value
        })
    },

    // 输入手机号
    phoneNumInput(e) {
        this.setData({
            loginPhoneNum: e.detail.value
        })
    },

    // 登录按钮tap
    loginTap() {
        let that = this
        if (app.globalData.isTest) {
            // 验证手机号
            that.checkPhoneNumRight()
        } else {
            // 判断验证码是否填了

            // 验证登录码 异步

            // 验证手机号
        }
    },
    // 验证手机号是否正确
    checkPhoneNumRight() {
        let that = this
        let loginPhoneNum = that.data.loginPhoneNum
        // 直接查询
        wx.cloud.callFunction({
            name: 'queryAllData',
            data: {
                dbName: 'userInfo',
                cond: {
                    phoneNum: loginPhoneNum
                },
            },
            success(res) {
                console.log(res)
                if (res.result.data.length > 0) {
                    // 存入手机号到缓存
                    wx.setStorageSync(app.globalData.userKey, loginPhoneNum)
                    // 存入一个空的购物车
                    wx.setStorageSync(app.globalData.cargosKey, [])

                    //获取地址信息
                    util.getAddressList()
                    // 获取订单信息
                    util.loadOrders(false)
                    // 重新加载当前页面
                    wx.reLaunch({
                        url: '../smsLogin/smsLogin',
                    })
                } else {
                    // 没有找到用户
                    verify.showToast('没有找到用户')
                }
            },
            fail(err) {
                console.log(err)
            }
        })
    },

    // 登出tap
    loginOutTap() {
        let that = this
        // 清空缓存内玩家信息
        wx.clearStorage()
        // 重新加载本页
        wx.reLaunch({
            url: '../smsLogin/smsLogin',
        })
    },

    // 点击了订单管理
    ordersTap() {
        wx.navigateTo({
            url: '../../orders/orders',
        })
    },

    // 点击了地址管理tap
    addressTap() {
        const isListPage = 1
        wx.navigateTo({
            url: `../../address/addressList/addressList?isListPage=${isListPage}`,
        })
    },

    // 点击了手机快速注册
    phoneRegistClick() {
        wx.navigateTo({
            url: '../phoneRegist/phoneRegist',
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log("smsLogin onLoad")

        // 本地的userInfo 目前只需要phoneNum
        let loginPhoneNum = wx.getStorageSync(app.globalData.userKey)
        if (loginPhoneNum) {
            this.setData({
                userInfo: {
                    loginPhoneNum
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
        console.log("smsLogin onShow")
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
        console.log("smsLogin onHide")
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
        console.log("smsLogin onUnload")
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

    },

    plusOnClickFunc: function (e) {
        console.log(e)
    },

    click1(e) {
        this.ordersTapChoose(1)
    },
    click2(e) {
        this.ordersTapChoose(2)
    },
    click3(e) {
        this.ordersTapChoose(3)
    },
    click4(e) {
        this.ordersTapChoose(0)
    },
    click11(e) {
        this.addressTap()
    },

    click12(e) {
        wx.makePhoneCall({phoneNumber: '1860009989'})
    },

    ordersTapChoose(chooseStatus) {
        wx.navigateTo({
            url: '../../orders/orders?chooseStatus=' + chooseStatus,
        })
    },
})