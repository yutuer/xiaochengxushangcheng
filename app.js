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
        allSellItemKey: 'allSellItemKey', // 所有商品(从服务器读出来, 缓存)的key
        //存放所有地址
        // 格式:
        // wx: {_id: _id, hasQuery:bool, defaultIndex: int, address:[]}
        // db:{_id:_id, loginPhoneNum:string, defaultIndex: int, address:[]}
        addressKey: 'addressKey',
        //存放所有cargo,
        // 格式:
        // wx:[{cargoid: 物品id, num:物品数量, select:是否选中}]
        cargosKey: 'cargosKey',

        // 切换到分类页之后定位到哪个type
        switchType: 1,

        // 优惠券
        // 格式  {data: [{id: 唯一标识, name:优惠券名称, desc:赠送说明, needMoney: 优惠满足条件(合计金额, 精确到xx), startTimeDesc:开始时间(年-月-日 时:分:秒), endTimeDesc:结束时间(年-月-日 时:分:秒), startTime:开始时间, endTime:结束时间, leftUseCount:剩余使用次数}] }
        youhuiquanKey: 'youhuiquanKey',
        // 优惠券缓存更新key,  onLoad的时候,或者提交订单后设置为false. 从数据库加载后设置为true  false才会从云数据库中加载数据
        youhuiquanCacheUpdateKey: 'youhuiquanCacheUpdateKey',

        // 存放所有(TODO 已经完成的)订单. (TODO 所以订单列表是数据库中已完成的+缓存中的)
        ordersKey: 'ordersKey',
        tableName: {
            userInfo: 'userInfo'
        },
        userInfo: {
            openid: null
        },
        orderStatus: {
            waitForPay: {
                name: '未支付',
                status: 1
            },
            hasPay: {
                name: '待发货',
                status: 2
            },
            finish: {
                name: '已完成',
                status: 3
            },
            expire: {
                name: '已超时',
                status: 4
            },
        }
    }

})