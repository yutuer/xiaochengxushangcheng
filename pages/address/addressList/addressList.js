// pages/address/addressList/addressList.js
const app = getApp();
const util = require('../../../utils/util.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        address: [],
        defaultIndex: -1,
        chooseAddrIndex: -1,
        isListPage: false,
    },

    // 点击修改按钮
    changeTap(e) {
        let addr = e.currentTarget.dataset.addr;
        let address = {
            name: addr.name,
            phoneNum: addr.phoneNum,
            area: addr.area,
            areaDetail: addr.areaDetail,
            checked: e.currentTarget.dataset.checked,
            index: e.currentTarget.dataset.index,
        };
        // console.log(address)

        // 好使, 哈哈
        let s = JSON.stringify(address);
        wx.navigateTo({
            url: '../addressChange/addressChange?addr=' + s,
        })
    },

    // 点击选择按钮
    chooseTap(e) {
        const chooseIndex = e.currentTarget.dataset.index;

        let pages = getCurrentPages();
        //prevPage 是获取上一个页面的js里面的pages的所有信息。 -2 是上一个页面，-3是上上个页面以此类推。
        let prevPage = pages[pages.length - 2];
        prevPage.setData({
            chooseAddrIndex: chooseIndex
        });

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

    // 地址列表读取.
    // 会先检查wx缓存. 如果没有读取过, 就从库中读取, 然后存入wx缓存.
    // 否则直接展现
    addressLoad() {
        let addressCache = wx.getStorageSync(app.globalData.addressKey);
        console.log(addressCache);

        if (addressCache && addressCache.hasQuery) {
            this.setData({
                address: addressCache.address,
                defaultIndex: addressCache.defaultIndex,
            })
        } else {
            // 去数据库中获取 玩家地址所有数据
            util.getAddressList();

            let addressObj = wx.getSystemInfoSync(app.globalData.addressKey);

            this.setData({
                address: addressObj.address,
                defaultIndex: addressObj.defaultIndex,
            })
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log("addressList  onLoad:", options);

        let isListPage = false;
        let chooseIndex = "0";
        if (options) {
            if (options.isListPage) {
                isListPage = true
            }
            chooseIndex = options.choose;
        }

        this.setData({
            isListPage: isListPage,
            chooseAddrIndex: parseInt(chooseIndex),
        });

        this.setData({
            slideButtons: [{
                text: '编辑',
                extClass: 'test',
            }, {
                type: 'warn',
                text: '删除',
                extClass: 'test',
            }],
        });

        this.addressLoad()
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
        // 可以直接从缓存读取
        let addressObj = wx.getStorageSync(app.globalData.addressKey);
        console.log("addressList  onShow, addressObj:", addressObj);

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

    },

    slideButtonTap(e) {
        console.log('slide button tap', e.detail);
        console.log('slide button tap', e.currentTarget.dataset);
        let index = e.detail.index; // 操作的按钮索引
        if (index == 0) {
            // 编辑
            this.changeTap(e);
        } else if (index == 1) {
            // 删除
            this.deleteAddr(e);
        }
    },

    deleteAddr(e) {
        let that = this;
        let index = e.currentTarget.dataset.index;
        // 更新缓存
        let addressCache = wx.getStorageSync(app.globalData.addressKey);
        if (addressCache) {
            console.log(index, addressCache);

            let address = addressCache.address;
            address.splice(index, 1);

            //构造更新的对象
            let addressObj = {
                address: address,
            };

            // 存储到数据库
            wx.cloud.callFunction({
                name: 'updateOneData',
                data: {
                    dbName: 'address',
                    cond: addressCache._id,
                    dataObj: addressObj,
                },
                success: (res) => {
                    that.setData({
                        address: address,
                    });

                    // 重新存入新的
                    wx.setStorageSync(app.globalData.addressKey, addressCache);
                },
                fail: (err) => console.error(err),
            });
        }
    },

});