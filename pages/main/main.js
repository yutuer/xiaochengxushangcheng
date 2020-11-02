// pages/main/main.js
//引入本地数据
let mainDataJs = require('../../utils/data/mainData.js')
const classDataJs = require('../../utils/data/classData.js')
const util = require("../../utils/util.js")

import {
    NumOpera
} from '../../utils/tools.js';

let numOpera = new NumOpera()

import {
    YouhuiquanDB
} from '../../utils/youhuiquanDB.js';

let youhuiquanDB = new YouhuiquanDB()

import {
    CargoDB
} from '../../utils/cargoDB.js';

let cargoDB = new CargoDB()

const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        banner: [], //图片轮播数据
        classData: {}, //分类数据
        likesData: [], //猜你喜欢数据
        allDatas: {},
        allSearchData: [],
        youhuiquan: [],
        searchPanel: false,
    },

    // 点击banner
    bannerTap(e) {
        let cargoid = e.currentTarget.dataset.cargoid
        // 调到详情页
        util.navigateToDetail(cargoid)
    },

    // 点击类别
    typeTap(e) {
        console.log(e)
        let type = e.currentTarget.dataset.typeid
        //调到分类页
        util.navigateToType(type)
    },

    // 点击了查看详情
    cargoDetailTap(e) {
        // console.log(e)
        const cargoid = e.currentTarget.dataset.cargoid
        // 跳转详情页
        util.navigateToDetail(cargoid)
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log("main Page onLoad")

        cargoDB.loadCargos()
        cargoDB.loadCargoTypes()

        youhuiquanDB.loadYouhuiquan()

        // this.loadBannerData()
        // this.loadClassData()
        // this.loadLikeItemData()
        // this.loadAllData()

        this.loadAllCargoData()

        util.loadOrders(false)

    },

    loadAllCargoData: function () {
        let allCargos = wx.getStorageSync(app.globalData.allSellItemKey);
        let types = wx.getStorageSync(app.globalData.allSellItemTypeKey)
        let banners = []
        let likes = []

        for (let i = 0; i < allCargos.length; i++) {
            let cargo = allCargos[i]
            if (cargo.isBanner) {
                banners.push(cargo)
            }
            if (cargo.isLike) {
                likes.push(cargo)
            }
        }

        this.setData({
            banner: banners,
            classData: types,
            likesData: likes,
            allDatas: allCargos,
        })
    },

    loadBannerData: function () {
        this.setData({
            banner: mainDataJs.bannerData
        })
    },

    loadLikeItemData: function () {
        this.setData({
            itemArrayData: mainDataJs.itemArrayData
        })
    },

    loadClassData: function () {
        this.setData({
            classData: mainDataJs.typeData
        })
    },

    loadAllData: function () {
        this.setData({
            allDatas: classDataJs.allDatas,
        })
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
        console.log("main Page onShow")

        let youhuiquanData = wx.getStorageSync(app.globalData.youhuiquanKey)
        this.setData({
            youhuiquan: youhuiquanData.data,
        })

        numOpera.redDot()
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
        console.log("main Page onHide")
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
        console.log("main Page onUnLoad")
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

    // 点击搜索
    onActivateSearch: function (event) {
        console.log("search active")
        this.setData({
            searchPanel: true
        })
    },

    onCancel: function (event) {
        console.log("search cancel")
        this.setData({
            searchPanel: false
        })
    },

    plusOnClickFun: function (e) {
        console.log("main page plusOnClickFun")
        numOpera.redDot()
    },
})